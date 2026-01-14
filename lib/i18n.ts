export type LangCode = 'en' | 'hi' | 'hinglish'

export const translations: Record<string, Record<LangCode, string>> = {
  'about.badge': {
    en: 'About Me',
    hi: 'मेरे बारे में',
    hinglish: 'About Me — मेरे बारे में',
  },
  'quote.left.1': {
    en: '"Code is poetry written',
    hi: '"कोड कविता है जो लिखी जाती है',
    hinglish: '"Code कविता है written',
  },
  'quote.left.2': {
    en: 'in logic and translated',
    hi: 'तर्क में और अनुवादित',
    hinglish: 'in logic और translated',
  },
  'quote.left.3': {
    en: 'into possibility."',
    hi: 'संभावना में।"',
    hinglish: 'into संभावना."',
  },
  // Right quote
  'quote.right.1': { en: '"Passionate about crafting', hi: '"रचनात्मकता बनाने के लिए जुनूनी', hinglish: '"Passionate about crafting' },
  'quote.right.2': { en: 'experiences that blend', hi: 'अनुभव जो मिलाते हैं', hinglish: 'experiences that blend' },
  'quote.right.3': { en: 'design with functionality."', hi: 'डिज़ाइन को फ़ंक्शन के साथ।"', hinglish: 'design with functionality."' },

  // Center bottom quote lines
  'quote.center.1': { en: '"Every pixel, every line', hi: '"हर पिक्सल, हर पंक्ति', hinglish: '"Every pixel, हर पंक्ति' },
  'quote.center.2': { en: 'of code is an opportunity', hi: 'कोड एक अवसर है', hinglish: 'of code एक अवसर है' },
  'quote.center.3': { en: 'to create something', hi: 'कुछ बनाने के लिए', hinglish: 'to create कुछ' },
  'quote.center.4': { en: 'extraordinary and push', hi: 'असाधारण और धकेलना', hinglish: 'extraordinary और push' },
  'quote.center.5': { en: 'the boundaries of design."', hi: 'डिज़ाइन की सीमाओं को।"', hinglish: 'the boundaries of design."' },
  'specialties.title': {
    en: 'Specialties',
    hi: 'विशेषताएँ',
    hinglish: 'Specialties / विशेषज्ञता',
  },
  'specialties.li1': {
    en: 'Full-Stack Development',
    hi: 'फुल-स्टैक विकास',
    hinglish: 'Full-Stack विकास',
  },
  'specialties.li2': {
    en: 'UI/UX Design & Animation',
    hi: 'UI/UX डिज़ाइन और एनीमेशन',
    hinglish: 'UI/UX डिज़ाइन & एनीमेशन',
  },
  'specialties.li3': {
    en: 'Creative Problem Solving',
    hi: 'रचनात्मक समस्या समाधान',
    hinglish: 'Creative समस्या समाधान',
  },
  // Navigation labels
  'nav.about': { en: 'About Me', hi: 'मेरे बारे में', hinglish: 'About / मेरे बारे में' },
  'nav.skills': { en: 'Skills', hi: 'कौशल', hinglish: 'Skills / कौशल' },
  'nav.projects': { en: 'Projects', hi: 'परियोजनाएँ', hinglish: 'Projects / परियोजनाएँ' },
  'nav.photography': { en: 'Photography', hi: 'फ़ोटोग्राफी', hinglish: 'Photography / फ़ोटोग्राफी' },
  'nav.experience': { en: 'Experience', hi: 'अनुभव', hinglish: 'Experience / अनुभव' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क', hinglish: 'Contact / संपर्क' },
  'hero.description': {
    en: `I’m an undergraduate engineering student who enjoys building\n              real-world web applications, learning modern technologies, and\n              expressing creativity through photography. I love turning ideas\n              into functional, meaningful digital experiences.`,
    hi: `मैं एक स्नातक इंजीनियरिंग छात्र हूँ जो वास्तविक दुनिया की वेब एप्लिकेशन बनाने, आधुनिक तकनीकों को सीखने और फ़ोटोग्राफ़ी के माध्यम से रचनात्मकता व्यक्त करने का आनंद लेता है। मैं विचारों को कार्यशील और अर्थपूर्ण डिजिटल अनुभवों में बदलना पसंद करता हूँ।`,
    hinglish: `I’m an undergraduate engineering student जो real-world web applications बनाता हूँ, learning modern technologies, और photography से creativity express करता हूँ.`,
  },
  'center.building.1': {
    en: 'BUILDING',
    hi: 'बिल्डिंग',
    hinglish: 'BUILDING',
  },
  'center.building.2': {
    en: 'THE FUTURE',
    hi: 'भविष्य',
    hinglish: 'THE FUTURE',
  },
  'name.turning': {
    en: 'TURNING',
    hi: 'घुमाना',
    hinglish: 'TURNING',
  },
  'name.ideas': {
    en: 'IDEAS',
    hi: 'विचार',
    hinglish: 'IDEAS',
  },
  'name.into': {
    en: 'INTO REALITY',
    hi: 'वास्तविकता में',
    hinglish: 'INTO REALITY',
  },
}

export const extraTranslations: Record<string, Record<LangCode, string>> = {
  // Landing
  'scroll.label': { en: 'SCROLL', hi: 'स्क्रॉल', hinglish: 'SCROLL' },
  'scroll.button': { en: 'Scroll down', hi: 'नीचे स्क्रॉल करें', hinglish: 'Scroll down' },

  // Header
  'header.location': { en: 'Haryana, India ·', hi: 'हरियाणा, भारत ·', hinglish: 'Haryana, India ·' },

  // Contact
  'contact.badge': { en: 'Contact', hi: 'संपर्क', hinglish: 'Contact / संपर्क' },
  'contact.h1': { en: 'BEGIN SOMETHING', hi: 'कुछ शुरू करें', hinglish: 'BEGIN SOMETHING' },
  'contact.h2': { en: "Say Hi! & tell me about your idea", hi: "नमस्ते कहें और अपनी परियोजना बताएं", hinglish: "Say Hi! & बताइए आपकी idea" },
  'contact.label.name': { en: 'Name', hi: 'नाम', hinglish: 'Name / नाम' },
  'contact.placeholder.name': { en: 'Hello...', hi: 'नमस्ते...', hinglish: 'Hello... / नमस्ते...' },
  'contact.label.email': { en: 'Email', hi: 'ईमेल', hinglish: 'Email / ईमेल' },
  'contact.placeholder.email': { en: 'Where can I reply?', hi: 'मैं किस पर उत्तर दूं?', hinglish: 'Where can I reply?' },
  'contact.label.company': { en: 'Company name', hi: 'कंपनी का नाम', hinglish: 'Company / कंपनी' },
  'contact.placeholder.company': { en: 'Your company or website?', hi: 'आपकी कंपनी या वेबसाइट?', hinglish: 'Your company or website?' },
  'contact.services.label': { en: "What’s in your mind?", hi: 'आपके मन में क्या है?', hinglish: "What's in your mind?" },
  'service.mobile_app': { en: 'Mobile App', hi: 'मोबाइल ऐप', hinglish: 'Mobile App' },
  'service.website_design': { en: 'Website Design', hi: 'वेबसाइट डिज़ाइन', hinglish: 'Website Design' },
  'service.branding': { en: 'Branding', hi: 'ब्रांडिंग', hinglish: 'Branding' },
  'service.webflow_development': { en: 'Webflow Development', hi: 'Webflow विकास', hinglish: 'Webflow Development' },
  'service.app_design': { en: 'App Design', hi: 'ऐप डिज़ाइन', hinglish: 'App Design' },
  'service.graphic_design': { en: 'Graphic Design', hi: 'ग्राफिक डिज़ाइन', hinglish: 'Graphic Design' },
  'service.wordpress': { en: 'WordPress', hi: 'वर्डप्रेस', hinglish: 'WordPress' },
  'contact.placeholder.message': { en: 'Tell me more about your idea...', hi: 'अपने विचार के बारे में और बताइए...', hinglish: 'Tell me more about your idea...' },
  'contact.send': { en: 'Send Me', hi: 'भेजें', hinglish: 'Send Me' },
  'contact.sending': { en: 'Sending...', hi: 'प्रेषण...', hinglish: 'Sending...' },
  'contact.toast.success': { en: 'Message sent successfully! ✨', hi: 'संदेश सफलतापूर्वक भेजा गया! ✨', hinglish: 'Message sent successfully! ✨' },
  'contact.toast.success.desc': { en: "I'll get back to you soon.", hi: 'मैं जल्द ही आपसे संपर्क करूंगा।', hinglish: "I'll get back to you soon." },
  'contact.toast.error': { en: 'Message not sent', hi: 'संदेश नहीं भेजा गया', hinglish: 'Message not sent' },
  'contact.toast.error.desc': { en: 'Please try again or contact me directly.', hi: 'कृपया पुनः प्रयास करें या मुझसे सीधे संपर्क करें।', hinglish: 'Please try again or contact me directly.' },

  // Cookies
  'cookie.back': { en: 'Back to site', hi: 'साइट पर वापस', hinglish: 'Back to site' },
  'cookie.title': { en: 'Cookie Policy', hi: 'कूकी नीति', hinglish: 'Cookie Policy' },
  'cookie.p1': { en: 'I use cookies to improve performance and provide a better experience. By accepting cookies you enable features like faster load times, improved caching, and analytics that help improve the site.', hi: 'मैं प्रदर्शन को बेहतर बनाने और बेहतर अनुभव प्रदान करने के लिए कुकीज़ का उपयोग करता हूँ। कुकीज़ स्वीकार करने से तेज़ लोड समय, उन्नत कैशिंग और एनालिटिक्स जैसी सुविधाएँ सक्षम होती हैं।', hinglish: 'I use cookies to improve performance...' },
  'cookie.what.heading': { en: 'What cookies I set', hi: 'मैं कौन सी कुकीज़ सेट करता हूँ', hinglish: 'What cookies I set' },
  'cookie.performance': { en: 'Performance cookies', hi: 'परफ़ॉर्मेंस कुकीज़', hinglish: 'Performance cookies' },
  'cookie.performance.desc': { en: 'used to cache resources and make page loads faster.', hi: 'संसाधनों को कैश करने और पृष्ठ लोड को तेज़ करने के लिए उपयोग किए जाते हैं।', hinglish: 'used to cache resources and make page loads faster.' },
  'cookie.essential': { en: 'Essential cookies', hi: 'ज़रूरी कुकीज़', hinglish: 'Essential cookies' },
  'cookie.essential.desc': { en: 'required for navigation and basic functionality.', hi: 'नेविगेशन और बुनियादी कार्यक्षमता के लिए आवश्यक।', hinglish: 'required for navigation and basic functionality.' },
  'cookie.accept': { en: 'Accept Cookies', hi: 'कुकीज़ स्वीकार करें', hinglish: 'Accept Cookies' },
  'cookie.reject': { en: 'Reject', hi: 'अस्वीकार', hinglish: 'Reject' },
  'cookie.status': { en: 'Cookies:', hi: 'कुकीज़:', hinglish: 'Cookies:' },
  'cookie.change': { en: 'Change preferences', hi: 'पसंद बदलें', hinglish: 'Change preferences' },
  'cookie.accept.toast': { en: 'Cookies accepted — thanks!', hi: 'कुकीज़ स्वीकार कर ली गईं — धन्यवाद!', hinglish: 'Cookies accepted — thanks!' },
  'cookie.reject.toast': { en: 'You have rejected performance cookies', hi: 'आपने प्रदर्शन कुकीज़ अस्वीकार कर दी हैं', hinglish: 'You have rejected performance cookies' },
  'cookie.clear.toast': { en: 'Cookie preferences cleared — you can re-accept or reject', hi: 'कुकी प्राथमिकताएँ साफ़ कर दी गई हैं — आप पुनः स्वीकार या अस्वीकार कर सकते हैं', hinglish: 'Cookie preferences cleared — you can re-accept or reject' },
  'cookie.read': { en: 'Read my cookie policy', hi: 'मेरी कुकी नीति पढ़ें', hinglish: 'Read my cookie policy' },
  'cookie.dismiss': { en: 'Dismiss', hi: 'बंद करें', hinglish: 'Dismiss' },
  'cookie.accept.title': { en: 'I use cookies', hi: 'मैं कुकीज़ का उपयोग करता हूँ', hinglish: 'I use cookies' },
  'contact.followup': { en: 'I’ll get back to you within 24 hours', hi: 'मैं 24 घंटों के भीतर आपसे संपर्क करूंगा', hinglish: 'I’ll get back to you within 24 hours' },

  // Footer
  'footer.copyright': { en: '© 2026 Nitish\'s Portfolio', hi: '© 2026 नितीश का पोर्टफोलियो', hinglish: '© 2026 Nitish\'s Portfolio' },
  'footer.all_rights': { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।', hinglish: 'All rights reserved.' },
  'footer.cookie_policy': { en: 'Cookie Policy', hi: 'कूकी नीति', hinglish: 'Cookie Policy' },

  // Projects
  'projects.badge': { en: 'Projects', hi: 'परियोजनाएँ', hinglish: 'Projects' },
  'projects.h1': { en: 'Crafting Digital Experiences', hi: 'डिजिटल अनुभव बनाना', hinglish: 'Crafting Digital Experiences' },
  'projects.p': { en: 'A journey through code, creativity, and endless possibilities.', hi: 'कोड, रचनात्मकता और अंतहीन संभावनाओं की यात्रा।', hinglish: 'A journey through code, creativity, and endless possibilities.' },
  'projects.section.0.title': { en: 'The Code Chronicles', hi: 'कोड क्रॉनिकल्स', hinglish: 'The Code Chronicles' },
  'projects.section.0.subtitle': { en: 'GitHub Repositories', hi: 'GitHub रिपॉज़िटरी', hinglish: 'GitHub Repositories' },
  'projects.section.0.description': { en: 'Where ideas transform into open-source reality, one commit at a time.', hi: 'जहाँ विचार एक-एक कमिट में ओपन-सोर्स वास्तविकता बनते हैं।', hinglish: 'Where ideas transform into open-source reality, one commit at a time.' },
  'projects.section.1.title': { en: 'The Creative Playground', hi: 'रचनात्मक प्लेग्राउंड', hinglish: 'The Creative Playground' },
  'projects.section.1.subtitle': { en: 'CodePen Experiments', hi: 'CodePen प्रयोग', hinglish: 'CodePen Experiments' },
  'projects.section.1.description': { en: 'Interactive canvases where CSS dances and JavaScript brings magic to life.', hi: 'इंटरैक्टिव कैनवास जहाँ CSS नृत्य करता है और JavaScript जादू लाता है।', hinglish: 'Interactive canvases where CSS dances and JavaScript brings magic to life.' },
  'projects.section.2.title': { en: 'The Component Gallery', hi: 'कम्पोनेंट गैलरी', hinglish: 'The Component Gallery' },
  'projects.section.2.subtitle': { en: 'Uiverse Creations', hi: 'Uiverse कृतियाँ', hinglish: 'Uiverse Creations' },
  'projects.section.2.description': { en: 'Curated UI components crafted with passion and shared with the world.', hi: 'जोशीले UI कम्पोनेंट्स जो दुनिया के साथ साझा किए गए हैं।', hinglish: 'Curated UI components crafted with passion and shared with the world.' },
  'projects.section.3.title': { en: 'The Knowledge Archive', hi: 'ज्ञान अभिलेखागार', hinglish: 'The Knowledge Archive' },
  'projects.section.3.subtitle': { en: 'Dev.to Articles', hi: 'Dev.to लेख', hinglish: 'Dev.to Articles' },
  'projects.section.3.description': { en: 'Stories of code, insights from battles fought, and wisdom gained through debugging.', hi: 'कोड की कहानियाँ, समस्याओं से मिली समझ और डीबगिंग के अनुभव से प्राप्त ज्ञान।', hinglish: 'Stories of code, insights from battles fought, and wisdom gained through debugging.' },

  // Photography
  'photography.badge': { en: 'Photography', hi: 'फ़ोटोग्राफी', hinglish: 'Photography' },
  'photography.top': { en: 'TOP SHOT', hi: 'सर्वोत्तम शॉट', hinglish: 'TOP SHOT' },

  // Skills
  'skills.badge': { en: 'Skills', hi: 'कौशल', hinglish: 'Skills' },

  // Install prompt
  'install.title': { en: 'Install this app', hi: 'इस ऐप को इंस्टॉल करें', hinglish: 'Install this app' },
  'install.subtitle': { en: 'Install this site as an app for a faster, more integrated experience.', hi: 'एक तेज़ और अधिक सुगम अनुभव के लिए इस साइट को ऐप के रूप में इंस्टॉल करें।', hinglish: 'Install this site as an app for a faster, more integrated experience.' },
  'install.install': { en: 'Install', hi: 'इंस्टॉल', hinglish: 'Install' },
  'install.dismiss': { en: 'Dismiss', hi: 'छोड़ें', hinglish: 'Dismiss' },
  'install.toast.installed': { en: 'App installed — thanks!', hi: 'ऐप इंस्टॉल किया गया — धन्यवाद!', hinglish: 'App installed — thanks!' },
  'install.toast.dismissed': { en: 'Installation dismissed', hi: 'इंस्टॉलेशन रद्द किया गया', hinglish: 'Installation dismissed' },
  'install.toast.failed': { en: 'Install failed', hi: 'इंस्टॉल विफल', hinglish: 'Install failed' },

  // Hero Left
  'hero.view_work': { en: 'View My Work', hi: 'मेरा काम देखें', hinglish: 'View My Work' },
  'hero.left.1': { en: 'IMAGINE.', hi: 'कल्पना।', hinglish: 'IMAGINE.' },
  'hero.left.2': { en: 'SKETCH.', hi: 'स्केच।', hinglish: 'SKETCH.' },
  'hero.left.3': { en: 'DEBUG.', hi: 'डीबग।', hinglish: 'DEBUG.' },
  'hero.left.4': { en: 'WOW.', hi: 'वाह।', hinglish: 'WOW.' },

  // Skills section quotes
  'skills.quote.left': { en: 'In the vast universe of code, every developer carries their own arsenal...', hi: 'कोड के विशाल ब्रह्मांड में, हर डेवलपर के पास अपना हथियार भण्डार होता है...', hinglish: 'In the vast universe of code, हर developer carries their own arsenal...' },
  'skills.quote.right': { en: 'Tools sharpened through countless hours of debugging, skills honed in the fires of production deployments, and wisdom gained from a thousand Stack Overflow searches.', hi: 'असंख्य डीबगिंग घंटों से तेज़ किये गए उपकरण, प्रोडक्शन में डिप्लॉयमेंट के अनुभव से निखरे कौशल, और हजारों Stack Overflow खोजों से मिली समझ।', hinglish: 'Tools sharpened through countless hours of debugging, skills honed in production, and wisdom from Stack Overflow searches.' },
  'skills.quote.center': { en: 'These are not just technologies... they are the building blocks of digital dreams, the instruments of creation, the weapons against impossible deadlines.', hi: 'ये केवल तकनीकें नहीं हैं... ये डिजिटल सपनों के निर्माण खण्ड हैं, सृजन के साधन हैं, असंभव डेडलाइनों के खिलाफ हथियार हैं।', hinglish: 'These are not just technologies... ये building blocks हैं of digital dreams.' },
  // Qualifications
  'qual.semesters': { en: 'Semesters', hi: 'सेमेस्टर', hinglish: 'Semesters' },
  'qual.challenge': { en: 'Challenge', hi: 'चुनौती', hinglish: 'Challenge' },
  'qual.solution': { en: 'Solution', hi: 'समाधान', hinglish: 'Solution' },
  'qual.result': { en: 'Result', hi: 'परिणाम', hinglish: 'Result' },
}

export function t(key: string, lang?: LangCode) {
  try {
    const l = (lang as LangCode) || (typeof window !== 'undefined' ? (localStorage.getItem('preferredLang') as LangCode) || 'en' : 'en')
    // Merge extra translations on-demand (non-destructive)
    Object.assign(translations, extraTranslations)
    return (translations[key] && translations[key][l]) || (translations[key] && translations[key]['en']) || key
  } catch (e) {
    return key
  }
}

export function translateDocument(lang?: LangCode) {
  const l = (lang as LangCode) || (typeof window !== 'undefined' ? (localStorage.getItem('preferredLang') as LangCode) || 'en' : 'en')

  // ensure our extra translations are available
  Object.assign(translations, extraTranslations)

  Object.keys(translations).forEach((key) => {
    const nodes = document.querySelectorAll(`[data-i18n="${key}"]`)
    const tstr = t(key, l)

    nodes.forEach((n) => {
      // If element is an input or textarea and doesn't have an explicit data-i18n-attr, set placeholder
      if (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) {
        n.placeholder = tstr
        return
      }

      const attr = n.getAttribute('data-i18n-attr')
      if (attr) {
        // set requested attribute (eg. aria-label)
        ;(n as HTMLElement).setAttribute(attr, tstr)
        // also update textContent if element has visible text
        if (n instanceof HTMLElement && n.childElementCount === 0) n.textContent = tstr
        return
      }

      // default: set text content
      if (n instanceof HTMLElement) n.textContent = tstr
    })
  })
}
