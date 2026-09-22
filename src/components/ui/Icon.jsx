const paths = {
  search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  arrow: <path d="M5 12h14M14 7l5 5-5 5"/>,
  chevron: <path d="m7 9 5 5 5-5"/>,
  share: <><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.3 10.9 7.4-4.6M8.3 13.1l7.4 4.6"/></>,
};

export default function Icon({ name }) {
  return <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
