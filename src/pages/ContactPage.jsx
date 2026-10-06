import { useState } from "react";
import Icon from "../components/ui/Icon";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    setStatus("sending");
    setFeedback("");
    try {
      const base = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api").replace(/\/$/, "");
      const response = await fetch(`${base}/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(25000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to send your message.");
      setStatus("success");
      setFeedback(data.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(error.name === "TypeError" || error.name === "TimeoutError" ? "Could not connect. Please try again or email salaimazawn@gmail.com directly." : error.message);
    }
  };

  return (
    <main className="bg-white px-5 py-8 md:px-6 md:py-12" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1480px]">
        <header className="border-b border-[#dcdde0] pb-7">
          <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">Get in touch</p>
          <h1 id="contact-title" className="m-0 font-serif text-[clamp(42px,6vw,72px)] leading-none tracking-[-.045em] text-[#111318]">Contact us</h1>
          <p className="mt-4 mb-0 max-w-2xl text-base leading-6 text-[#4f5359]">Have a question, feedback, or a story to share? Get in touch with Chinlung Today.</p>
        </header>

        <div className="grid gap-12 py-9 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <aside>
            <h2 className="m-0 text-xl font-semibold text-[#111318]">Email Chinlung Today</h2>
            <a className="mt-4 block break-all text-lg text-[#4f9488] hover:underline" href="mailto:salaimazawn@gmail.com">salaimazawn@gmail.com</a>
            <p className="mt-4 max-w-sm text-base leading-7 text-[#5f6368]">Write directly by email or use the form. All messages reach the same inbox.</p>
          </aside>

          <section className="bg-[#f7f5ef] p-5 sm:p-7" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="mt-0 mb-6 text-2xl font-semibold text-[#111318]">Send a message</h2>
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <input name="website" type="text" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-semibold text-[#111318]">Name<input className="min-w-0 border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="name" type="text" autoComplete="name" required /></label>
                <label className="grid gap-2 text-xs font-semibold text-[#111318]">Email<input className="min-w-0 border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="email" type="email" autoComplete="email" required /></label>
              </div>
              <label className="grid gap-2 text-xs font-semibold text-[#111318]">Subject<input className="border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="subject" type="text" required /></label>
              <label className="grid gap-2 text-xs font-semibold text-[#111318]">Message<textarea className="min-h-40 resize-y border border-[#cfd2d4] bg-white px-4 py-3 text-sm leading-6 font-normal outline-none focus:border-[#4f9488]" name="message" required /></label>
              <button className="flex cursor-pointer items-center justify-center gap-2 bg-[#182536] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#304356] disabled:cursor-wait disabled:opacity-60 sm:justify-self-end" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"} <Icon name="arrow" /></button>
            </form>
            <div className="mt-4 min-h-5 text-sm leading-6" aria-live="polite"><p className="m-0" role={status === "error" ? "alert" : undefined}>{feedback}</p></div>
          </section>
        </div>
      </div>
    </main>
  );
}
