import { useState } from "react";
import Icon from "../components/ui/Icon";

const contactReasons = ["General inquiry", "News tip", "Correction", "Story suggestion", "Partnership", "Technical issue"];

export default function ContactPage() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("demo");
  };

  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1380px]">
        <header className="border-b border-[#dcdde0] pb-7">
          <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">Get in touch</p>
          <h1 id="contact-title" className="m-0 font-serif text-[clamp(42px,6vw,72px)] leading-none tracking-[-.045em] text-[#111318]">Contact us</h1>
          <p className="mt-4 mb-0 max-w-2xl text-sm leading-6 text-[#4f5359]">Send a question, suggest a story, report a correction, or share information with the Chinlung Today newsroom.</p>
        </header>

        <div className="grid gap-12 py-9 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <aside>
            <h2 className="m-0 text-xl font-semibold text-[#111318]">Choose the right desk</h2>
            <div className="mt-5 divide-y divide-[#dcdde0] border-y border-[#dcdde0]">
              <div className="py-4"><p className="m-0 text-[11px] font-semibold text-[#4f9488] uppercase">General inquiries</p><a className="mt-1 block text-sm hover:underline" href="mailto:hello@chinlungtoday.com">hello@chinlungtoday.com</a></div>
              <div className="py-4"><p className="m-0 text-[11px] font-semibold text-[#4f9488] uppercase">News tips</p><a className="mt-1 block text-sm hover:underline" href="mailto:tips@chinlungtoday.com">tips@chinlungtoday.com</a></div>
              <div className="py-4"><p className="m-0 text-[11px] font-semibold text-[#4f9488] uppercase">Corrections</p><a className="mt-1 block text-sm hover:underline" href="mailto:corrections@chinlungtoday.com">corrections@chinlungtoday.com</a></div>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#5f6368]">These addresses are presentation placeholders. Replace them with your real publication email addresses before launch.</p>
          </aside>

          <section className="bg-[#f7f5ef] p-5 sm:p-7" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="mt-0 mb-6 text-2xl font-semibold text-[#111318]">Send a message</h2>
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-semibold text-[#111318]">Name<input className="min-w-0 border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="name" type="text" autoComplete="name" required /></label>
                <label className="grid gap-2 text-xs font-semibold text-[#111318]">Email<input className="min-w-0 border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="email" type="email" autoComplete="email" required /></label>
              </div>
              <label className="grid gap-2 text-xs font-semibold text-[#111318]">Reason for contacting us<select className="border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="reason" defaultValue="" required><option value="" disabled>Select a topic</option>{contactReasons.map((reason) => <option value={reason} key={reason}>{reason}</option>)}</select></label>
              <label className="grid gap-2 text-xs font-semibold text-[#111318]">Subject<input className="border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="subject" type="text" required /></label>
              <label className="grid gap-2 text-xs font-semibold text-[#111318]">Message<textarea className="min-h-40 resize-y border border-[#cfd2d4] bg-white px-4 py-3 text-sm leading-6 font-normal outline-none focus:border-[#4f9488]" name="message" required /></label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="m-0 text-[11px] leading-4 text-[#5f6368]">Please do not send passwords, financial details, or other sensitive personal information.</p><button className="flex shrink-0 cursor-pointer items-center justify-center gap-2 bg-[#182536] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#304356]" type="submit">Send message <Icon name="arrow" /></button></div>
            </form>
            <div className="mt-4 min-h-5 text-xs" aria-live="polite">{status === "demo" && <p className="m-0 text-[#4f706a]">Your form is valid. Connect a form service or backend to deliver this message.</p>}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
