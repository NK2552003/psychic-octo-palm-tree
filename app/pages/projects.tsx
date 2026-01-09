"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Box,
  Star,
  Calendar,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  topics?: string[]
  created_at?: string
}

interface DevToArticle {
  id: number
  title: string
  description: string
  url: string
  published_at: string
  tags: string[]
}

export default function ProjectsPage() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [devtoArticles, setDevtoArticles] = useState<DevToArticle[]>([])
  const [loading, setLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const doodlesRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const cardsContainerRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (expandedSection === 0 && githubRepos.length === 0) {
      fetchGithubRepos();
    }
    if (expandedSection === 3 && devtoArticles.length === 0) {
      fetchDevtoArticles();
    }
  }, [expandedSection, githubRepos.length, devtoArticles.length])

  // Register GSAP plugins and run initial entrance animations
  useEffect(() => {
    if (!containerRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header / intro entrance
      gsap.from(".mb-16 > *", {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      })

      // Initialize all section contents to collapsed state
      sectionsRef.current.forEach((section) => {
        if (!section) return
        const content = section.querySelector(".section-content") as HTMLElement
        if (content) {
          gsap.set(content, { height: 0, opacity: 0 })
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Animate cards when a section is expanded
  useEffect(() => {
    if (expandedSection === null) return
    const container = cardsContainerRef.current[expandedSection]
    if (!container) return

    const cards = Array.from(container.querySelectorAll(".project-card"))
    if (cards.length === 0) return

    const tl = gsap.timeline()
    tl.fromTo(
      cards,
      { y: 20, opacity: 0, scale: 0.99 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.45,
        ease: "power2.out",
      },
    )

    return () => {
      tl.kill()
    }
  }, [expandedSection])

  // Smooth hover animations for section number and subtitle using GSAP
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        if (!section) return

        const icon = section.querySelector(".section-icon") as HTMLElement
        const title = section.querySelector(".section-title") as HTMLElement
        const subtitle = section.querySelector(".section-subtitle") as HTMLElement
        if (!icon && !title && !subtitle) return

        const tl = gsap.timeline({ paused: true })
        if (icon)
          tl.to(
            icon,
            {
              x: 8,
              scale: 1.06,
              duration: 0.32,
              ease: "power2.out",
            },
            0,
          )

        if (title)
          tl.to(
            title,
            {
              x: 6,
              opacity: 0.95,
              duration: 0.32,
              ease: "power2.out",
            },
            0,
          )

        if (subtitle)
          tl.to(
            subtitle,
            {
              x: 8,
              skewX: 2.5,
              duration: 0.36,
              ease: "power2.out",
            },
            0,
          )

        const enter = () => tl.play()
        const leave = () => tl.reverse()

        section.addEventListener("mouseenter", enter)
        section.addEventListener("focus", enter)
        section.addEventListener("mouseleave", leave)
        section.addEventListener("blur", leave)

        ;(section as any)._gsapHoverCleanup = () => {
          section.removeEventListener("mouseenter", enter)
          section.removeEventListener("focus", enter)
          section.removeEventListener("mouseleave", leave)
          section.removeEventListener("blur", leave)
          tl.kill()
        }
      })
    }, containerRef)

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section && (section as any)._gsapHoverCleanup) (section as any)._gsapHoverCleanup()
      })
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (!section) return

      const content = section.querySelector(".section-content") as HTMLElement
      if (!content) return

      // Kill any ongoing animations to prevent conflicts
      gsap.killTweensOf(content)

      if (expandedSection === index) {
        gsap.set(content, { height: "auto" })
        const autoHeight = content.offsetHeight
        gsap.fromTo(
          content,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: autoHeight,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(content, { height: "auto" })
            },
          },
        )
      } else {
        const currentHeight = content.offsetHeight
        if (currentHeight > 0) {
          gsap.fromTo(
            content,
            {
              height: currentHeight,
              opacity: 1,
            },
            {
              height: 0,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
            },
          )
        } else {
          // Ensure it stays hidden
          gsap.set(content, { height: 0, opacity: 0 })
        }
      }
    })
  }, [expandedSection])

  const fetchGithubRepos = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://api.github.com/users/nk2552003/repos?per_page=100")
      let data = await res.json()
      if (Array.isArray(data)) {
        data = data.sort((a, b) => b.stargazers_count - a.stargazers_count)
        setGithubRepos(data)
      } else {
        setGithubRepos([])
      }
    } catch (error) {
      console.error("Error fetching GitHub repos:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDevtoArticles = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://dev.to/api/articles?username=nk2552003")
      const data = await res.json()
      setDevtoArticles(data)
    } catch (error) {
      console.error("Error fetching Dev.to articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (index: number) => {
    // If closing the currently expanded section, animate collapse first
    if (expandedSection === index) {
      const section = sectionsRef.current[index]
      const content = section?.querySelector(".section-content") as HTMLElement
      if (content) {
        const currentHeight = content.offsetHeight
        gsap.fromTo(
          content,
          { height: currentHeight, opacity: 1 },
          {
            height: 0,
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
            onComplete: () => setExpandedSection(null),
          },
        )
        return
      }
      setExpandedSection(null)
      return
    }

    // If another section is currently open, collapse it first, then open the new one.
    if (expandedSection !== null) {
      const openSection = sectionsRef.current[expandedSection]
      const openContent = openSection?.querySelector(".section-content") as HTMLElement
      if (openContent) {
        const currentHeight = openContent.offsetHeight
        gsap.fromTo(
          openContent,
          { height: currentHeight, opacity: 1 },
          {
            height: 0,
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
            onComplete: () => {
              setExpandedSection(index)
            },
          },
        )
        return
      }
    }

    setExpandedSection(index)
  }

  const scroll = (direction: "left" | "right", index: number) => {
    const container = cardsContainerRef.current[index]
    if (container) {
      const wrapper = container.querySelector(".cards-wrapper") as HTMLElement
      if (wrapper) {
        const scrollAmount = 400
        wrapper.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount
      }
    }
  }

  const sections = [
    {
      title: "The Code Chronicles",
      subtitle: "GitHub Repositories",
      description: "Where ideas transform into open-source reality, one commit at a time.",
      url: "https://github.com/nk2552003",
    },
    {
      title: "The Creative Playground",
      subtitle: "CodePen Experiments",
      description: "Interactive canvases where CSS dances and JavaScript brings magic to life.",
      url: "https://codepen.io/rlaqxvbr-the-bashful",
    },
    {
      title: "The Component Gallery",
      subtitle: "Uiverse Creations",
      description: "Curated UI components crafted with passion and shared with the world.",
      url: "https://uiverse.io/profile/NK2552003",
    },
    {
      title: "The Knowledge Archive",
      subtitle: "Dev.to Articles",
      description: "Stories of code, insights from battles fought, and wisdom gained through debugging.",
      url: "https://dev.to/nk2552003",
    },
  ]

  // prepare simple stats for charts
  const languageCounts = githubRepos.reduce((acc: Record<string, number>, r) => {
    const lang = r.language || "Unknown"
    acc[lang] = (acc[lang] || 0) + 1
    return acc
  }, {})

  const langData = Object.entries(languageCounts).map(([language, count]) => ({ language, count }))
  const starsData = githubRepos.map((r) => ({ name: r.name, stars: r.stargazers_count }))

  const getSectionIcon = (url: string, className = "h-4 w-4 md:h-5 md:w-5 xl:h-6 xl:w-6") => {
    if (!url) return <ExternalLink className={className} />
    if (url.includes("github.com")) return <Github className={className} />
    if (url.includes("codepen.io"))
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2l9 6v8l-9 6-9-6V8l9-6z" />
          <path d="M12 4.2 6.6 8 12 10.8 17.4 8 12 4.2zM4 9.9v4.2L8.6 12 4 9.9zm16 0L15.4 12 20 13.8V9.9z" />
        </svg>
      )
    if (url.includes("uiverse.io")) return <Box className={className} />
    if (url.includes("dev.to") || url.includes("devto"))
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 3h18v18H3z" opacity="0.08" />
          <path d="M7 8h2.5v8H7V8zm3.75 0H13c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H10.75V8zM16.5 8H20v8h-3.5V8z" />
        </svg>
      )

    return <ExternalLink className={className} />
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-16">
          <span id="projects" className="hero-jelly inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105 hover:bg-black hover:text-white">
            Projects
          </span>
          <h1 className="hero-jelly mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-tight">
            Crafting Digital Experiences
          </h1>
          <p className="hero-jelly hero-jelly-fast mt-6 max-w-2xl text-sm md:text-base lg:text-xl ">
            A journey through code, creativity, and endless possibilities.
          </p>
        </div>

        <div className="space-y-0">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                sectionsRef.current[index] = el
              }}
              className="section-item"
            >
              <Card
                className="group p-4 md:p-8 transition-all duration-300 cursor-pointer shadow-none rounded-none border-0 border-b border-stone-500 dark:border-teal-700/80 bg-transparent"
                onClick={() => toggleSection(index)}
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center gap-8">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(section.url, "_blank")
                      }}
                      aria-label={`Open ${section.subtitle} externally`}
                      className="section-icon hidden md:inline-flex items-center justify-center p-2 rounded-md bg-transparent hover:bg-muted transition"
                    >
                      {getSectionIcon(section.url, "h-6 w-6 md:h-9 md:w-9 xl:h-12 xl:w-12")}
                    </button>
                    <div>
                      <h3 className="hero-jelly text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                        <span className="section-title">{section.title}</span>
                      </h3>
                      <h2 className="hero-jelly section-subtitle text-xl sm:text-2xl font-black uppercase transition-all duration-300 md:text-3xl">
                        {section.subtitle}
                      </h2>
                      <p className="hero-jelly hero-jelly-fast mt-2 text-sm md:text-base text-muted-foreground max-w-xl">{section.description}</p>
                    </div>
                  </div>
                 <div className="flex items-center justify-center border md:border-none border-stone-500 dark:border-teal-500/50 rounded-md mt-4 md:mt-0 w-full md:w-auto hover:bg-muted transition">
                   <Button
                      variant="default"
                      size="lg"
                      className="hidden md:inline-flex bg-transparent transition-transform duration-300 "
                      aria-hidden
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSection(index)
                      }}
                    >
                    {expandedSection === index ? (
                      <ChevronUp className="h-5 w-5 transform transition-transform duration-300 text-stone-600 dark:text-teal-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 transform transition-transform duration-300 text-stone-600 dark:text-teal-500" />
                    )}
                  </Button>
                 </div>
                </div>
              </Card>

              <div
                className={`section-content overflow-hidden ${expandedSection === index ? 'border-b border-stone-500 dark:border-teal-700/80' : ''}`}
              >
                <div className="mt-6 relative">
                  <div className="flex gap-2 mb-4 justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        scroll("left", index)
                      }}
                      className="rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        scroll("right", index)
                      }}
                      className="rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div
                    ref={(el) => {
                      cardsContainerRef.current[index] = el
                    }}
                    className="relative"
                  >
                    <div className="cards-wrapper overflow-x-auto pb-4 scroll-smooth">
                      <div className="flex gap-4">
                        {index === 0 &&
                          githubRepos.map((repo) => (
                            <Card
                              key={repo.id}
                              className="project-card flex-shrink-0 w-64 sm:w-72 md:w-80 p-4 sm:p-6 hover:shadow-md transition-shadow flex flex-col border border-stone-600/80 dark:border-teal-700/80"
                            >
                              <div>
                                <h3 className="font-semibold text-lg mb-2 truncate">{repo.name}</h3>
                                <p className="text-sm text mb-3 line-clamp-2">
                                  {repo.description || "No description available"}
                                </p>

                                {Array.isArray(repo.topics) && repo.topics.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {repo.topics.slice(0, 4).map((t) => (
                                      <span key={t} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary inline-flex items-center gap-1">
                                        <Tag className="h-3 w-3" /> {t}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="mt-auto">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm inline-flex items-center gap-2">
                                    <Tag className="h-4 w-4" /> {repo.language || "N/A"}
                                  </span>
                                  <span className="text-sm inline-flex items-center gap-2">
                                    <Star className="h-4 w-4" /> {repo.stargazers_count}
                                  </span>
                                </div>

                                <div className="text-xs text-muted-foreground flex items-center gap-2 mb-3">
                                  <Calendar className="h-4 w-4" /> {repo.created_at ? new Date(repo.created_at).toLocaleDateString() : ""}
                                </div>

                                <Button
                                  variant="outline"
                                  className="w-full bg-transparent hover:scale-105 hover:shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(repo.html_url, "_blank")
                                  }}
                                >
                                  View on GitHub
                                </Button>
                              </div>
                            </Card>
                          ))}

                        {index === 1 &&
                          (() => {
                            // CodePen projects data
                            const codepenProjectsData = [

                              { id: "azZovJK", title: "Project 1" },
                              { id: "KwVjVKv", title: "Project 2" },
                              { id: "qEbqJJJ", title: "Project 3" },
                              { id: "MYgpywe", title: "Project 4" },
                              { id: "NPWEKOP", title: "Project 5" },
                              { id: "zxxdmxJ", title: "Project 6" },
                              { id: "azOwmKd", title: "Project 7" },
                              { id: "WbvOoXN", title: "Project 8" },
                              { id: "dPyayZq", title: "Project 9" },
                              { id: "EaYdRVB", title: "Project 10" },
                              { id: "xbKpwwZ", title: "Project 11" },
                              { id: "VYwLJNW", title: "Project 12" },
                              { id: "JoPyyxj", title: "Project 13" },
                              { id: "gbYyXmM", title: "Project 14" },
                              { id: "KwKWPoB", title: "Project 15" },
                              { id: "ogvdGVm", title: "Project 16" },
                              { id: "VwoLgrj", title: "Project 17" },
                              { id: "MWdKBpa", title: "Project 18" },
                              { id: "LEPQZeR", title: "Project 19" },
                              { id: "ExqvZey", title: "Project 20" },
                            ];
                            return codepenProjectsData.map((project, i) => (
                              <Card key={project.id} className="project-card flex-shrink-0 w-64 sm:w-72 md:w-80 p-4 sm:p-6 border border-stone-600/80 dark:border-teal-700/80 flex flex-col">
                                <div>
                                  <div className="w-full h-40 overflow-hidden rounded-md mb-4 bg-[#181818] border border-[#3332328f] relative">
                                    <div
                                      className="w-full h-full transform scale-50 origin-top-left"
                                      style={{ width: "200%", height: "200%" }}
                                    >
                                      <iframe
                                        title={project.title}
                                        src={`https://codepen.io/username/embed/${project.id}?default-tab=result&editable=true&theme-id=dark`}
                                        className="w-full h-full"
                                        style={{ border: "none" }}
                                        allowFullScreen
                                      />
                                    </div>
                                  </div>
                                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-4">
                                    Interactive CSS and JavaScript experiment
                                  </p>
                                </div>
                                <div className="mt-auto">
                                  <Button variant="outline" className="w-full bg-transparent hover:scale-105 hover:shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer" onClick={() => window.open(`https://codepen.io/username/pen/${project.id}`, "_blank") }>
                                    View on CodePen
                                  </Button>
                                </div>
                              </Card>
                            ));
                          })()
                        }

                        {index === 2 &&
                          [
                            {
                              id: "silly-moth-73",
                              title: "Heart Rate",
                              url: "https://uiverse.io/NK2552003/silly-moth-73",
                              embed: "https://uiverse.io/embed/silly-moth-73",
                              description: "Heart Rate stats UI component."
                            },
                            {
                              id: "fat-goose-73",
                              title: "Track Your Delivery",
                              url: "https://uiverse.io/NK2552003/fat-goose-73",
                              embed: "https://uiverse.io/embed/fat-goose-73",
                              description: "Monitor your shipment status in real-time."
                            },
                             {
                              id: "chatty-eel-90",
                              title: "Chatty Eel",
                              url: "https://uiverse.io/NK2552003/chatty-eel-90",
                              embed: "https://uiverse.io/NK2552003/chatty-eel-90",
                              description: "Awesome Card"
                            },
                             {
                              id: "purple-seahorse-91",
                              title: "Purple Seahorse",
                              url: "https://uiverse.io/NK2552003/purple-seahorse-91",
                              embed: "https://uiverse.io/embed/purple-seahorse-91",
                              description: "Awesome Game Card"
                            }
                          ].map((card) => (
                            <Card key={card.id} className="project-card flex-shrink-0 w-64 sm:w-72 md:w-80 p-4 sm:p-6 border border-stone-600/80 dark:border-teal-700/80 flex flex-col">
                              <div>
                                <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                              </div>
                              <div className="mt-auto">
                                <Button variant="outline" className="w-full bg-transparent hover:scale-105 hover:shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer" onClick={() => window.open(card.url, "_blank") }>
                                  View on Uiverse
                                </Button>
                              </div>
                            </Card>
                          ))
                        }
                        {index === 3 &&
                          devtoArticles.map((article) => (
                            <Card
                              key={article.id}
                              className="project-card flex-shrink-0 w-64 sm:w-72 md:w-80 p-4 sm:p-6 hover:shadow-md transition-shadow border border-stone-600/80 dark:border-teal-700/80 flex flex-col"
                            >
                              <div>
                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
                                {(() => {
                                  const tags = Array.isArray(article.tags)
                                    ? article.tags
                                    : (typeof article.tags === "string"
                                      ? (article.tags as string).split(",").map((t: string) => t.trim()).filter(Boolean)
                                      : [])

                                  if (tags.length === 0) return null

                                  return (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {tags.slice(0, 3).map((tag:any) => (
                                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  )
                                })()}
                              </div>
                              <div className="mt-auto">
                                <Button
                                  variant="outline"
                                  className="w-full bg-transparent hover:scale-105 hover:shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(article.url, "_blank")
                                  }}
                                >
                                  Read Article
                                </Button>
                              </div>
                            </Card>
                          ))}

                        {loading && (
                          <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 p-6 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t border-stone-500 dark:border-teal-700/80" />
        </div>
      </div>
    </div>
  )
}
