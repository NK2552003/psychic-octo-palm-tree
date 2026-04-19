"use client";

import React, { useEffect, useState } from "react";

export default function UnsupportedBrowserPage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Detect theme
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const browsers = [
    {
      name: "Chrome",
      url: "https://www.google.com/chrome/",
      icon: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 10.545a1.455 1.455 0 1 0 0 2.91 1.455 1.455 0 0 0 0-2.91z" fill="#4285F4"/>
          <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545z" fill="#EA4335"/>
          <path d="M12 6.545h10.691A12 12 0 0 0 12 0v6.545z" fill="#FBBC05"/>
          <circle cx="12" cy="12" r="4.364" fill="#34A853"/>
          <path d="M1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29z" fill="#34A853"/>
          <path d="M15.273 12a3.273 3.273 0 1 1-6.546 0 3.273 3.273 0 0 1 6.546 0z" fill="#4285F4"/>
        </svg>
      ),
    },
    {
      name: "Firefox",
      url: "https://www.mozilla.org/firefox/new/",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M28.9905 10.7265C28.3816 9.2574 27.1473 7.67139 26.1784 7.17039C26.967 8.72015 27.4232 10.2746 27.5976 11.4344C27.5976 11.4344 27.5976 11.4426 27.6005 11.4578C26.0156 7.49777 23.3277 5.90065 21.1327 2.42407C21.0213 2.24869 20.9105 2.07331 20.802 1.88566C20.7407 1.77985 20.6911 1.68397 20.648 1.59336C20.557 1.41757 20.4867 1.23179 20.4386 1.03975C20.439 1.03063 20.4359 1.02169 20.4301 1.01467C20.4243 1.00765 20.4161 1.00305 20.4071 1.00175C20.3985 0.999416 20.3894 0.999416 20.3808 1.00175C20.3785 1.00281 20.3763 1.00419 20.3744 1.00584C20.3709 1.00584 20.3674 1.00994 20.3639 1.0111L20.3697 1.0035C16.8483 3.07063 15.6536 6.89446 15.544 8.80784C14.1368 8.90428 12.7913 9.42358 11.683 10.298C11.5672 10.1998 11.4461 10.1081 11.3202 10.0232C11.0008 8.9027 10.9873 7.71683 11.2811 6.58931C9.84091 7.24697 8.72095 8.28463 7.90664 9.20303H7.90023C7.34433 8.49742 7.38341 6.17015 7.41491 5.68435C7.40849 5.65395 7.00076 5.89656 6.94826 5.93339C6.45773 6.2841 5.9992 6.67771 5.57805 7.1096C5.0988 7.59655 4.66096 8.12276 4.26909 8.68274C3.36752 9.96323 2.72814 11.4101 2.3879 12.9398C2.38149 12.9702 2.37565 13.0017 2.36924 13.0327C2.34299 13.1561 2.24791 13.7751 2.23099 13.9096V13.9406C2.10704 14.5803 2.02984 15.2282 2 15.8791V15.951C2 23.7097 8.27646 30 16.0182 30C22.9521 30 28.7088 24.9549 29.8364 18.328C29.8597 18.1485 29.8789 17.9673 29.8999 17.786C30.1788 15.3763 29.869 12.8439 28.9905 10.7265ZM12.8327 21.7239C12.8981 21.7549 12.9599 21.7894 13.027 21.8197L13.0363 21.8256C12.9692 21.7929 12.901 21.759 12.8333 21.7239H12.8327ZM27.6017 11.4642V11.4508V11.466V11.4642Z" fill="url(#paint0_linear_87_7118)"></path> <path d="M28.9907 10.7265C28.3818 9.25741 27.1475 7.67141 26.1786 7.17041C26.9672 8.72017 27.4234 10.2746 27.5978 11.4344V11.4631C28.9208 15.0572 28.1998 18.7121 27.1615 20.9452C25.555 24.4002 21.6661 27.9416 15.578 27.7692C9.00581 27.5821 3.21175 22.6885 2.1297 16.2842C1.93254 15.2735 2.1297 14.7608 2.22886 13.9406C2.10812 14.5725 2.06203 14.7555 2.00195 15.8791V15.951C2.00195 23.7098 8.27842 30 16.0202 30C22.954 30 28.7108 24.9549 29.8383 18.328C29.8616 18.1485 29.8809 17.9673 29.9019 17.7861C30.179 15.3764 29.8692 12.8439 28.9907 10.7265Z" fill="url(#paint1_radial_87_7118)"></path> <path d="M28.9907 10.7265C28.3818 9.25741 27.1475 7.67141 26.1786 7.17041C26.9672 8.72017 27.4234 10.2746 27.5978 11.4344V11.4631C28.9208 15.0572 28.1998 18.7121 27.1615 20.9452C25.555 24.4002 21.6661 27.9416 15.578 27.7692C9.00581 27.5821 3.21175 22.6885 2.1297 16.2842C1.93254 15.2735 2.1297 14.7608 2.22886 13.9406C2.10812 14.5725 2.06203 14.7555 2.00195 15.8791V15.951C2.00195 23.7098 8.27842 30 16.0202 30C22.954 30 28.7108 24.9549 29.8383 18.328C29.8616 18.1485 29.8809 17.9673 29.9019 17.7861C30.179 15.3764 29.8692 12.8439 28.9907 10.7265Z" fill="url(#paint2_radial_87_7118)"></path> <path d="M22.1776 12.3773C22.2085 12.3989 22.2359 12.4205 22.2651 12.4422C21.9133 11.8161 21.4749 11.243 20.9631 10.7398C16.6058 6.37292 19.821 1.27058 20.3629 1.01102L20.3687 1.00342C16.8473 3.07054 15.6526 6.89438 15.543 8.80776C15.7063 8.79665 15.869 8.78262 16.0353 8.78262C18.6631 8.78262 20.952 10.2312 22.1776 12.3773Z" fill="url(#paint3_radial_87_7118)"></path> <path d="M16.0446 13.2499C16.0219 13.6006 14.7899 14.8049 14.3589 14.8049C10.3725 14.8049 9.72559 17.2216 9.72559 17.2216C9.90058 19.2572 11.3157 20.9332 13.0277 21.82C13.1059 21.8604 13.1846 21.8966 13.2611 21.9329C13.3981 21.9913 13.5358 22.0498 13.6729 22.1018C14.26 22.3094 14.8748 22.4276 15.4969 22.4526C22.4838 22.7811 23.8383 14.08 18.7955 11.5534C20.0864 11.3283 21.4269 11.8492 22.1753 12.3759C20.9503 10.2299 18.6608 8.78125 16.033 8.78125C15.8667 8.78125 15.704 8.79528 15.5406 8.80639C14.1345 8.90403 12.7903 9.4239 11.6832 10.2983C11.8973 10.4801 12.1388 10.7221 12.6468 11.2237C13.6 12.1661 16.0394 13.1359 16.0446 13.2499Z" fill="url(#paint4_radial_87_7118)"></path> <path d="M16.0446 13.2499C16.0219 13.6006 14.7899 14.8049 14.3589 14.8049C10.3725 14.8049 9.72559 17.2216 9.72559 17.2216C9.90058 19.2572 11.3157 20.9332 13.0277 21.82C13.1059 21.8604 13.1846 21.8966 13.2611 21.9329C13.3981 21.9913 13.5358 22.0498 13.6729 22.1018C14.26 22.3094 14.8748 22.4276 15.4969 22.4526C22.4838 22.7811 23.8383 14.08 18.7955 11.5534C20.0864 11.3283 21.4269 11.8492 22.1753 12.3759C20.9503 10.2299 18.6608 8.78125 16.033 8.78125C15.8667 8.78125 15.704 8.79528 15.5406 8.80639C14.1345 8.90403 12.7903 9.4239 11.6832 10.2983C11.8973 10.4801 12.1388 10.7221 12.6468 11.2237C13.6 12.1661 16.0394 13.1359 16.0446 13.2499Z" fill="url(#paint5_radial_87_7118)"></path> <path d="M11.0311 9.83093C11.1448 9.90459 11.2382 9.96656 11.3227 10.0233C11.0034 8.90275 10.9899 7.71688 11.2837 6.58936C9.84345 7.24702 8.72349 8.28468 7.90918 9.20308C7.97509 9.20132 10.0085 9.16449 11.0311 9.83093Z" fill="url(#paint6_radial_87_7118)"></path> <path d="M2.1297 16.284C3.21175 22.6883 9.00581 27.5819 15.5827 27.769C21.6707 27.9414 25.5574 24.4 27.1661 20.945C28.2044 18.7113 28.9254 15.057 27.6025 11.4629V11.436C27.6025 11.4395 27.6025 11.4442 27.6054 11.4594C28.1024 14.7138 26.451 17.8665 23.8692 19.9986C23.8666 20.0045 23.8641 20.0106 23.8617 20.0167C18.8306 24.1223 14.0165 22.4936 13.0418 21.8289C12.9741 21.7962 12.9059 21.7623 12.8382 21.7272C9.9047 20.3242 8.69316 17.6438 8.95273 15.3469C6.47656 15.3469 5.63192 13.2529 5.63192 13.2529C5.63192 13.2529 7.85552 11.664 10.7861 13.046C13.5003 14.3262 16.0493 13.2535 16.0493 13.2529C16.0441 13.1389 13.6047 12.1662 12.6533 11.2267C12.1452 10.7251 11.9037 10.4831 11.6896 10.3013C11.5738 10.2031 11.4527 10.1114 11.3268 10.0265C11.2434 9.96809 11.1518 9.90963 11.0352 9.83421C10.0126 9.16778 7.97918 9.20461 7.9121 9.20636H7.90568C7.34978 8.50076 7.38886 6.17348 7.42036 5.68769C7.41395 5.65729 7.00621 5.89989 6.95371 5.93672C6.46318 6.28743 6.00465 6.68104 5.58351 7.11293C5.10426 7.59988 4.66642 8.12609 4.27455 8.68607C3.37298 9.96657 2.7336 11.4134 2.39336 12.9431C2.38228 12.97 1.88354 15.1523 2.1297 16.284Z" fill="url(#paint7_radial_87_7118)"></path> <path d="M20.9634 10.7399C21.4752 11.2431 21.9135 11.8162 22.2653 12.4423C22.3383 12.4971 22.4083 12.5557 22.4753 12.6176C25.6532 15.55 23.9908 19.7012 23.8642 19.9993C26.446 17.8673 28.0973 14.7146 27.6003 11.4601C26.0155 7.49777 23.3276 5.90065 21.1325 2.42407C21.0211 2.24869 20.9103 2.07331 20.8018 1.88566C20.7406 1.77985 20.691 1.68397 20.6478 1.59336C20.5569 1.41757 20.4866 1.23179 20.4384 1.03975C20.4388 1.03063 20.4358 1.02169 20.43 1.01467C20.4241 1.00765 20.4159 1.00305 20.4069 1.00175C20.3983 0.999416 20.3893 0.999416 20.3807 1.00175C20.3783 1.00281 20.3762 1.00419 20.3742 1.00584C20.3707 1.00584 20.3672 1.00994 20.3637 1.0111C19.8213 1.27066 16.606 6.37301 20.9634 10.7399Z" fill="url(#paint8_radial_87_7118)"></path> <path d="M22.4743 12.6146C22.4073 12.5526 22.3372 12.4941 22.2643 12.4392C22.2357 12.4176 22.206 12.396 22.1768 12.3743C21.4284 11.8482 20.088 11.3267 18.7971 11.5518C23.8393 14.0784 22.4854 22.7795 15.4985 22.451C14.8764 22.426 14.2616 22.3078 13.6744 22.1002C13.5374 22.0488 13.3997 21.9921 13.2626 21.9313C13.1833 21.895 13.1045 21.8588 13.0293 21.8185L13.0386 21.8243C14.0133 22.4908 18.8274 24.1194 23.8585 20.0121C23.8585 20.0121 23.8614 20.0045 23.8661 19.9939C23.9909 19.7011 25.6534 15.5499 22.4743 12.6146Z" fill="url(#paint9_radial_87_7118)"></path> <path d="M9.72532 17.2215C9.72532 17.2215 10.3722 14.8048 14.3586 14.8048C14.7897 14.8048 16.0216 13.5994 16.0444 13.2498C16.0671 12.9002 13.4953 14.3231 10.7811 13.0428C7.85055 11.6608 5.62695 13.2498 5.62695 13.2498C5.62695 13.2498 6.47159 15.3438 8.94776 15.3438C8.68819 17.6407 9.89973 20.3187 12.8332 21.7241C12.8986 21.755 12.9604 21.7895 13.0275 21.8199C11.3154 20.9349 9.90207 19.2571 9.72532 17.2215Z" fill="url(#paint10_radial_87_7118)"></path> <path d="M28.9905 10.7265C28.3816 9.2574 27.1473 7.67139 26.1784 7.17039C26.967 8.72015 27.4232 10.2746 27.5976 11.4344C27.5976 11.4344 27.5976 11.4426 27.6005 11.4578C26.0156 7.49777 23.3277 5.90065 21.1327 2.42407C21.0213 2.24869 20.9105 2.07331 20.802 1.88566C20.7407 1.77985 20.6911 1.68397 20.648 1.59336C20.557 1.41757 20.4867 1.23179 20.4386 1.03975C20.439 1.03063 20.4359 1.02169 20.4301 1.01467C20.4243 1.00765 20.4161 1.00305 20.4071 1.00175C20.3985 0.999416 20.3894 0.999416 20.3808 1.00175C20.3785 1.00281 20.3763 1.00419 20.3744 1.00584C20.3709 1.00584 20.3674 1.00994 20.3639 1.0111L20.3697 1.0035C16.8483 3.07063 15.6536 6.89446 15.544 8.80784C15.7073 8.79673 15.8701 8.78271 16.0363 8.78271C18.6641 8.78271 20.9531 10.2313 22.1786 12.3774C21.4302 11.8512 20.0898 11.3298 18.7989 11.5549C23.841 14.0815 22.4872 22.7826 15.5002 22.454C14.8782 22.429 14.2633 22.3108 13.6762 22.1033C13.5391 22.0518 13.4015 21.9951 13.2644 21.9343C13.1851 21.8981 13.1063 21.8618 13.0311 21.8215L13.0404 21.8273C12.9727 21.7946 12.9045 21.7607 12.8368 21.7256C12.9021 21.7566 12.964 21.7911 13.0311 21.8215C11.3155 20.9347 9.90216 19.2569 9.72542 17.2213C9.72542 17.2213 10.3723 14.8046 14.3587 14.8046C14.7898 14.8046 16.0217 13.5992 16.0445 13.2496C16.0392 13.1356 13.5998 12.1628 12.6484 11.2234C12.1403 10.7218 11.8988 10.4798 11.6848 10.298C11.5689 10.1998 11.4478 10.1081 11.3219 10.0232C11.0026 8.9027 10.9891 7.71683 11.2829 6.58931C9.84266 7.24697 8.7227 8.28463 7.90839 9.20303H7.90198C7.34608 8.49742 7.38516 6.17015 7.41666 5.68435C7.41024 5.65395 7.00251 5.89656 6.95001 5.93339C6.45948 6.2841 6.00095 6.67771 5.5798 7.1096C5.10055 7.59655 4.66271 8.12276 4.27084 8.68274C3.36927 9.96323 2.72989 11.4101 2.38965 12.9398C2.38324 12.9702 2.3774 13.0017 2.37099 13.0327C2.34474 13.1561 2.22574 13.7839 2.20941 13.9184C2.20941 13.9289 2.20941 13.9084 2.20941 13.9184C2.10019 14.5671 2.03026 15.2219 2 15.8791V15.951C2 23.7097 8.27646 30 16.0182 30C22.9521 30 28.7088 24.9549 29.8364 18.328C29.8597 18.1485 29.8789 17.9673 29.8999 17.786C30.1788 15.3763 29.869 12.8439 28.9905 10.7265ZM27.5999 11.4479V11.4631V11.4479Z" fill="url(#paint11_linear_87_7118)"></path> <defs> <linearGradient id="paint0_linear_87_7118" x1="27.135" y1="5.49261" x2="3.81392" y2="27.9437" gradientUnits="userSpaceOnUse"> <stop offset="0.05" stopColor="#FFF44F"></stop> <stop offset="0.11" stopColor="#FFE847"></stop> <stop offset="0.22" stopColor="#FFC830"></stop> <stop offset="0.37" stopColor="#FF980E"></stop> <stop offset="0.4" stopColor="#FF8B16"></stop> <stop offset="0.46" stopColor="#FF672A"></stop> <stop offset="0.53" stopColor="#FF3647"></stop> <stop offset="0.7" stopColor="#E31587"></stop> </linearGradient> <radialGradient id="paint1_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26.0596 4.21879) scale(29.2246 29.2888)"> <stop offset="0.13" stopColor="#FFBD4F"></stop> <stop offset="0.19" stopColor="#FFAC31"></stop> <stop offset="0.25" stopColor="#FF9D17"></stop> <stop offset="0.28" stopColor="#FF980E"></stop> <stop offset="0.4" stopColor="#FF563B"></stop> <stop offset="0.47" stopColor="#FF3750"></stop> <stop offset="0.71" stopColor="#F5156C"></stop> <stop offset="0.78" stopColor="#EB0878"></stop> <stop offset="0.86" stopColor="#E50080"></stop> </radialGradient> <radialGradient id="paint2_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.3809 16.1925) scale(29.2246 29.2888)"> <stop offset="0.3" stopColor="#960E18"></stop> <stop offset="0.35" stopColor="#B11927" stopOpacity="0.74"></stop> <stop offset="0.43" stopColor="#DB293D" stopOpacity="0.34"></stop> <stop offset="0.5" stopColor="#F5334B" stopOpacity="0.09"></stop> <stop offset="0.53" stopColor="#FF3750" stopOpacity="0"></stop> </radialGradient> <radialGradient id="paint3_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.904 -2.42815) scale(21.172 21.2184)"> <stop offset="0.13" stopColor="#FFF44F"></stop> <stop offset="0.25" stopColor="#FFDC3E"></stop> <stop offset="0.51" stopColor="#FF9D12"></stop> <stop offset="0.53" stopColor="#FF980E"></stop> </radialGradient> <radialGradient id="paint4_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.1487 23.8433) scale(13.915 13.9455)"> <stop offset="0.35" stopColor="#3A8EE6"></stop> <stop offset="0.47" stopColor="#5C79F0"></stop> <stop offset="0.67" stopColor="#9059FF"></stop> <stop offset="1" stopColor="#C139E6"></stop> </radialGradient> <radialGradient id="paint5_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.8005 12.7119) rotate(-13.9265) scale(7.37316 8.67852)"> <stop offset="0.21" stopColor="#9059FF" stopOpacity="0"></stop> <stop offset="0.28" stopColor="#8C4FF3" stopOpacity="0.06"></stop> <stop offset="0.75" stopColor="#7716A8" stopOpacity="0.45"></stop> <stop offset="0.97" stopColor="#6E008B" stopOpacity="0.6"></stop> </radialGradient> <radialGradient id="paint6_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.011 3.02041) scale(10.0108 10.0328)"> <stop stopColor="#FFE226"></stop> <stop offset="0.12" stopColor="#FFDB27"></stop> <stop offset="0.3" stopColor="#FFC82A"></stop> <stop offset="0.5" stopColor="#FFA930"></stop> <stop offset="0.73" stopColor="#FF7E37"></stop> <stop offset="0.79" stopColor="#FF7139"></stop> </radialGradient> <radialGradient id="paint7_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.8805 -3.34313) scale(42.7109 42.8046)"> <stop offset="0.11" stopColor="#FFF44F"></stop> <stop offset="0.46" stopColor="#FF980E"></stop> <stop offset="0.62" stopColor="#FF5634"></stop> <stop offset="0.72" stopColor="#FF3647"></stop> <stop offset="0.9" stopColor="#E31587"></stop> </radialGradient> <radialGradient id="paint8_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.7517 1.33374) rotate(84.2447) scale(31.1996 20.4543)"> <stop stopColor="#FFF44F"></stop> <stop offset="0.06" stopColor="#FFE847"></stop> <stop offset="0.17" stopColor="#FFC830"></stop> <stop offset="0.3" stopColor="#FF980E"></stop> <stop offset="0.36" stopColor="#FF8B16"></stop> <stop offset="0.45" stopColor="#FF672A"></stop> <stop offset="0.57" stopColor="#FF3647"></stop> <stop offset="0.74" stopColor="#E31587"></stop> </radialGradient> <radialGradient id="paint9_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.7757 6.73593) scale(26.6644 26.723)"> <stop offset="0.14" stopColor="#FFF44F"></stop> <stop offset="0.48" stopColor="#FF980E"></stop> <stop offset="0.59" stopColor="#FF5634"></stop> <stop offset="0.66" stopColor="#FF3647"></stop> <stop offset="0.9" stopColor="#E31587"></stop> </radialGradient> <radialGradient id="paint10_radial_87_7118" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21.8145 8.30059) scale(29.1844 29.2484)"> <stop offset="0.09" stopColor="#FFF44F"></stop> <stop offset="0.23" stopColor="#FFE141"></stop> <stop offset="0.51" stopColor="#FFAF1E"></stop> <stop offset="0.63" stopColor="#FF980E"></stop> </radialGradient> <linearGradient id="paint11_linear_87_7118" x1="26.855" y1="5.37218" x2="7.01043" y2="25.1739" gradientUnits="userSpaceOnUse"> <stop offset="0.17" stopColor="#FFF44F" stopOpacity="0.8"></stop> <stop offset="0.27" stopColor="#FFF44F" stopOpacity="0.63"></stop> <stop offset="0.49" stopColor="#FFF44F" stopOpacity="0.22"></stop> <stop offset="0.6" stopColor="#FFF44F" stopOpacity="0"></stop> </linearGradient> </defs> </g></svg>
      ),
    },
    {
      name: "Brave",
      url: "https://brave.com/download/",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 555 555" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><linearGradient id="a" x1="63" x2="283" y1="303" y2="303" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffffff"></stop><stop offset=".2" stopColor="#ffffff"></stop><stop offset="1" stopColor="#ffffff" stopOpacity=".7"></stop></linearGradient><path fill="#ff5000" d="M495.7 186.7l-16-43 11-25c1-3 1-7-2-9l-30-30a49 49 0 00-50-12l-8 3-46-49-156 1-46 50-8-3c-16-7-36-2-49 11l-30 31c-2 2-2 5-1 7l11 26-16 43 56 215a89 89 0 0035 50s56 40 112 76c5 3 10 5 15 5a27 27 0 0015-5l112-76a94 94 0 0035-50l46-176z"></path><path fill="url(#a)" d="M117.7 409.7l-59-219 17-43-12-32 29-28c9-8 28-11 36-6l45 26 58 13 45-19 4 388c-1 56 3 50-38 24l-102-69c-11-10-19-22-23-35z" opacity=".15"></path><path fill="#ffffff" d="M290.7 338.7c-4-2-8-3-9-3h-6c-1 0-5 1-9 3l-14 6-16 7-25 13c-4 2-4 6-1 9l22 16 20 16c4 3 9 8 13 11l6 5a10.5 10.5 0 0013 0l6-5c4-3 9-8 13-11l6-5 14-11 22-16c4-3 4-7-1-9l-25-13-16-7zm156-142l1-2c0-3 0-7-1-9 0-2-6-11-8-15l-14-21-10-14-19-24c-3-4-6-7-6-7l-9 2-29 6-13 2c-3 0-8 0-13-2l-23-8c-5-1-12-4-17-5h-14c-5 1-12 3-17 5l-23 8-13 2c-2 0-8-2-13-2l-29-6-9-2s-3 3-6 7l-19 23c-3 4-8 10-10 14l-14 21a90 90 0 00-7 11c-1 2-2 11-2 13l1 2 1 4c3 4 8 10 11 13l50 53c3 3 4 10 3 14l-8 19c-2 4-2 12 0 16l2 5c3 7 7 14 13 19l8 6c4 3 10 4 14 2l28-13a67 67 0 0014-9l22-20c4-3 4-9 0-13l-51-34c-4-3-5-8-3-12l20-37c2-4 3-11 1-15s-7-8-11-10l-62-23c-4-2-4-3 1-4l36-3c5 0 12 0 17 2l32 9c5 1 8 6 7 11l-12 67c-1 5-1 10-1 11 1 2 5 4 9 5l19 4c5 1 12 1 17 0l17-4c5-1 9-3 9-5s0-7-1-11l-12-68c-1-5 2-10 7-11l31-9c5-1 12-2 17-2l36 3c5 0 5 2 1 4l-62 23c-4 2-9 6-11 10s-1 10 1 15l20 37c2 4 1 10-3 12l-50 36c-4 4-3 10 0 13l22 20a110 110 0 0014 9l28 13c4 2 11 1 14-2l8-6c6-5 11-11 13-19l2-5c2-4 1-12 0-16l-8-19c-2-4-1-11 3-14l50-53c3-3 8-9 11-13 1 0 1 0 2-4z"></path><path d="M404.7 451.7l-86 59c-24 13-36 26-38 20-2-5 0-19-1-42l-1-380c0-4 3-10 7-9l44 13 63-10 43-30c5-3 11-3 15 1l37 36c3 4 4 11 2 15l-10 19 17 45-59 221c-9 26-22 33-33 42z" opacity=".07"></path></g></svg>
      ),
    },
    {
      name: "Edge",
      url: "https://www.microsoft.com/edge",
      icon: (
        <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#1e88e5" d="M40.69,35.42c-9.15,11.88-21.41,8.8-26.23,6.1 c-7.35-4.11-12.5-13.68-9.44-23.25c0.9-2.82,2.27-5.23,3.98-7.23c1.67,0.13,3.65,0.13,6-0.04c14-1,18,11,17,14 c-0.51,1.53-2.32,2.02-3.97,2.13c0.16-0.22,0.36-0.54,0.64-1.02c0.87-1.54,0.98-4.49-1.73-6.27c-2.61-1.7-5.43-0.65-6.88,1.28 c-1.45,1.92-0.88,4.81-0.37,6.09c2.2,5.52,6.26,6.95,9.02,7.78c2.76,0.83,6.86,0.71,9.05-0.19c2.18-0.91,2.8-1.43,3.22-0.97 C41.41,34.29,41.11,34.82,40.69,35.42z"></path><path fill="#0d47a1" d="M40.732,35.42c-3.48,4.52-7.41,6.87-11.21,7.91 c-0.03,0.01-0.06,0.01-0.08,0.02c-2.2,0.42-3.95,0.08-5.85-0.29c-3.09-0.6-7.35-4.01-8.38-10.18c-0.88-5.31,1.63-9.81,5.59-12.54 c-0.26,0.24-0.49,0.5-0.7,0.78c-1.45,1.92-0.88,4.81-0.37,6.09c2.2,5.52,6.26,6.95,9.02,7.78c2.76,0.83,6.86,0.71,9.05-0.19 c2.18-0.91,2.8-1.43,3.22-0.97C41.452,34.29,41.152,34.82,40.732,35.42z"></path><path fill="#00e5ff" d="M26.94,4.25c0.02,0.26,0.03,0.54,0.03,0.81c0,3.78-1.75,7.14-4.48,9.32 c-1.02-0.52-2.21-0.94-3.65-1.22c-4.07-0.78-10.63,1.1-13.3,5.77c-0.88,1.53-1.25,3.1-1.41,4.55c0.04-1.71,0.33-3.46,0.89-5.21 C8.31,8.01,17.86,3.05,26.94,4.25z"></path><path fill="#00e676" d="M41.4,27.89c-2.76,2.78-6.27,2.86-8.67,2.73 c-2.41-0.12-3.59-0.82-4.69-1.5c-1.11-0.69-0.48-1.37-0.37-1.52c0.11-0.15,0.38-0.41,1-1.49c0.29-0.51,0.5-1.18,0.54-1.91 c4.62-3.43,7.96-8.49,9.16-14.34c2.92,2.95,4.3,6.21,4.79,7.61C44.04,19.99,44.71,24.56,41.4,27.89z"></path><path fill="#1de9b6" d="M38.37,9.85v0.01c-1.2,5.85-4.54,10.91-9.16,14.34c0.03-0.42,0-0.87-0.1-1.32 c0-0.02-0.01-0.04-0.01-0.05c-0.25-1.47-0.99-3.33-2.22-4.77c-1.22-1.44-2.52-2.73-4.39-3.68c2.73-2.18,4.48-5.54,4.48-9.32 c0-0.27-0.01-0.55-0.03-0.81c0.4,0.05,0.79,0.11,1.19,0.19C32.74,5.33,36.04,7.49,38.37,9.85z"></path>
</svg>),
    },
  ];

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-20 w-24 h-24"
                style={{ backgroundColor: "var(--foreground)" }}
              />
              <div
                className="relative w-24 h-24 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "var(--foreground)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-12 h-12"
                  style={{ color: "var(--foreground)" }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4v0.01" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "var(--foreground)" }}
          >
            Browser Not Supported
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-80"
            style={{ color: "var(--foreground)" }}
          >
            Safari on macOS is not compatible with this website. Please switch to
            one of the recommended browsers below to access the full experience.
          </p>
        </div>

        {/* Browser Recommendations - Single Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-16">
          {browsers.map((browser) => (
            <a
              key={browser.name}
              href={browser.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Download ${browser.name}`}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                border: "2px solid var(--foreground)",
                backgroundColor: "transparent",
              }}
            >
              {/* Hover background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{ backgroundColor: "var(--foreground)" }}
              />

              {/* Content */}
              <div className="relative p-6 md:p-8 flex flex-col items-center justify-center text-center">
                {/* Browser Icon */}
                <div
                  className="mb-4 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {browser.icon}
                </div>

                {/* Browser Name */}
                <h2
                  className="text-lg md:text-xl font-semibold truncate"
                  style={{ color: "var(--foreground)" }}
                >
                  {browser.name}
                </h2>
              </div>
            </a>
          ))}
        </div>

        {/* Footer Information */}
        <div className="text-center space-y-3 opacity-70">
          <p className="text-sm md:text-base">
            All recommended browsers are free, secure, and feature-rich.
          </p>
          <p className="text-xs md:text-sm">
            This website uses advanced CSS animations, WebGL, and modern JavaScript
            features that Safari on macOS does not fully support.
          </p>
        </div>
      </div>
    </div>
  );
}