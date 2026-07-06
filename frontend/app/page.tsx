import Link from "next/link";

const stages = [
  {
    tag: "STAGE 01",
    name: "Preliminary Round",
    detail: "Online case submission — open to every registered team, nationwide.",
  },
  {
    tag: "STAGE 02",
    name: "Regional Round 1",
    detail: "Video pitch + deck submission, followed by live jury presentations by region.",
  },
  {
    tag: "STAGE 03",
    name: "Grand Finale",
    detail: "Top teams from every region present to the national jury panel.",
  },
];

const resourceCategories = [
  { label: "Preliminary Round", count: "12 resources" },
  { label: "Regional Round 1", count: "8 resources" },
  { label: "Grand Finale", count: "5 resources" },
];

export default function HomePage() {
  return (
    <main className="bg-[#F6F3EC] text-[#3E4450]">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0E1B2E] text-[#F6F3EC]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.2fr_0.8fr] md:py-32">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">
              Edition VII &nbsp;·&nbsp; Registrations Open
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
              A real business problem.
              <br />
              Three rounds to solve it.
              <br />
              <span className="text-[#C68B3D]">One national stage.</span>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#F6F3EC]/70">
              The India Business Case Programme puts student teams against a live
              corporate case, judged by working practitioners, from the
              Preliminary Round through to the Grand Finale.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-sm bg-[#C68B3D] px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E] transition hover:bg-[#F6F3EC]"
              >
                Register Your Team
              </Link>
              <a
                href="#about"
                className="font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC]/70 underline decoration-[#C68B3D] decoration-1 underline-offset-4 transition hover:text-[#F6F3EC]"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Docket / case-file signature element */}
          <div className="self-end rounded-sm border border-[#F6F3EC]/15 bg-[#0E1B2E]/40 p-6 font-mono text-xs">
            <p className="mb-4 uppercase tracking-widest text-[#C68B3D]">Case Docket — Live</p>
            <dl className="space-y-3 text-[#F6F3EC]/80">
              <div className="flex justify-between border-b border-[#F6F3EC]/10 pb-2">
                <dt>Teams registered</dt>
                <dd className="text-[#F6F3EC]">4,180+</dd>
              </div>
              <div className="flex justify-between border-b border-[#F6F3EC]/10 pb-2">
                <dt>Colleges represented</dt>
                <dd className="text-[#F6F3EC]">310+</dd>
              </div>
              <div className="flex justify-between border-b border-[#F6F3EC]/10 pb-2">
                <dt>Regions live</dt>
                <dd className="text-[#F6F3EC]">North &amp; East · West &amp; South</dd>
              </div>
              <div className="flex justify-between">
                <dt>Registration closes</dt>
                <dd className="text-[#F6F3EC]">31 Jul 2026</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── STAGE TRACKER ───────────────────────────────────────────── */}
      <section id="about" className="border-b border-[#0E1B2E]/10 bg-[#F6F3EC] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            About the Programme
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-[#0E1B2E] md:text-4xl">
            Every team follows the same three-stage journey.
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {stages.map((stage, i) => (
              <div key={stage.name} className="relative border-t-2 border-[#0E1B2E] pt-6">
                <span className="font-mono text-[11px] tracking-widest text-[#C68B3D]">
                  {stage.tag}
                </span>
                <h3 className="mt-2 font-serif text-2xl text-[#0E1B2E]">{stage.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3E4450]/80">{stage.detail}</p>
                {i < stages.length - 1 && (
                  <span className="absolute -right-4 top-6 hidden font-serif text-2xl text-[#0E1B2E]/20 md:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-sm border border-[#0E1B2E] px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E] transition hover:bg-[#0E1B2E] hover:text-[#F6F3EC]"
            >
              Programme structure, in full →
            </Link>
            <Link
              href="/about"
              className="rounded-sm border border-[#0E1B2E] px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E] transition hover:bg-[#0E1B2E] hover:text-[#F6F3EC]"
            >
              Past winning teams →
            </Link>
            <Link
              href="/about"
              className="rounded-sm border border-[#0E1B2E] px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E] transition hover:bg-[#0E1B2E] hover:text-[#F6F3EC]"
            >
              Photos &amp; videos from past editions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="bg-[#F6F3EC] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            In Their Words
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl text-[#0E1B2E] md:text-4xl">
            Teams who have been through all three rounds.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-sm border border-[#0E1B2E]/10 bg-white/50 p-6">
                <div className="mb-4 flex aspect-video items-center justify-center rounded-sm bg-[#0E1B2E]/5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]/40">
                  Video testimonial
                </div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]/50">
                  Edition VI · Grand Finalist
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ───────────────────────────────────────────────── */}
      <section className="border-y border-[#0E1B2E]/10 bg-[#0E1B2E] py-20 text-[#F6F3EC]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">
                Student Resources
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl md:text-4xl">
                Prep material, masterclasses, and recordings — sorted by round.
              </h2>
            </div>
            <Link
              href="/resources"
              className="whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-[#C68B3D] underline decoration-1 underline-offset-4"
            >
              Browse the full library →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {resourceCategories.map((cat) => (
              <div
                key={cat.label}
                className="rounded-sm border border-[#F6F3EC]/15 p-6 transition hover:border-[#C68B3D]"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
                  {cat.count}
                </p>
                <h3 className="mt-2 font-serif text-xl">{cat.label}</h3>
                <p className="mt-3 text-sm text-[#F6F3EC]/60">
                  Open-source prep notes, recorded masterclasses, and upcoming live
                  webinar schedule for this stage.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTRATION CTA ────────────────────────────────────────── */}
      <section className="bg-[#F6F3EC] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            Registration
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#0E1B2E] md:text-5xl">
            One team, one form, verified in minutes.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#3E4450]/80">
            Registration is verified by email and mobile OTP, so every entry is
            genuine — no duplicate sign-ups, no incomplete teams. You will get a
            confirmation email the moment your team is locked in.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
            className="rounded-sm bg-[#0E1B2E] px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC] transition hover:bg-[#C68B3D] hover:text-[#0E1B2E]"
          >
              Start Your Team Registration
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ / CHATBOT TEASER ────────────────────────────────────── */}
      <section className="border-t border-[#0E1B2E]/10 bg-white/40 py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
              Need an Answer Fast?
            </p>
            <h3 className="mt-2 font-serif text-2xl text-[#0E1B2E]">
              Ask the programme assistant — bottom right, anytime.
            </h3>
          </div>
          <Link
            href="/faq"
            className="rounded-sm border border-[#0E1B2E] px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E] transition hover:bg-[#0E1B2E] hover:text-[#F6F3EC]"
          >
            View all FAQs →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-[#0E1B2E] py-10 text-[#F6F3EC]/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 font-mono text-[11px] uppercase tracking-widest">
          <span>India Business Case Programme</span>
          <span>© 2026 · All Rights Reserved</span>
        </div>
      </footer>
    </main>
  );
}
