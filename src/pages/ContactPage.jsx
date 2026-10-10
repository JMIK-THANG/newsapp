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
    <main className="bg-white px-5 py-7 md:px-6 md:py-9" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1040px]">
        <header className="max-w-2xl">
          <p className="mt-0 mb-2 text-[10px] font-semibold tracking-[.1em] text-[#4f9488] uppercase">Get in touch</p>
          <h1 id="contact-title" className="m-0 font-serif text-[clamp(30px,4vw,40px)] leading-[1.15] font-medium tracking-[-.025em] text-[#182536]">Contact us</h1>
          <p className="mt-3 mb-0 text-[14px] leading-6 text-[#4f5359]">Have a question, feedback, or a story to share? We’d like to hear from you.</p>
        </header>

        <div className="mt-6 grid items-start gap-6 md:grid-cols-[280px_minmax(0,1fr)] md:gap-10">
          <aside className="border-t border-[#dcdde0] pt-5">
            <h2 className="m-0 text-[16px] font-semibold text-[#182536]">Prefer email?</h2>
            <a className="mt-3 block break-all text-[14px] text-[#397d73] underline decoration-[#4f9488]/40 underline-offset-4 hover:decoration-[#397d73]" href="mailto:salaimazawn@gmail.com">salaimazawn@gmail.com</a>
            <p className="mt-3 mb-0 max-w-sm text-[13px] leading-6 text-[#5f6368]">Contact Chinlung Today directly, or send a message using the form. Both reach the same inbox.</p>
          </aside>

          <section className="rounded-[8px] border border-[#dcdde0] bg-[#f7f5ef] p-5 sm:p-6" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="mt-0 mb-5 text-[18px] font-semibold text-[#182536]">Send a message</h2>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <input name="website" type="text" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-semibold text-[#111318]">Name<input className="min-w-0 border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="name" type="text" autoComplete="name" required /></label>
                <label className="grid gap-2 text-xs font-semibold text-[#111318]">Email<input className="min-w-0 border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="email" type="email" autoComplete="email" required /></label>
              </div>
              <label className="grid gap-2 text-xs font-semibold text-[#111318]">Subject<input className="border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#4f9488]" name="subject" type="text" required /></label>
              <label className="grid gap-2 text-xs font-semibold text-[#111318]">Message<textarea className="min-h-40 resize-y border border-[#cfd2d4] bg-white px-4 py-3 text-sm leading-6 font-normal outline-none focus:border-[#4f9488]" name="message" required /></label>
              <button className="flex cursor-pointer items-center justify-center gap-2 rounded-[5px] bg-[#182536] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#304356] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4f9488] disabled:cursor-wait disabled:opacity-60 sm:justify-self-start" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"} <Icon name="arrow" /></button>
            </form>
            <div className={feedback ? "mt-4 text-sm leading-6" : ""} aria-live="polite"><p className={`m-0 ${status === "error" ? "text-[#9b1c1f]" : "text-[#397d73]"}`} role={status === "error" ? "alert" : undefined}>{feedback}</p></div>
          </section>
        </div>
      </div>
    </main>
  );
}
