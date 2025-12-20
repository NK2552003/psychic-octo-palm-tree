const iconClass =
  "w-4 h-4 sm:w-5 sm:h-5 text-stone-700 dark:text-teal-300"

const MailIcon = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="1.8" d="M3 7l9 6 9-6M4 7h16v10H4z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5A2.48 2.48 0 102.5 6a2.48 2.48 0 002.48-2.5zM3 8h4v13H3zM9 8h3.8v1.8h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v7.2h-4V14c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8v7.2H9z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .5A12 12 0 000 12.7c0 5.4 3.4 10 8.2 11.6.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 3 1.4 3.7 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.4-5.5-6a4.7 4.7 0 011.2-3.2 4.4 4.4 0 01.1-3.1s1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.4 1 .2 2.2.1 3.1a4.7 4.7 0 011.2 3.2c0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0024 12.7 12 12 0 0012 .5z" />
  </svg>
)

const CodePenIcon = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeWidth="1.8" d="M12 2l9 6v8l-9 6-9-6V8z" />
    <path strokeWidth="1.8" d="M12 2v20M3 8l9 6 9-6M3 16l9-6 9 6" />
  </svg>
)
export { MailIcon, LinkedInIcon, GitHubIcon, CodePenIcon }