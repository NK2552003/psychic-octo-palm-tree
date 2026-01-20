export type LangCode = "en" | "hi" | "hinglish"

export const translations: Record<string, Record<LangCode, string>> = {
  "about.badge": {
    en: "About Me",
    hi: "मेरे बारे में",
    hinglish: "About Me — मेरे बारे में",
  },
  // Decorative large title letters (rendered per-character)
  "about.title.left": { en: "CREATIVE", hi: "रचनात्मक", hinglish: "CREATIVE" },
  "about.title.right": { en: "DEVOP", hi: "डेवलप", hinglish: "DEVOP" },
  "quote.left.1": {
    en: '"Code is poetry written',
    hi: '"कोड कविता है जो लिखी जाती है',
    hinglish: '"Code तो एक कविता है logic की',
  },
  "quote.left.2": {
    en: "in logic and translated",
    hi: "तर्क में और अनुवादित",
    hinglish: "जो लिखी जाती है logic की भाषा में",
  },
  "quote.left.3": {
    en: 'into possibility."',
    hi: 'संभावना में।"',
    hinglish: 'और बदलती है हर चीज़ को एक नई संभावना में."',
  },
  // Right quote
  "quote.right.1": {
    en: '"Passionate about crafting',
    hi: '"रचनात्मकता बनाने के लिए जुनूनी',
    hinglish: '"मैं experience बनाने में passionate हूँ',
  },
  "quote.right.2": {
    en: "experiences that blend",
    hi: "अनुभव जो मिलाते हैं",
    hinglish: "जो design और functionality को together लाते हैं",
  },
  "quote.right.3": {
    en: 'design with functionality."',
    hi: 'डिज़ाइन को फ़ंक्शन के साथ।"',
    hinglish: 'एक beautiful balance में."',
  },

  // Center bottom quote lines
  "quote.center.1": {
    en: '"Every pixel, every line',
    hi: '"हर पिक्सल, हर पंक्ति',
    hinglish: '"हर pixel, हर line of code',
  },
  "quote.center.2": {
    en: "of code is an opportunity",
    hi: "कोड एक अवसर है",
    hinglish: "एक नया opportunity है something amazing बनाने का",
  },
  "quote.center.3": { en: "to create something", hi: "कुछ बनाने के लिए", hinglish: "कुछ extraordinary create करने का" },
  "quote.center.4": {
    en: "extraordinary and push",
    hi: "असाधारण और धकेलना",
    hinglish: "और design की boundaries को push करने का",
  },
  "quote.center.5": { en: 'the boundaries of design."', hi: 'डिज़ाइन की सीमाओं को।"', hinglish: 'एक नई दिशा दिखाने का।"' },
  "specialties.title": {
    en: "Specialties",
    hi: "विशेषताएँ",
    hinglish: "Specialties / विशेषज्ञता",
  },
  "specialties.li1": {
    en: "Full-Stack Development",
    hi: "फुल-स्टैक विकास",
    hinglish: "Full-Stack विकास",
  },
  "specialties.li2": {
    en: "UI/UX Design & Animation",
    hi: "UI/UX डिज़ाइन और एनीमेशन",
    hinglish: "UI/UX डिज़ाइन & एनीमेशन",
  },
  "specialties.li3": {
    en: "Creative Problem Solving",
    hi: "रचनात्मक समस्या समाधान",
    hinglish: "Creative समस्या समाधान",
  },
  // Navigation labels
  "nav.home": { en: "Home", hi: "होम", hinglish: "Home / होम" },
  "nav.about": { en: "About Me", hi: "मेरे बारे में", hinglish: "About / मेरे बारे में" },
  "nav.skills": { en: "Skills", hi: "कौशल", hinglish: "Skills / कौशल" },
  "nav.projects": { en: "Projects", hi: "परियोजनाएँ", hinglish: "Projects / परियोजनाएँ" },
  "nav.photography": { en: "Photography", hi: "फ़ोटोग्राफ़ी", hinglish: "Photography / फ़ोटोग्राफ़ी" },
  "nav.experience": { en: "Experience", hi: "अनुभव", hinglish: "Experience / अनुभव" },
  "nav.contact": { en: "Contact", hi: "संपर्क", hinglish: "Contact / संपर्क" },
  "hero.description": {
    en: `I'm an undergraduate engineering student who enjoys building\n              real-world web applications, learning modern technologies, and\n              expressing creativity through photography. I love turning ideas\n              into functional, meaningful digital experiences.`,
    hi: `मैं एक स्नातक इंजीनियरिंग छात्र हूँ जो वास्तविक दुनिया की वेब एप्लिकेशन बनाने, आधुनिक तकनीकों को सीखने और फ़ोटोग्राफ़ी के माध्यम से रचनात्मकता व्यक्त करने का आनंद लेता है। मैं विचारों को कार्यशील और अर्थपूर्ण डिजिटल अनुभवों में बदलना पसंद करता हूँ।`,
    hinglish: `I'm एक engineering student जो real-world web applications बनाने में passionate हूँ, modern technologies सीखता हूँ, और photography के ज़रिए अपनी creativity को express करता हूँ। मैं ideas को functional digital experiences में turn करने का शौकीन हूँ।`,
  },
  "center.building.1": {
    en: "BUILDING",
    hi: "बिल्डिंग",
    hinglish: "BUILDING",
  },
  "center.building.2": {
    en: "THE FUTURE",
    hi: "भविष्य",
    hinglish: "THE FUTURE",
  },
  "name.turning": {
    en: "TURNING",
    hi: "घुमाना",
    hinglish: "TURNING",
  },
  "name.ideas": {
    en: "IDEAS",
    hi: "विचार",
    hinglish: "IDEAS",
  },
  "name.into": {
    en: "INTO REALITY",
    hi: "वास्तविकता में",
    hinglish: "INTO REALITY",
  },
}

export const extraTranslations: Record<string, Record<LangCode, string>> = {
  // Landing
  "scroll.label": { en: "SCROLL", hi: "स्क्रॉल", hinglish: "SCROLL" },
  "scroll.button": { en: "Scroll down", hi: "नीचे स्क्रॉल करें", hinglish: "Scroll down" },

  // Header
  "header.location": { en: "Haryana, India ·", hi: "हरियाणा, भारत ·", hinglish: "Haryana, India ·" },

  // Contact
  "contact.badge": { en: "Contact", hi: "संपर्क", hinglish: "Contact / संपर्क" },
  "contact.h1": { en: "BEGIN SOMETHING", hi: "कुछ शुरू करें", hinglish: "BEGIN SOMETHING" },
  "contact.h2": {
    en: "Say Hi! & tell me about your idea",
    hi: "नमस्ते कहें और अपनी परियोजना बताएं",
    hinglish: "नमस्ते बोलो! और अपना idea बताओ मुझे",
  },
  "contact.label.name": { en: "Name", hi: "नाम", hinglish: "Name / नाम" },
  "contact.placeholder.name": { en: "Hello...", hi: "नमस्ते...", hinglish: "Hello... / नमस्ते..." },
  "contact.label.email": { en: "Email", hi: "ईमेल", hinglish: "Email / ईमेल" },
  "contact.placeholder.email": { en: "Where can I reply?", hi: "मैं किस पर उत्तर दूं?", hinglish: "Where can I reply?" },
  "contact.label.company": { en: "Company name", hi: "कंपनी का नाम", hinglish: "Company / कंपनी" },
  "contact.placeholder.company": {
    en: "Your company or website?",
    hi: "आपकी कंपनी या वेबसाइट?",
    hinglish: "Your company or website?",
  },
  "contact.services.label": { en: "What’s in your mind?", hi: "आपके मन में क्या है?", hinglish: "What's in your mind?" },
  "service.mobile_app": { en: "Mobile App", hi: "मोबाइल ऐप", hinglish: "Mobile App" },
  "service.website_design": { en: "Website Design", hi: "वेबसाइट डिज़ाइन", hinglish: "Website Design" },
  "service.branding": { en: "Branding", hi: "ब्रांडिंग", hinglish: "Branding" },
  "service.webflow_development": { en: "Webflow Development", hi: "Webflow विकास", hinglish: "Webflow Development" },
  "service.app_design": { en: "App Design", hi: "ऐप डिज़ाइन", hinglish: "App Design" },
  "service.graphic_design": { en: "Graphic Design", hi: "ग्राफिक डिज़ाइन", hinglish: "Graphic Design" },
  "service.wordpress": { en: "WordPress", hi: "वर्डप्रेस", hinglish: "WordPress" },
  "contact.placeholder.message": {
    en: "Tell me more about your idea...",
    hi: "अपने विचार के बारे में और बताइए...",
    hinglish: "अपने idea के बारे में मुझे बताओ...अलग से क्या करना चाहते हो?",
  },
  "contact.send": { en: "Send Me", hi: "भेजें", hinglish: "Send Me" },
  "contact.sending": { en: "Sending...", hi: "प्रेषण...", hinglish: "Sending..." },
  "contact.toast.success": {
    en: "Message sent successfully! ✨",
    hi: "संदेश सफलतापूर्वक भेजा गया! ✨",
    hinglish: "Message बड़ी successfully भेज दिया! ✨",
  },
  "contact.toast.success.desc": {
    en: "I'll get back to you soon.",
    hi: "मैं जल्द ही आपसे संपर्क करूंगा।",
    hinglish: "जल्द ही मैं तुमसे contact करूँगा। 😊",
  },
  "contact.toast.error": { en: "Message not sent", hi: "संदेश नहीं भेजा गया", hinglish: "Oops! Message नहीं भेज पाए" },
  "contact.toast.error.desc": {
    en: "Please try again or contact me directly.",
    hi: "कृपया पुनः प्रयास करें या मुझसे सीधे संपर्क करें।",
    hinglish: "फिर से try करो या direct मुझसे contact करो।",
  },

  // Cookies
  "cookie.back": { en: "Back to site", hi: "साइट पर वापस", hinglish: "Back to site" },
  "cookie.title": { en: "Cookie Policy", hi: "कूकी नीति", hinglish: "Cookie Policy" },
  "cookie.p1": {
    en: "I use cookies to improve performance and provide a better experience. By accepting cookies you enable features like faster load times, improved caching, and analytics that help improve the site.",
    hi: "मैं प्रदर्शन को बेहतर बनाने और बेहतर अनुभव प्रदान करने के लिए कुकीज़ का उपयोग करता हूँ। कुकीज़ स्वीकार करने से तेज़ लोड समय, उन्नत कैशिंग और एनालिटिक्स जैसी सुविधाएँ सक्षम होती हैं।",
    hinglish:
      "मैं cookies का use करता हूँ site को fast रखने के लिए। Cookies allow करने से आपको faster load times मिलेंगे और अच्छा experience होगा।",
  },
  "cookie.what.heading": { en: "What cookies I set", hi: "मैं कौन सी कुकीज़ सेट करता हूँ", hinglish: "What cookies I set" },
  "cookie.performance": { en: "Performance cookies", hi: "परफ़ॉर्मेंस कुकीज़", hinglish: "Performance cookies" },
  "cookie.performance.desc": {
    en: "used to cache resources and make page loads faster.",
    hi: "संसाधनों को कैश करने और पृष्ठ लोड को तेज़ करने के लिए उपयोग किए जाते हैं।",
    hinglish: "used to cache resources and make page loads faster.",
  },
  "cookie.essential": { en: "Essential cookies", hi: "ज़रूरी कुकीज़", hinglish: "Essential cookies" },
  "cookie.note": {
    en: "You can clear or block cookies in your browser at any time. If you reject performance cookies, the site will still work but may be slower.",
    hi: "आप किसी भी समय अपने ब्राउज़र में कुकीज़ हटा या ब्लॉक कर सकते हैं। यदि आप प्रदर्शन कुकीज़ को अस्वीकार करते हैं, तो साइट अभी भी काम करेगी लेकिन धीमी हो सकती है।",
    hinglish: "You browser में कभी भी cookies clear या block कर सकते हो। अगर performance cookies reject करोगे तो साइट धीरे चल सकती है।",
  },
  "cookie.essential.desc": {
    en: "required for navigation and basic functionality.",
    hi: "नेविगेशन और बुनियादी कार्यक्षमता के लिए आवश्यक।",
    hinglish: "required for navigation and basic functionality.",
  },
  "cookie.accept": { en: "Accept Cookies", hi: "कुकीज़ स्वीकार करें", hinglish: "Accept Cookies" },
  "cookie.reject": { en: "Reject", hi: "अस्वीकार", hinglish: "Reject" },
  "cookie.status": { en: "Cookies:", hi: "कुकीज़:", hinglish: "Cookies:" },
  "cookie.status.accepted": { en: "accepted", hi: "स्वीकृत", hinglish: "accepted" },
  "cookie.status.rejected": { en: "rejected", hi: "अस्वीकृत", hinglish: "rejected" },
  "cookie.change": { en: "Change preferences", hi: "पसंद बदलें", hinglish: "Change preferences" },
  "cookie.accept.toast": {
    en: "Cookies accepted — thanks!",
    hi: "कुकीज़ स्वीकार कर ली गईं — धन्यवाद!",
    hinglish: "Cookies accepted — thanks!",
  },
  "cookie.reject.toast": {
    en: "You have rejected performance cookies",
    hi: "आपने प्रदर्शन कुकीज़ अस्वीकार कर दी हैं",
    hinglish: "You have rejected performance cookies",
  },
  "cookie.clear.toast": {
    en: "Cookie preferences cleared — you can re-accept or reject",
    hi: "कुकी प्राथमिकताएँ साफ़ कर दी गई हैं — आप पुनः स्वीकार या अस्वीकार कर सकते हैं",
    hinglish: "Cookie preferences cleared — you can re-accept or reject",
  },
  "cookie.read": { en: "Read my cookie policy", hi: "मेरी कुकी नीति पढ़ें", hinglish: "Read my cookie policy" },
  "cookie.dismiss": { en: "Dismiss", hi: "बंद करें", hinglish: "Dismiss" },
  "cookie.accept.title": {
    en: "I use cookies",
    hi: "मैं कुकीज़ का उपयोग करता हूँ",
    hinglish: "हमारे cookies को allow करो? 🍪",
  },
  "contact.followup": {
    en: "I’ll get back to you within 24 hours",
    hi: "मैं 24 घंटों के भीतर आपसे संपर्क करूंगा",
    hinglish: "24 घंटे में मैं तुमसे ज़रूर contact करूँगा",
  },

  // Footer
  "footer.copyright": {
    en: "© 2026 Nitish's Portfolio",
    hi: "© 2026 नितीश का पोर्टफोलियो",
    hinglish: "© 2026 Nitish's Portfolio",
  },
  "footer.all_rights": { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।", hinglish: "All rights reserved." },
  "footer.cookie_policy": { en: "Cookie Policy", hi: "कूकी नीति", hinglish: "Cookie Policy" },
  "footer.wdawards": { en: "WDAwards nominee →", hi: "WDAwards नामांकित →", hinglish: "WDAwards nominee →" },

  "wdawards.toast.title": { en: "WDAwards nominee", hi: "WDAwards नामांकित", hinglish: "WDAwards nominee" },
  "wdawards.toast.desc": { en: "Recognised nominee — view entry", hi: "नामांकित — प्रविष्टि देखें", hinglish: "Recognised nominee — view entry" },
  "wdawards.action": { en: "View", hi: "देखें", hinglish: "View" },

  // Projects
  "projects.badge": { en: "Projects", hi: "परियोजनाएँ", hinglish: "Projects" },
  "projects.h1": {
    en: "Crafting Digital Experiences",
    hi: "डिजिटल अनुभव बनाना",
    hinglish: "Digital Experiences को craft करते हुए",
  },
  "projects.p": {
    en: "A journey through code, creativity, and endless possibilities.",
    hi: "कोड, रचनात्मकता और अंतहीन संभावनाओं की यात्रा।",
    hinglish: "Code, creativity और possibilities की journey में आ जाओ",
  },
  "projects.section.0.title": { en: "The Code Chronicles", hi: "कोड क्रॉनिकल्स", hinglish: "The Code Chronicles" },
  "projects.section.0.subtitle": { en: "GitHub Repositories", hi: "GitHub रिपॉज़िटरी", hinglish: "GitHub Repositories" },
  "projects.section.0.description": {
    en: "Where ideas transform into open-source reality, one commit at a time.",
    hi: "जहाँ विचार एक-एक कमिट में ओपन-सोर्स वास्तविकता बनते हैं।",
    hinglish: "जहाँ मेरे ideas open-source reality बनते हैं, एक commit at a time",
  },
  "projects.section.1.title": {
    en: "The Creative Playground",
    hi: "रचनात्मक प्लेग्राउंड",
    hinglish: "The Creative Playground",
  },
  "projects.section.1.subtitle": { en: "CodePen Experiments", hi: "CodePen प्रयोग", hinglish: "CodePen Experiments" },
  "projects.section.1.description": {
    en: "Interactive canvases where CSS dances and JavaScript brings magic to life.",
    hi: "इंटरैक्टिव कैनवास जहाँ CSS नृत्य करता है और JavaScript जादू लाता है।",
    hinglish: "Interactive experiments जहाँ CSS नाचती है और JavaScript magic करता है",
  },
  "projects.section.2.title": { en: "The Component Gallery", hi: "कम्पोनेंट गैलरी", hinglish: "The Component Gallery" },
  "projects.section.2.subtitle": { en: "Uiverse Creations", hi: "Uiverse कृतियाँ", hinglish: "Uiverse Creations" },
  "projects.section.2.description": {
    en: "Curated UI components crafted with passion and shared with the world.",
    hi: "जोशीले UI कम्पोनेंट्स जो दुनिया के साथ साझा किए गए हैं।",
    hinglish: "Beautiful UI components जो passion से बने हैं दुनिया के साथ share करने के लिए",
  },
  "projects.section.3.title": { en: "The Knowledge Archive", hi: "ज्ञान अभिलेखागार", hinglish: "The Knowledge Archive" },
  "projects.section.3.subtitle": { en: "Dev.to Articles", hi: "Dev.to लेख", hinglish: "Dev.to Articles" },
  "projects.section.3.description": {
    en: "Stories of code, insights from battles fought, and wisdom gained through debugging.",
    hi: "कोड की कहानियाँ, समस्याओं से मिली समझ और डीबगिंग के अनुभव से प्राप्त ज्ञान।",
    hinglish: "Code की कहानियाँ, bugs से सीखे lessons, और debugging से मिली wisdom",
  },

  // Photography
  "photography.badge": { en: "Photography", hi: "फ़ोटोग्राफ़ी", hinglish: "Photography" },
  "photography.top": { en: "TOP SHOT", hi: "सर्वोत्तम शॉट", hinglish: "TOP SHOT" },

  // Qualifications entries
  "qual.entry.0.title": { en: "Secondary Schooling", hi: "माध्यमिक शिक्षा", hinglish: "Secondary Schooling" },
  "qual.entry.0.institution": {
    en: "Honey Modern High School",
    hi: "हनी मॉडर्न हाई स्कूल",
    hinglish: "Honey Modern High School",
  },
  "qual.entry.0.duration": { en: "2018 - 2019", hi: "2018 - 2019", hinglish: "2018 - 2019" },
  "qual.entry.0.description": {
    en: "Completed with distinction in Science and Mathematics. Scored 87.6% aggregate",
    hi: "विज्ञान और गणित में उत्कृष्टता के साथ पूरा किया। कुल मिलाकर 87.6%",
    hinglish: "Completed with distinction in Science and Mathematics. Scored 87.6% aggregate",
  },

  "qual.entry.1.title": {
    en: "Senior Secondary Schooling",
    hi: "हायर सेकेंडरी शिक्षा",
    hinglish: "Senior Secondary Schooling",
  },
  "qual.entry.1.institution": {
    en: "Hindu Sr. Sec. School",
    hi: "हिंदू सीनियर सेकेंडरी स्कूल",
    hinglish: "Hindu Sr. Sec. School",
  },
  "qual.entry.1.duration": { en: "2020 - 2021", hi: "2020 - 2021", hinglish: "2020 - 2021" },
  "qual.entry.1.description": {
    en: "Science Stream with 80.2% aggregate",
    hi: "साइंस स्ट्रीम, कुल मिलाकर 80.2%",
    hinglish: "Science Stream with 80.2% aggregate",
  },

  "qual.entry.2.title": {
    en: "B.Tech in Computer Science",
    hi: "बी.टेक कंप्यूटर साइंस",
    hinglish: "B.Tech in Computer Science",
  },
  "qual.entry.2.institution": {
    en: "University: Tula's Institute, Dehradun aff. VMSBUTU",
    hi: "यूनिवर्सिटी: तुला इंस्टिट्यूट, देहरादून (VMSBUTU से संबद्ध)",
    hinglish: "University: Tula's Institute, Dehradun aff. VMSBUTU",
  },
  "qual.entry.2.duration": { en: "2022 - Present", hi: "2022 - वर्तमान", hinglish: "2022 - Present" },
  "qual.entry.2.description": {
    en: "Specialized in Software Engineering and Data Structures",
    hi: "सॉफ़्टवेयर इंजीनियरिंग और डेटा स्ट्रक्चर में विशेषज्ञता",
    hinglish: "Specialized in Software Engineering and Data Structures",
  },
  "qual.entry.2.details.challenge": {
    en: "Balancing rigorous coursework with internships and projects.",
    hi: "कठोर पाठ्यक्रम को इंटर्नशिप और परियोजनाओं के साथ संतुलित करना।",
    hinglish: "Tough coursework को internships और projects के साथ balance करना था",
  },
  "qual.entry.2.details.solution": {
    en: "Focused on core subjects, practical projects and continuous learning.",
    hi: "मुख्य विषयों, व्यावहारिक परियोजनाओं और लगातार सीखने पर ध्यान दिया।",
    hinglish: "Core subjects पर focus किया, practical projects किए और continuously सीखता रहा",
  },
  "qual.entry.2.details.result": {
    en: "Consistent performance and multiple shipped projects.",
    hi: "सतत प्रदर्शन और कई सफल परियोजनाएँ।",
    hinglish: "Consistent performance दी और कई successful projects बनाए",
  },

  "qual.entry.3.title": {
    en: "Web Development Internship",
    hi: "वेब विकास इंटर्नशिप",
    hinglish: "Web Development Internship",
  },
  "qual.entry.3.institution": { en: "Internshala", hi: "इंटरनशाला", hinglish: "Internshala" },
  "qual.entry.3.duration": { en: "Aug-Oct 2023", hi: "अगस्त-अक्टूबर 2023", hinglish: "Aug-Oct 2023" },
  "qual.entry.3.description": {
    en: "Completed a web dev internship via Internshala, working with HTML, CSS, JS, React, and Node.js.",
    hi: "Internshala के माध्यम से वेब डेवलपमेंट इंटर्नशिप पूरी की, HTML, CSS, JS, React और Node.js के साथ काम किया।",
    hinglish: "Completed a web dev internship via Internshala, working with HTML, CSS, JS, React, and Node.js.",
  },
  "qual.entry.3.details.challenge": {
    en: "Required expertise in modern web technologies and responsive design principles.",
    hi: "आधुनिक वेब तकनीक और उत्तरदायी डिज़ाइन सिद्धांतों में विशेषज्ञता की आवश्यकता।",
    hinglish: "Modern web tech और responsive design में expertise की जरूरत थी",
  },
  "qual.entry.3.details.solution": {
    en: "Mastered React, Node.js, and database management through hands-on projects.",
    hi: "हाथों-हाथ परियोजनाओं के माध्यम से React, Node.js और डेटाबेस प्रबंधन में महारत हासिल की।",
    hinglish: "React, Node.js और database management को hands-on करके sikhaya",
  },
  "qual.entry.3.details.result": {
    en: "Built 12+ responsive web applications serving 10,000+ users.",
    hi: "12+ उत्तरदायी वेब एप्लिकेशन बनाईं जो 10,000+ उपयोगकर्ताओं की सेवा करते हैं।",
    hinglish: "12+ responsive apps बनाए जो 10,000+ लोगों use कर रहे हैं",
  },

  "qual.entry.4.title": { en: "App Development", hi: "ऐप विकास", hinglish: "App Development" },
  "qual.entry.4.institution": {
    en: "Flutter & Dart Course - Udemy",
    hi: "Flutter & Dart कोर्स - Udemy",
    hinglish: "Flutter & Dart Course - Udemy",
  },
  "qual.entry.4.duration": { en: "Apr-Jun 2024", hi: "अप्रैल-जून 2024", hinglish: "Apr-Jun 2024" },
  "qual.entry.4.description": {
    en: "Completed a Flutter & Dart course on Udemy, learning to build cross-platform mobile apps.",
    hi: "Udemy पर Flutter & Dart कोर्स पूरा किया, क्रॉस-प्लैटफ़ॉर्म मोबाइल ऐप्स बनाना सीखा।",
    hinglish: "Completed a Flutter & Dart course on Udemy, learning to build cross-platform mobile apps.",
  },
  "qual.entry.4.details.challenge": {
    en: "Needed to master cross-platform mobile development for rapid deployment.",
    hi: "तेज़ तैनाती के लिए क्रॉस-प्लैटफ़ॉर्म मोबाइल विकास में माहिर होना आवश्यक था।",
    hinglish: "Cross-platform mobile development को master करना था quickly launch करने के लिए",
  },
  "qual.entry.4.details.solution": {
    en: "Completed comprehensive Flutter certification covering UI/UX, state management, and API integration.",
    hi: "UI/UX, स्टेट मैनेजमेंट और API इंटीग्रेशन कवर करने वाली Flutter प्रमाणन पूरी की।",
    hinglish: "Flutter certification complete की जो UI/UX, state management और API integration cover करती है",
  },
  "qual.entry.4.details.result": {
    en: "Successfully deployed 5 production apps with 50% reduced development time.",
    hi: "5 प्रोडक्शन ऐप्स सफलतापूर्वक डिप्लॉय कीं, विकास समय में 50% कमी।",
    hinglish: "5 production apps launch किए in 50% कम time में",
  },

  "qual.entry.5.title": { en: "React Course", hi: "React कोर्स", hinglish: "React Course" },
  "qual.entry.5.institution": { en: "Udemy", hi: "Udemy", hinglish: "Udemy" },
  "qual.entry.5.duration": { en: "September 2025", hi: "सितंबर 2025", hinglish: "September 2025" },
  "qual.entry.5.description": {
    en: "Pursuing an advanced React course covering components, hooks, state, and SPA architecture.",
    hi: "कम्पोनेंट्स, hooks, state और SPA आर्किटेक्चर कवर करने वाला उन्नत React कोर्स कर रहा हूँ।",
    hinglish: "Pursuing an advanced React course covering components, hooks, state, and SPA architecture.",
  },
  "qual.entry.5.details.challenge": {
    en: "Mastering advanced React concepts and SPA architecture for scalable web apps.",
    hi: "स्केलेबल वेब ऐप्स के लिए उन्नत React अवधारणाओं और SPA आर्किटेक्चर में महारत हासिल करना।",
    hinglish: "Advanced React concepts और SPA architecture को master करना था scalable apps के लिए",
  },
  "qual.entry.5.details.solution": {
    en: "Completed an advanced React course focused on hooks, component architecture, and performance optimization.",
    hi: "hooks, component architecture और प्रदर्शन अनुकूलन पर केंद्रित उन्नत React कोर्स पूरा किया।",
    hinglish: "Advanced React course complete की जो hooks, component architecture और performance optimization सिखाता है",
  },
  "qual.entry.5.details.result": {
    en: "Proficient in building scalable, maintainable React applications with clean code practices.",
    hi: "स्वच्छ कोड प्रथाओं के साथ स्केलेबल, रखरखाव योग्य React एप्लिकेशन बनाने में दक्ष।",
    hinglish: "Scalable और maintainable React apps बनाने में proficient हूँ clean code के साथ",
  },

  "qual.entry.6.title": {
    en: "Big Data & Cloud Computing",
    hi: "बिग डेटा और क्लाउड कंप्यूटिंग",
    hinglish: "Big Data & Cloud Computing",
  },
  "qual.entry.6.institution": { en: "Campus Shutra", hi: "Campus Shutra", hinglish: "Campus Shutra" },
  "qual.entry.6.duration": { en: "November 2025", hi: "नवंबर 2025", hinglish: "November 2025" },
  "qual.entry.6.description": {
    en: "Completed a Big Data & Cloud Computing course at Campus Shutra, learning distributed data processing and cloud infrastructure.",
    hi: "Campus Shutra में Big Data और Cloud Computing कोर्स पूरा किया, वितरित डेटा प्रोसेसिंग और क्लाउड इंफ़्रास्ट्रक्चर सीखा।",
    hinglish:
      "Completed a Big Data & Cloud Computing course at Campus Shutra, learning distributed data processing and cloud infrastructure.",
  },
  "qual.entry.6.details.challenge": {
    en: "Handling massive datasets and deploying scalable analytics in the cloud.",
    hi: "विशाल डेटासेट को संभालना और क्लाउड में स्केलेबल एनालिटिक्स तैनात करना।",
    hinglish: "Handling massive datasets और क्लाउड में scalable analytics तैनात करना।",
  },
  "qual.entry.6.details.solution": {
    en: "Mastered Hadoop, Spark, and AWS cloud services for distributed computing and data engineering.",
    hi: "वितरित कंप्यूटिंग और डेटा इंजीनियरिंग के लिए Hadoop, Spark और AWS क्लाउड सेवाओं में महारत हासिल की।",
    hinglish: "Mastered Hadoop, Spark, और AWS cloud services for distributed computing और data engineering.",
  },
  "qual.entry.6.details.result": {
    en: "Built and deployed scalable big data pipelines and cloud-based analytics platforms.",
    hi: "स्केलेबल बिग डेटा पाइपलाइनों और क्लाउड-आधारित एनालिटिक्स प्लेटफ़ॉर्म का निर्माण और तैनाती की।",
    hinglish: "Built and deployed scalable big data pipelines और cloud-based analytics platforms.",
  },

  "qual.status.ongoing": { en: "Ongoing", hi: "चालू", hinglish: "Ongoing" },
  "qual.status.pending": { en: "Pending", hi: "लंबित", hinglish: "Pending" },
  // Titles (nature-themed two-word titles)
  "photography.title.0": { en: "Silent Woods", hi: "मौन जंगल", hinglish: "Silent Woods" },
  "photography.title.1": { en: "Golden Dawn", hi: "स्वर्णिम भोर", hinglish: "Golden Dawn" },
  "photography.title.2": { en: "Misty Lake", hi: "धुँधला झील", hinglish: "Misty Lake" },
  "photography.title.3": { en: "Wild Bloom", hi: "जंगली खिलना", hinglish: "Wild Bloom" },
  "photography.title.4": { en: "Crystal River", hi: "स्फटिक नदी", hinglish: "Crystal River" },
  "photography.title.5": { en: "Frosty Peaks", hi: "हिमाच्छादित चोटियाँ", hinglish: "Frosty Peaks" },
  "photography.title.6": { en: "Sunny Glade", hi: "सूर्यप्रकाशित घाटी", hinglish: "Sunny Glade" },
  "photography.title.7": { en: "Hidden Valley", hi: "छुपा हुआ घाटी", hinglish: "Hidden Valley" },
  "photography.title.8": { en: "Gentle Breeze", hi: "हल्की हवा", hinglish: "Gentle Breeze" },
  "photography.title.9": { en: "Emerald Forest", hi: "पन्ना जंगल", hinglish: "Emerald Forest" },
  "photography.title.10": { en: "Shady Grove", hi: "छायादार बाग", hinglish: "Shady Grove" },
  "photography.title.11": { en: "Peaceful Stream", hi: "शांत धारा", hinglish: "Peaceful Stream" },
  "photography.title.12": { en: "Starry Night", hi: "तारों की रात", hinglish: "Starry Night" },
  "photography.title.13": { en: "Autumn Leaves", hi: "पतझड़ के पत्ते", hinglish: "Autumn Leaves" },
  "photography.title.14": { en: "Winter Chill", hi: "शीत ऋतु की ठंड", hinglish: "Winter Chill" },
  "photography.title.15": { en: "Spring Dew", hi: "वसंत शारद", hinglish: "Spring Dew" },
  "photography.title.16": { en: "Summer Rain", hi: "गर्मी की बारिश", hinglish: "Summer Rain" },
  "photography.title.17": { en: "Desert Rose", hi: "रेगिस्तान का गुलाब", hinglish: "Desert Rose" },
  "photography.title.18": { en: "Ocean Whisper", hi: "महासागर की फुसफुसाहट", hinglish: "Ocean Whisper" },
  "photography.title.19": { en: "Mountain Echo", hi: "पहाड़ की प्रतिध्वनि", hinglish: "Mountain Echo" },
  "photography.title.20": { en: "Twilight Sky", hi: "सांझ का आकाश", hinglish: "Twilight Sky" },
  "photography.title.21": { en: "Falling Petals", hi: "गिरते पंखुड़ियाँ", hinglish: "Falling Petals" },
  "photography.title.22": { en: "Dancing Shadows", hi: "नृत्यरत छायाएँ", hinglish: "Dancing Shadows" },
  "photography.title.23": { en: "Serene Path", hi: "शांत पथ", hinglish: "Serene Path" },
  "photography.title.24": { en: "Quiet Meadow", hi: "शांत घास का मैदान", hinglish: "Quiet Meadow" },
  "photography.title.25": { en: "Lush Canopy", hi: "घना आवरण", hinglish: "Lush Canopy" },
  "photography.title.26": { en: "Silver Mist", hi: "चांदी सी झील", hinglish: "Silver Mist" },
  "photography.title.27": { en: "Amber Fields", hi: "अंबर खेत", hinglish: "Amber Fields" },
  "photography.title.28": { en: "Cobalt Wave", hi: "कोबाल्ट लहर", hinglish: "Cobalt Wave" },
  "photography.title.29": { en: "Blossom Trail", hi: "खिलता मार्ग", hinglish: "Blossom Trail" },
  "photography.title.30": { en: "Sunset Haze", hi: "सूर्यास्त की धुंध", hinglish: "Sunset Haze" },
  "photography.title.31": { en: "Rainy Silence", hi: "बारिश की चुप्पी", hinglish: "Rainy Silence" },
  "photography.title.32": { en: "Moonlit Plains", hi: "चाँदनी मैदान", hinglish: "Moonlit Plains" },
  "photography.title.33": { en: "Verdant Hills", hi: "हरित पहाड़ियाँ", hinglish: "Verdant Hills" },
  "photography.title.34": { en: "Cloudy Summit", hi: "बादली शिखर", hinglish: "Cloudy Summit" },
  "photography.title.35": { en: "Tranquil Bay", hi: "शांत बंदरगाह", hinglish: "Tranquil Bay" },
  "photography.title.36": { en: "Willow Shade", hi: "बाँस का साया", hinglish: "Willow Shade" },
  "photography.title.37": { en: "Cedar Light", hi: "देवदार प्रकाश", hinglish: "Cedar Light" },
  // Quotes (mapped by index)
  "photography.quote.0": {
    en: "Photography is the story I fail to put into words.",
    hi: "फोटोग्राफी वह कहानी है जिसे मैं शब्दों में नहीं बया कर पाता।",
    hinglish: "Photography is the story I fail to put into words.",
  },
  "photography.quote.1": {
    en: "A picture is a poem without words.",
    hi: "एक तस्वीर बिना शब्दों की कविता है।",
    hinglish: "A picture is a poem without words.",
  },
  "photography.quote.2": {
    en: "The best thing about a picture is that it never changes, even when the people in it do.",
    hi: "तस्वीर की सबसे अच्छी बात यह है कि यह कभी नहीं बदलती, भले ही इसमें लोग बदल जाएँ।",
    hinglish: "The best thing about a picture is that it never changes, even when the people in it do.",
  },
  "photography.quote.3": {
    en: "Taking pictures is savoring life intensely, every hundredth of a second.",
    hi: "तस्वीरें लेना जीवन को तीव्रता से अनुभव करने जैसा है, हर सैकंड में।",
    hinglish: "Taking pictures is savoring life intensely, every hundredth of a second.",
  },
  "photography.quote.4": {
    en: "You don't take a photograph, you make it.",
    hi: "आप एक तस्वीर नहीं लेते, आप उसे बनाते हैं।",
    hinglish: "You don't take a photograph, you make it.",
  },
  "photography.quote.5": {
    en: "A photograph is the pause button of life.",
    hi: "एक तस्वीर जीवन का पॉज़ बटन है।",
    hinglish: "A photograph is the pause button of life.",
  },
  "photography.quote.6": {
    en: "When words become unclear, I shall focus with photographs.",
    hi: "जब शब्द स्पष्ट नहीं होते, मैं तस्वीरों पर ध्यान केंद्रित करूँगा।",
    hinglish: "When words become unclear, I shall focus with photographs.",
  },
  "photography.quote.7": {
    en: "Photography helps people to see.",
    hi: "फोटोग्राफी लोगों को देखने में मदद करती है।",
    hinglish: "Photography helps people to see.",
  },
  "photography.quote.8": {
    en: "A good snapshot keeps a moment from running away.",
    hi: "एक अच्छा स्नैपशॉट पल को दूर जाने से रोकता है।",
    hinglish: "A good snapshot keeps a moment from running away.",
  },
  "photography.quote.9": {
    en: "The camera is an instrument that teaches people how to see without a camera.",
    hi: "कैमरा एक ऐसा यंत्र है जो लोगों को बिना कैमरे के देखना सिखाता है।",
    hinglish: "The camera is an instrument that teaches people how to see without a camera.",
  },
  "photography.quote.10": {
    en: "To photograph is to hold one's breath, when all faculties converge to capture fleeting reality.",
    hi: "तस्वीर लेना उस समय अपनी साँस रोकने जैसा है, जब सभी इन्द्रियाँ क्षणिक वास्तविकता को पकड़ने के लिए मिलती हैं।",
    hinglish: "To photograph is to hold one's breath, when all faculties converge to capture fleeting reality.",
  },
  "photography.quote.11": {
    en: "A great photograph is one that fully expresses what one feels, in the deepest sense, about what is being photographed.",
    hi: "एक महान तस्वीर वही है जो गहरे अर्थ में उस विषय के बारे में जिसको तस्वीर में लिया गया है, वह पूरा भाव व्यक्त करती है।",
    hinglish:
      "A great photograph is one that fully expresses what one feels, in the deepest sense, about what is being photographed.",
  },
  "photography.quote.12": {
    en: "Photography is the beauty of life captured.",
    hi: "फोटोग्राफी जीवन की सुंदरता को कैद कर लेती है।",
    hinglish: "Photography is the beauty of life captured.",
  },
  "photography.quote.13": {
    en: "A photograph can be an instant of life captured for eternity that will never cease looking back at you.",
    hi: "एक तस्वीर जीवन का एक क्षण हो सकती है जो अनन्तकाल के लिए पकड़ा गया हो और जो कभी आपको वापस नहीं देखना बंद करेगा।",
    hinglish: "A photograph can be an instant of life captured for eternity that will never cease looking back at you.",
  },
  "photography.quote.14": {
    en: "The whole point of taking pictures is so that you don't have to explain things with words.",
    hi: "तस्वीरें लेने का पूरा मकसद यह है कि आप चीज़ों को शब्दों से समझाने की जरूरत न महसूस करें।",
    hinglish: "The whole point of taking pictures is so that you don't have to explain things with words.",
  },
  "photography.quote.15": {
    en: "A camera is a SAVE button for the mind's eye.",
    hi: "कैमरा दिमाग की आंख के लिए एक SAVE बटन है।",
    hinglish: "A camera is a SAVE button for the mind's eye.",
  },
  "photography.quote.16": {
    en: "Photography is the only language that can be understood anywhere in the world.",
    hi: "फोटोग्राफी एकमात्र भाषा है जिसे दुनिया भर में समझा जा सकता है।",
    hinglish: "Photography is the only language that can be understood anywhere in the world.",
  },
  "photography.quote.17": {
    en: "A photograph is a secret about a secret. The more it tells you the less you know.",
    hi: "एक तस्वीर रहस्य के बारे में रहस्य है। जितना अधिक यह बताती है उतना ही कम आप जानते हैं।",
    hinglish: "A photograph is a secret about a secret. The more it tells you the less you know.",
  },
  "photography.quote.18": {
    en: "The eye should learn to listen before it looks.",
    hi: "आँख को देखने से पहले सुनना सीखना चाहिये।",
    hinglish: "The eye should learn to listen before it looks.",
  },
  "photography.quote.19": {
    en: "A thing that you see in my pictures is that I was not afraid to fall in love with these people.",
    hi: "मेरी तस्वीरों में आप एक चीज देखेंगे कि मैं इन लोगों के प्यार में पड़ने से नहीं डरता था।",
    hinglish: "A thing that you see in my pictures is that I was not afraid to fall in love with these people.",
  },
  "photography.quote.20": {
    en: "The picture that you took with your camera is the imagination you want to create with reality.",
    hi: "जिस तस्वीर को आपने अपने कैमरे से लिया है वह वही कल्पना है जिसे आप वास्तविकता के साथ बनाना चाहते हैं।",
    hinglish: "The picture that you took with your camera is the imagination you want to create with reality.",
  },
  "photography.quote.21": {
    en: "A photograph is memory in the raw.",
    hi: "एक तस्वीर कच्ची स्मृति है।",
    hinglish: "A photograph is memory in the raw.",
  },
  "photography.quote.22": {
    en: "A photo is not just an image, it's a memory.",
    hi: "एक फोटो केवल एक छवि नहीं है, यह एक स्मृति है।",
    hinglish: "A photo is not just an image, it's a memory.",
  },
  "photography.quote.23": {
    en: "A photograph is the pause button of life.",
    hi: "एक तस्वीर जीवन का पॉज़ बटन है।",
    hinglish: "A photograph is the pause button of life.",
  },
  "photography.quote.24": {
    en: "Photography is the art of frozen time… the ability to store emotion and feelings within a frame.",
    hi: "फोटोग्राफी जमाए हुए समय की कला है… भावनाओं और अहसासों को फ्रेम में संजोने की क्षमता।",
    hinglish: "Photography is the art of frozen time… the ability to store emotion and feelings within a frame.",
  },
  "photography.quote.25": {
    en: "A photograph is a return ticket to a moment otherwise gone.",
    hi: "एक तस्वीर एक वापसी टिकट है उस पल के लिए जो अन्यथा चला गया होता।",
    hinglish: "A photograph is a return ticket to a moment otherwise gone.",
  },
  "photography.quote.26": {
    en: "A photograph is the only language that can be understood anywhere in the world.",
    hi: "फोटोग्राफी एकमात्र भाषा है जिसे दुनिया भर में समझा जा सकता है।",
    hinglish: "A photograph is the only language that can be understood anywhere in the world.",
  },
  "photography.quote.27": {
    en: "A photograph is a moment—when you press the button, it will never come back.",
    hi: "एक तस्वीर एक पल है — जब आप बटन दबाते हैं, वह कभी वापस नहीं आता।",
    hinglish: "A photograph is a moment—when you press the button, it will never come back.",
  },
  "photography.quote.28": {
    en: "A photograph is a way of feeling, of touching, of loving.",
    hi: "एक तस्वीर महसूस करने, छूने और प्यार करने का तरीका है।",
    hinglish: "A photograph is a way of feeling, of touching, of loving.",
  },
  "photography.quote.29": {
    en: "A photograph is a memory in the raw.",
    hi: "एक तस्वीर कच्ची स्मृति है।",
    hinglish: "A photograph is a memory in the raw.",
  },
  "photography.quote.30": {
    en: "A photograph is the pause button of life.",
    hi: "एक तस्वीर जीवन का पॉज़ बटन है।",
    hinglish: "A photograph is the pause button of life.",
  },
  "photography.quote.31": {
    en: "A photograph is the story I fail to put into words.",
    hi: "फोटोग्राफी वह कहानी है जिसे मैं शब्दों में नहीं बया कर पाता।",
    hinglish: "A photograph is the story I fail to put into words.",
  },
  "photography.quote.32": {
    en: "A photograph is the beauty of life captured.",
    hi: "फोटोग्राफी जीवन की सुंदरता को कैद कर लेती है।",
    hinglish: "A photograph is the beauty of life captured.",
  },
  "photography.quote.33": {
    en: "A photograph is a secret about a secret. The more it tells you the less you know.",
    hi: "एक तस्वीर रहस्य के बारे में रहस्य है। जितना अधिक यह बताती है उतना ही कम आप जानते हैं।",
    hinglish: "A photograph is a secret about a secret. The more it tells you the less you know.",
  },
  "photography.quote.34": {
    en: "A photograph is a return ticket to a moment otherwise gone.",
    hi: "एक तस्वीर एक वापसी टिकट है उस पल के लिए जो अन्यथा चला गया होता।",
    hinglish: "A photograph is a return ticket to a moment otherwise gone.",
  },
  "photography.quote.35": {
    en: "A photograph is the only language that can be understood anywhere in the world.",
    hi: "फोटोग्राफी एकमात्र भाषा है जिसे दुनिया भर में समझा जा सकता है।",
    hinglish: "A photograph is the only language that can be understood anywhere in the world.",
  },
  "photography.quote.36": {
    en: "A photograph is a moment—when you press the button, it will never come back.",
    hi: "एक तस्वीर एक पल है — जब आप बटन दबाते हैं, वह कभी वापस नहीं आता।",
    hinglish: "A photograph is a moment—when you press the button, it will never come back.",
  },
  "photography.quote.37": {
    en: "A photograph is a way of feeling, of touching, of loving.",
    hi: "एक तस्वीर महसूस करने, छूने और प्यार करने का तरीका है।",
    hinglish: "A photograph is a way of feeling, of touching, of loving.",
  },

  // Skills
  "skills.badge": { en: "Skills", hi: "कौशल", hinglish: "Skills" },
  "skills.technologies": { en: "Technologies", hi: "प्रौद्योगिकियाँ", hinglish: "Technologies" },
  // Marker headings, subheadings, descriptions
  "skills.marker.1.heading": { en: "Frontend Development", hi: "फ्रंटेंड विकास", hinglish: "Frontend Development" },
  "skills.marker.1.subheading": {
    en: "Building Interactive UIs",
    hi: "इंटरैक्टिव UI बनाना",
    hinglish: "Building Interactive UIs",
  },
  "skills.marker.1.description": {
    en: "Expertise in creating responsive and dynamic user interfaces with modern frameworks and libraries.",
    hi: "आधुनिक फ्रेमवर्क और लाइब्रेरीज़ के साथ उत्तरदायी और गतिशील उपयोगकर्ता इंटरफेस बनाने में विशेषज्ञता।",
    hinglish: "Expertise in creating responsive and dynamic user interfaces with modern frameworks and libraries.",
  },

  "skills.marker.2.heading": { en: "Backend Systems", hi: "बैकएंड सिस्टम", hinglish: "Backend Systems" },
  "skills.marker.2.subheading": {
    en: "Scalable Server Architecture",
    hi: "स्केलेबल सर्वर आर्किटेक्चर",
    hinglish: "Scalable Server Architecture",
  },
  "skills.marker.2.description": {
    en: "Designing and implementing robust backend systems with focus on scalability, security, and performance.",
    hi: "स्केलेबिलिटी, सुरक्षा और प्रदर्शन पर ध्यान देने के साथ मजबूत बैकएंड सिस्टम डिजाइन और लागू करना।",
    hinglish: "Designing and implementing robust backend systems with focus on scalability, security, and performance.",
  },

  "skills.marker.3.heading": { en: "Mobile Development", hi: "मोबाइल विकास", hinglish: "Mobile Development" },
  "skills.marker.3.subheading": { en: "Cross-Platform Apps", hi: "क्रॉस-प्लैटफ़ॉर्म ऐप्स", hinglish: "Cross-Platform Apps" },
  "skills.marker.3.description": {
    en: "Creating seamless mobile experiences for iOS and Android. Specializing in Flutter and progressive web apps for optimal performance.",
    hi: "iOS और Android के लिए सुगम मोबाइल अनुभव बनाना। उच्च प्रदर्शन के लिए Flutter और प्रोग्रेसिव वेब ऐप्स में विशेषज्ञता।",
    hinglish: "Creating seamless mobile experiences for iOS and Android.",
  },

  "skills.marker.4.heading": { en: "DevOps & CI/CD", hi: "DevOps और CI/CD", hinglish: "DevOps & CI/CD" },
  "skills.marker.4.subheading": {
    en: "Automation & Deployment",
    hi: "स्वचालन और डिप्लॉयमेंट",
    hinglish: "Automation & Deployment",
  },
  "skills.marker.4.description": {
    en: "Streamlining development workflows with automated testing, continuous integration, and deployment pipelines.",
    hi: "स्वचालित परीक्षण, सतत एकीकरण और तैनाती पाइपलाइनों के साथ विकास वर्कफ़्लो को सुव्यवस्थित करना।",
    hinglish:
      "Streamlining development workflows with automated testing, continuous integration, and deployment pipelines.",
  },

  "skills.marker.5.heading": { en: "UI/UX Design", hi: "UI/UX डिज़ाइन", hinglish: "UI/UX Design" },
  "skills.marker.5.subheading": {
    en: "User-Centered Design",
    hi: "उपयोगकर्ता-केंद्रित डिज़ाइन",
    hinglish: "User-Centered Design",
  },
  "skills.marker.5.description": {
    en: "Crafting beautiful and intuitive interfaces with focus on accessibility and user research.",
    hi: "पहुंच और उपयोगकर्ता अनुसंधान पर ध्यान केंद्रित करते हुए सुंदर और सहज इंटरफ़ेस बनाना।",
    hinglish: "Crafting beautiful and intuitive interfaces with focus on accessibility and user research.",
  },

  // Individual skill names (used in the marker lists)
  "skill.react": { en: "React", hi: "React", hinglish: "React" },
  "skill.typescript": { en: "TypeScript", hi: "TypeScript", hinglish: "TypeScript" },
  "skill.css_tailwind": { en: "CSS / Tailwind", hi: "CSS / Tailwind", hinglish: "CSS / Tailwind" },
  "skill.nextjs": { en: "Next.js", hi: "Next.js", hinglish: "Next.js" },
  "skill.nodejs": { en: "Node.js", hi: "Node.js", hinglish: "Node.js" },
  "skill.apis": { en: "APIs", hi: "APIs", hinglish: "APIs" },
  "skill.supabase": { en: "Supabase", hi: "Supabase", hinglish: "Supabase" },
  "skill.firebase": { en: "Firebase", hi: "Firebase", hinglish: "Firebase" },
  "skill.flutter": { en: "Flutter", hi: "Flutter", hinglish: "Flutter" },
  "skill.pwa": { en: "PWA", hi: "PWA", hinglish: "PWA" },
  "skill.performance": { en: "Performance", hi: "प्रदर्शन", hinglish: "Performance" },
  "skill.uiux": { en: "UI/UX", hi: "UI/UX", hinglish: "UI/UX" },
  "skill.git": { en: "Git", hi: "Git", hinglish: "Git" },
  "skill.cicd": { en: "CI/CD", hi: "CI/CD", hinglish: "CI/CD" },
  "skill.docker": { en: "Docker", hi: "Docker", hinglish: "Docker" },
  "skill.cloud": { en: "Cloud", hi: "क्लाउड", hinglish: "Cloud" },
  "skill.design": { en: "Design", hi: "डिज़ाइन", hinglish: "Design" },
  "skill.prototyping": { en: "Prototyping", hi: "प्रोटोटाइपिंग", hinglish: "Prototyping" },
  "skill.accessibility": { en: "Accessibility", hi: "एक्सेसिबिलिटी", hinglish: "Accessibility" },
  "skill.research": { en: "Research", hi: "अनुसंधान", hinglish: "Research" },

  // Install prompt
  "install.title": { en: "Install this app", hi: "इस ऐप को इंस्टॉल करें", hinglish: "Install this app" },
  "install.subtitle": {
    en: "Install this site as an app for a faster, more integrated experience.",
    hi: "एक तेज़ और अधिक सुगम अनुभव के लिए इस साइट को ऐप के रूप में इंस्टॉल करें।",
    hinglish: "Install this site as an app for a faster, more integrated experience.",
  },
  "install.install": { en: "Install", hi: "इंस्टॉल", hinglish: "Install" },
  "install.dismiss": { en: "Dismiss", hi: "छोड़ें", hinglish: "Dismiss" },
  "install.toast.installed": {
    en: "App installed — thanks!",
    hi: "ऐप इंस्टॉल किया गया — धन्यवाद!",
    hinglish: "App installed — thanks!",
  },
  "install.toast.dismissed": {
    en: "Installation dismissed",
    hi: "इंस्टॉलेशन रद्द किया गया",
    hinglish: "Installation dismissed",
  },
  "install.toast.failed": { en: "Install failed", hi: "इंस्टॉल विफल", hinglish: "Install failed" },

  // Hero Left
  "hero.view_work": { en: "View My Work", hi: "मेरा काम देखें", hinglish: "View My Work" },
  "hero.left.1": { en: "IMAGINE.", hi: "कल्पना।", hinglish: "IMAGINE." },
  "hero.left.2": { en: "SKETCH.", hi: "स्केच।", hinglish: "SKETCH." },
  "hero.left.3": { en: "DEBUG.", hi: "डीबग।", hinglish: "DEBUG." },
  "hero.left.4": { en: "WOW.", hi: "वाह।", hinglish: "WOW." },

  // Skills section quotes
  "skills.quote.left": {
    en: "In the vast universe of code, every developer carries their own arsenal...",
    hi: "कोड के विशाल ब्रह्मांड में, हर डेवलपर के पास अपना हथियार भण्डार होता है...",
    hinglish: "In the vast universe of code, हर developer carries their own arsenal...",
  },
  "skills.quote.right": {
    en: "Tools sharpened through countless hours of debugging, skills honed in the fires of production deployments, and wisdom gained from a thousand Stack Overflow searches.",
    hi: "असंख्य डीबगिंग घंटों से तेज़ किये गए उपकरण, प्रोडक्शन में डिप्लॉयमेंट के अनुभव से निखरे कौशल, और हजारों Stack Overflow खोजों से मिली समझ।",
    hinglish:
      "Tools sharpened through countless hours of debugging, skills honed in production, and wisdom from Stack Overflow searches.",
  },
  "skills.quote.center": {
    en: "These are not just technologies... they are the building blocks of digital dreams, the instruments of creation, the weapons against impossible deadlines.",
    hi: "ये केवल तकनीकें नहीं हैं... ये डिजिटल सपनों के निर्माण खण्ड हैं, सृजन के साधन हैं, असंभव डेडलाइनों के खिलाफ हथियार हैं।",
    hinglish: "These are not just technologies... ये building blocks हैं of digital dreams.",
  },
  // Decorative title pieces
  "skills.title.left": { en: "THE", hi: "THE", hinglish: "THE" },
  "skills.title.right": { en: "ARSENAL", hi: "औज़ार", hinglish: "ARSENAL" },
  "qual.title.left": { en: "MY", hi: "मेरी", hinglish: "MY" },
  "qual.title.right": { en: "JOURNEY", hi: "यात्रा", hinglish: "JOURNEY" },
  "photography.title.left": { en: "QUIET", hi: "शांत", hinglish: "QUIET" },
  "photography.title.right": { en: "FRAMES", hi: "फ्रेम", hinglish: "FRAMES" },

  // Qualifications
  "qual.badge": {
    en: "Qualification & Certifications",
    hi: "योग्यता और प्रमाणपत्र",
    hinglish: "Qualification & Certifications",
  },
  "qual.intro": {
    en: "Every entry below is a short chapter—click to unfold the challenge, the solution, and the result.",
    hi: "नीचे प्रत्येक प्रविष्टि एक छोटा अध्याय है — चुनौती, समाधान और परिणाम को खोलने के लिए क्लिक करें।",
    hinglish: "Every entry below is a short chapter—click to unfold the challenge, the solution, and the result.",
  },
  "qual.semesters": { en: "Semesters", hi: "सेमेस्टर", hinglish: "Semesters" },
  "qual.challenge": { en: "Challenge", hi: "चुनौती", hinglish: "Challenge" },
  "qual.solution": { en: "Solution", hi: "समाधान", hinglish: "Solution" },
  "qual.result": { en: "Result", hi: "परिणाम", hinglish: "Result" },
}

export function t(key: string, lang?: LangCode) {
  try {
    const l =
      (lang as LangCode) ||
      (typeof window !== "undefined" ? (localStorage.getItem("preferredLang") as LangCode) || "en" : "en")
    // Merge extra translations on-demand (non-destructive)
    Object.assign(translations, extraTranslations)
    return (translations[key] && translations[key][l]) || (translations[key] && translations[key]["en"]) || key
  } catch (e) {
    return key
  }
}

export function translateDocument(lang?: LangCode) {
  const l =
    (lang as LangCode) ||
    (typeof window !== "undefined" ? (localStorage.getItem("preferredLang") as LangCode) || "en" : "en")

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

      const attr = n.getAttribute("data-i18n-attr")
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

// Expose a global helper and auto-apply on load so language preference is active immediately
if (typeof window !== "undefined") {
  try {
    ;(window as any).__i18n = {
      t,
      translateDocument,
      translations,
      extraTranslations,
    }

    // notify any listeners that i18n is attached (helps HMR timing)
    try {
      window.dispatchEvent(new CustomEvent("i18n:ready"))
    } catch (e) {}

    // Auto-apply the preferred language on initial load (non-blocking)
    try {
      const applyPref = () => {
        try {
          const pref = (localStorage.getItem("preferredLang") as LangCode) || "en"
          // microtask to ensure DOM is ready
          setTimeout(() => {
            try {
              translateDocument(pref)
            } catch (e) {}
            try {
              window.dispatchEvent(new CustomEvent("preferredLangChange", { detail: pref }))
            } catch (e) {}
          }, 0)
        } catch (e) {}
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyPref, { once: true })
      } else {
        applyPref()
      }
    } catch (e) {}
  } catch (e) {}
}
