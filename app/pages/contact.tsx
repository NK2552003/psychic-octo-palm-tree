"use client"

import { useState, useRef, useEffect } from "react"
import emailjs from "emailjs-com"
import gsap from "gsap"

const SERVICES = [
  "Mobile App",
  "Website Design",
  "Branding",
  "Webflow Development",
  "App Design",
  "Graphic Design",
  "WordPress",
]

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    gsap.from(".contact-animate", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      onComplete: () => {
        // clear inline GSAP props so elements return to normal CSS state
        gsap.set(".contact-animate", { clearProps: "all" });
      },
    })
  }, [])

  const toggleService = (service: string) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await emailjs.send(
        "service_r42eetw",
        "template_sslukhm",
        {
          name: e.currentTarget.user_name.value,
          email: e.currentTarget.user_email.value,
          company: e.currentTarget.company.value,
          services: selected.join(", "),
          message: e.currentTarget.message.value,
        },
        "2AfiXCyGp4WGbg9uy"
      )
      // emailjs returns a response object with status and text
      if (response.status === 200) {
        alert("Message sent successfully ✨")
        e.currentTarget.reset()
        setSelected([])
      } else {
        alert("Failed to send message")
      }
    } catch (err) {
      alert("Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    "w-full bg-transparent border-b py-3 outline-none transition-colors " +
    "text-black dark:text-white " +
    "border-gray-400 dark:border-white/30 " +
    "focus:border-black dark:focus:border-teal-400 " +
    "placeholder:text-gray-500 dark:placeholder:text-muted-foreground"

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full px-6 sm:px-10 lg:px-24 py-24"
    >
              <span className="hero-jelly inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105 hover:bg-black hover:text-white">
            Contact
          </span>
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight hero-jelly">
          BEGIN SOMETHING
        </h1>
      </div>

      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold hero-jelly">
          <span className="text-red-400">Say Hi!</span> & tell me about your idea
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={sendEmail}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-700 dark:text-teal-200"
      >
        {/* Name */}
        <div className="contact-animate">
          <label className="block mb-2 font-medium hero-jelly">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            name="user_name"
            required
            placeholder="Hello..."
            className={inputBase}
          />
        </div>

        {/* Email */}
        <div className="contact-animate ">
          <label className="block mb-2 font-medium hero-jelly">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            name="user_email"
            type="email"
            required
            placeholder="Where can I reply?"
            className={inputBase}
          />
        </div>

        {/* Company */}
        <div className="md:col-span-2 contact-animate">
          <label className="block mb-2 font-medium hero-jelly">
            Company name
          </label>
          <input
            name="company"
            placeholder="Your company or website?"
            className={inputBase}
          />
        </div>

        {/* Services */}
        <div className="md:col-span-2 contact-animate">
          <label className="block mb-4 font-medium hero-jelly">
            What’s in your mind?<span className="text-red-500">*</span>
          </label>

          <div className="flex flex-wrap gap-4">
            {SERVICES.map((service) => (
              <button
                type="button"
                key={service}
                onClick={() => toggleService(service)}
                className={`px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-full border transition hero-jelly
                ${
                  selected.includes(service)
                    ? "bg-black text-white border-black dark:bg-teal-400 dark:text-black dark:border-teal-400"
                    : "border-gray-300 text-black dark:border-white/30 dark:text-white hover:border-black dark:hover:border-teal-400"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="md:col-span-2 contact-animate hero-jelly">
          <textarea
            name="message"
            placeholder="Tell me more about your idea..."
            rows={4}
            className={`${inputBase} resize-none`}
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 contact-animate">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 rounded-full bg-black text-white dark:bg-teal-400 dark:text-black hover:scale-105 hero-jelly transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Me"}
          </button>

          <p className="text-gray-500 dark:text-white/40 text-sm hero-jelly">
            I’ll get back to you within 24 hours
          </p>
        </div>
      </form>
    </section>
  )
}
