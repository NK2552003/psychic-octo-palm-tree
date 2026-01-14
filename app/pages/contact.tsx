"use client"

import { useState, useRef, useEffect } from "react"
import emailjs from "emailjs-com"
import gsap from "gsap"
import { toast } from "sonner"

const SERVICES = [
  { key: 'service.mobile_app', default: 'Mobile App' },
  { key: 'service.website_design', default: 'Website Design' },
  { key: 'service.branding', default: 'Branding' },
  { key: 'service.webflow_development', default: 'Webflow Development' },
  { key: 'service.app_design', default: 'App Design' },
  { key: 'service.graphic_design', default: 'Graphic Design' },
  { key: 'service.wordpress', default: 'WordPress' },
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

  const toggleService = (serviceKey: string) => {
    setSelected((prev) =>
      prev.includes(serviceKey)
        ? prev.filter((s) => s !== serviceKey)
        : [...prev, serviceKey]
    )
  }

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget // Store form reference before async operations
    setLoading(true)

    let success = false

    try {
      const lang = (localStorage.getItem('preferredLang') as any) || 'en'
      await emailjs.send(
        "service_r42eetw",
        "template_sslukhm",
        {
          name: form.user_name.value,
          email: form.user_email.value,
          company: form.company.value,
          services: selected.map(k => t(k, lang)).join(", "),
          message: form.message.value,
        },
        "2AfiXCyGp4WGbg9uy"
      )
      
      success = true
      
      // Show success toast immediately
      // localized toast
      import('../../lib/i18n').then(({ t }) => {
        const lang = (localStorage.getItem('preferredLang') as any) || 'en'
        toast.success(t('contact.toast.success', lang), {
          description: t('contact.toast.success.desc', lang),
          duration: 4000,
        })
      }).catch(() => {
        toast.success('Message sent successfully! ✨')
      })
      // Then reset form and state
      setSelected([])
      setLoading(false)
      form.reset()
    } catch (err) {
      console.error("Email send error:", err)
      setLoading(false)
      
      // Only show error if success wasn't already set
      if (!success) {
        import('../../lib/i18n').then(({ t }) => {
          const lang = (localStorage.getItem('preferredLang') as any) || 'en'
          toast.error(t('contact.toast.error', lang), {
            description: t('contact.toast.error.desc', lang),
            duration: 4000,
          })
        }).catch(() => {
          toast.error('Message not sent')
        })
      }
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
              <span className="hero-jelly inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105 hover:bg-black hover:text-white" data-i18n="contact.badge">
            Contact
          </span>
      {/* Hero */}
      <div className="text-center">
        <h1 data-i18n="contact.h1" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight hero-jelly">
          BEGIN SOMETHING
        </h1>
      </div>

      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 data-i18n="contact.h2" className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold hero-jelly">
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
            <label className="block mb-2 font-medium hero-jelly" data-i18n="contact.label.name">Name<span className="text-red-500">*</span></label>
          <input
            name="user_name"
            required
            placeholder="Hello..."
            data-i18n="contact.placeholder.name"
            data-i18n-attr="placeholder"
            className={inputBase}
          />
        </div>

        {/* Email */}
        <div className="contact-animate ">
          <label className="block mb-2 font-medium hero-jelly" data-i18n="contact.label.email">Email<span className="text-red-500">*</span></label>
          <input
            name="user_email"
            type="email"
            required
            placeholder="Where can I reply?"
            data-i18n="contact.placeholder.email"
            data-i18n-attr="placeholder"
            className={inputBase}
          />
        </div>

        {/* Company */}
        <div className="md:col-span-2 contact-animate">
          <label className="block mb-2 font-medium hero-jelly" data-i18n="contact.label.company">Company name</label>
          <input
            name="company"
            placeholder="Your company or website?"
            data-i18n="contact.placeholder.company"
            data-i18n-attr="placeholder"
            className={inputBase}
          />
        </div>

        {/* Services */}
        <div className="md:col-span-2 contact-animate">
          <label className="block mb-4 font-medium hero-jelly" data-i18n="contact.services.label">What’s in your mind?<span className="text-red-500">*</span></label>

          <div className="flex flex-wrap gap-4">
            {SERVICES.map((s) => (
              <button
                type="button"
                key={s.key}
                onClick={() => toggleService(s.key)}
                className={`px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-full border transition hero-jelly
                ${
                  selected.includes(s.key)
                    ? "bg-black text-white border-black dark:bg-teal-400 dark:text-black dark:border-teal-400"
                    : "border-gray-300 text-black dark:border-white/30 dark:text-white hover:border-black dark:hover:border-teal-400"
                }`}
                data-i18n={s.key}
              >
                {s.default}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="md:col-span-2 contact-animate hero-jelly">
          <textarea
            name="message"
            placeholder="Tell me more about your idea..."            data-i18n="contact.placeholder.message"
            data-i18n-attr="placeholder"            rows={4}
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
            <span data-i18n="contact.sending" style={{ display: loading ? 'inline' : 'none' }}>Sending...</span>
            <span data-i18n="contact.send" style={{ display: loading ? 'none' : 'inline' }}>Send Me</span>
          </button>

          <p className="text-gray-500 dark:text-white/80 text-sm hero-jelly" data-i18n="contact.followup">
            I’ll get back to you within 24 hours
          </p>
        </div>
      </form>
    </section>
  )
}
