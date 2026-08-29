const sections = [
  { title: "Information we collect", text: "The current demonstration does not store newsletter addresses or contact-form submissions on a remote server. If subscription or contact services are connected later, the site may collect the information that visitors intentionally provide." },
  { title: "How information is used", text: "Submitted information would be used only to deliver requested newsletters, respond to messages, process corrections or tips, maintain site security, and improve the publication experience." },
  { title: "Newsletter subscriptions", text: "A connected newsletter provider may store an email address and basic delivery information. Subscribers should always receive a clear unsubscribe option in every message." },
  { title: "Analytics and cookies", text: "This demonstration does not currently install analytics or advertising cookies. If analytics are introduced, this policy should identify the provider, information collected, retention period, and available visitor choices." },
  { title: "Third-party services", text: "Article images are currently loaded from Unsplash. Future newsletter, contact-form, hosting, or analytics providers may process limited technical information under their own privacy policies." },
  { title: "Your choices", text: "Visitors may ask what personal information is held, request a correction or deletion, withdraw newsletter consent, or raise a privacy concern through the Contact page." },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14" aria-labelledby="privacy-title">
      <div className="mx-auto max-w-[960px]">
        <header className="border-b border-[#dcdde0] pb-7">
          <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">Your information</p>
          <h1 id="privacy-title" className="m-0 font-serif text-[clamp(42px,6vw,72px)] leading-none tracking-[-.045em] text-[#111318]">Privacy policy</h1>
          <p className="mt-4 mb-0 text-xs text-[#5f6368]">Last updated: August 28, 2026</p>
        </header>

        <div className="grid gap-10 py-9 lg:grid-cols-[220px_1fr]">
          <aside className="h-fit border-t-2 border-[#111318] bg-[#f4f2ed] p-5"><h2 className="m-0 text-base font-semibold">Plain-language summary</h2><p className="mb-0 text-[13px] leading-5 text-[#4f5359]">This portfolio demonstration currently does not save newsletter or contact-form data. This policy must be updated when real third-party services are connected.</p></aside>
          <article className="divide-y divide-[#dcdde0] border-y border-[#dcdde0]">
            <section className="py-6"><h2 className="mt-0 text-2xl font-semibold">Our commitment</h2><p className="mb-0 text-[15px] leading-7 text-[#4f5359]">Chinlung Today should collect only the information necessary to provide its services, explain its practices clearly, and give readers meaningful control over their personal information.</p></section>
            {sections.map((section) => <section className="py-6" key={section.title}><h2 className="mt-0 text-xl font-semibold text-[#111318]">{section.title}</h2><p className="mb-0 text-[15px] leading-7 text-[#4f5359]">{section.text}</p></section>)}
            <section className="py-6"><h2 className="mt-0 text-xl font-semibold">Contact</h2><p className="mb-0 text-[15px] leading-7 text-[#4f5359]">For privacy questions or deletion requests, use the Contact page and select “General inquiry.”</p></section>
          </article>
        </div>
      </div>
    </main>
  );
}
