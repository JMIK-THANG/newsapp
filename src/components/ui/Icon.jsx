const paths = {
  search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  arrow: <path d="M5 12h14M14 7l5 5-5 5"/>,
  chevron: <path d="m7 9 5 5 5-5"/>,
  share: <><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.3 10.9 7.4-4.6M8.3 13.1l7.4 4.6"/></>,
  facebook: <path d="M14 8h3V4.5c-.6-.1-1.8-.2-3.1-.2-3.1 0-5.2 1.9-5.2 5.4V12H5.5v4h3.2v7H13v-7h3.3l.5-4H13V10c0-1.2.3-2 1-2Z" fill="currentColor" stroke="none"/>,
  youtube: <><path d="M21.2 7.1a2.8 2.8 0 0 0-2-2C17.4 4.6 12 4.6 12 4.6s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9Z"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none"/></>,
};

export default function Icon({ name }) {
  return <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
