import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";

const sections = [
  { title: "Who we are", text: "Chinlung Today Media is an independent ethnic news media group focused primarily on Chin news, while also covering important developments across Myanmar. Our coverage includes the environment, politics, human rights, society, and a wide range of issues affecting people and communities. We also conduct investigative reporting and interviews on issues of public interest and developments that require deeper examination." },
  { title: "How our work is sustained", text: "Since its establishment, Chinlung Today Media has never received financial support or grants. The organization has sustained its work through the personal commitment and voluntary efforts of its team, driven by a strong dedication to serving Chin communities. Although the organization operates without regular salaries, our team has remained committed to providing the public with accurate, clear, and trustworthy information. This commitment to serving the public through reliable journalism remains central to our work." },
  { title: "Our mission", text: "Our core mission is to provide the public with accurate, clear, and trustworthy information. We carefully examine events, verify sources and facts, and report responsibly. We are committed to ensuring that important events and issues affecting communities are presented to the public accurately and clearly." },
  { title: "Verification matters", text: "In today’s information environment, large amounts of content and information are shared rapidly across social media platforms. Unverified and inaccurate information can spread easily, making fact-checking, source verification, and responsible reporting increasingly important. Chinlung Today Media therefore carefully examines the information it receives, verifies sources, and establishes the facts before publishing." },
  { title: "Journalist training", text: "In addition to news reporting, Chinlung Today Media provides journalist training to strengthen professional, ethical, and responsible journalism within Chin society. The training covers newsgathering, information verification, news writing, and media ethics, helping journalists develop the skills necessary to produce accurate and responsible reporting." },
];

export default function AboutPage() {
  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1080px]">
        <header className="border-b border-[#dcdde0] pb-9">
          <p className="mb-3 text-[11px] font-semibold tracking-[.08em] text-[#4f9488] uppercase">About us</p>
          <h1 id="about-title" className="m-0 max-w-4xl font-serif text-[clamp(38px,5vw,64px)] leading-[1.04] tracking-[-.04em] text-[#111318]">Chinlung Today Media</h1>
          <p className="mt-6 mb-0 max-w-[820px] text-[18px] leading-8 font-normal text-[#3f454b]">Chinlung Today Media was established in 2017 as a daily newspaper serving Chin communities. In 2019, the organization transitioned from print to digital media in response to changes in the media environment and the way audiences access news. Since then, Chinlung Today Media has continued to provide news and public-interest information to Chin communities through digital platforms, while also covering important developments across Myanmar.</p>
        </header>

        <div className="divide-y divide-[#dcdde0]">
          {sections.map((section) => <section className="grid gap-4 py-8 md:grid-cols-[220px_1fr] md:gap-10" key={section.title}><h2 className="m-0 text-xl font-medium text-[#111318]">{section.title}</h2><p className="m-0 text-[18px] leading-8 font-normal text-[#3f454b]">{section.text}</p></section>)}
        </div>

        <section className="border-y border-[#182536] py-9 text-center" aria-labelledby="principle-title">
          <p className="m-0 text-[11px] font-semibold tracking-[.12em] text-[#4f9488] uppercase">Guiding principle</p>
          <h2 id="principle-title" className="my-4 font-serif text-[clamp(32px,5vw,52px)] leading-tight text-[#182536]">“Truth First. People Always.”</h2>
          <p className="mx-auto mb-0 max-w-2xl text-[18px] leading-8 font-normal text-[#3f454b]">This principle reflects our commitment to putting truth first and serving the public through responsible journalism.</p>
        </section>

        <div className="flex flex-col gap-4 py-9 sm:flex-row sm:items-center sm:justify-between"><p className="m-0 text-sm text-[#4f5359]">Have a question, correction, or story suggestion?</p><Link className="flex w-fit items-center gap-2 bg-[#182536] px-5 py-3 text-sm font-medium text-white" to="/contact">Contact Chinlung Today <Icon name="arrow" /></Link></div>
      </div>
    </main>
  );
}
