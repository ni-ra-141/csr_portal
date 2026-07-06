import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────
// About the Programme — /about/page.tsx
// Same token system as the homepage: ink #0E1B2E, brass #C68B3D,
// oxblood #6E2A2A, paper #F6F3EC. Fraunces (serif) / Inter (body) / IBM Plex Mono.
// Replace placeholder copy, years, names, and media before ship.
// ─────────────────────────────────────────────────────────────────────────

const stages = [
  {
    tag: "STAGE 01",
    name: "Preliminary Round",
    detail: "Online case submission, open to every registered team nationwide.",
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

const editions = [
  { year: "2025", label: "Edition VI", note: "Case: last-mile logistics for a national retailer" },
  { year: "2024", label: "Edition V", note: "Case: pricing strategy for a D2C healthcare brand" },
  { year: "2023", label: "Edition IV", note: "Case: market entry for a renewable energy startup" },
  { year: "2022", label: "Edition III", note: "Case: turnaround strategy for a regional airline" },
];

const winners = [
  { year: "2025", team: "Team Meridian", college: "IIM Ahmedabad", region: "West & South" },
  { year: "2024", team: "Team Ironclad", college: "XLRI Jamshedpur", region: "North & East" },
  { year: "2023", team: "Team Vantage", college: "IIM Bangalore", region: "West & South" },
  { year: "2022", team: "Team Northstar", college: "IIFT Delhi", region: "North & East" },
];

const announcements = [
  { date: "12 JUL 2026", text: "Registration for the 2026 cohort closes on 31 July." },
  { date: "08 JUL 2026", text: "Masterclass on structuring a business case — recording live now." },
  { date: "02 JUL 2026", text: "Regional jury panels for North & East, West & South confirmed." },
  { date: "24 JUN 2026", text: "Case brief for Edition VII to be released 15 August." },
];

export default function AboutPage() {
  return (
    <main className="bg-[#F6F3EC] text-[#3E4450]">
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-[#0E1B2E] py-20 text-[#F6F3EC]">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">
            About the Programme
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            Seven years of putting students in front of a real business problem.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#F6F3EC]/70">
            The India Business Case Programme began in 2019 as a single-city
            pilot with 40 teams. It now runs three rounds nationwide, judged by
            practitioners, and closes each year with a Grand Finale in front of
            a national jury panel.
          </p>
        </div>
      </section>

      {/* ── HISTORY ─────────────────────────────────────────────────── */}
      <section className="border-b border-[#0E1B2E]/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            History
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl text-[#0E1B2E] md:text-4xl">
            From a single pilot city to a national programme.
          </h2>

          <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2">
            <div className="border-l-2 border-[#0E1B2E] pl-6">
              <span className="font-mono text-[11px] tracking-widest text-[#C68B3D]">2019</span>
              <h3 className="mt-1 font-serif text-xl text-[#0E1B2E]">The pilot</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3E4450]/80">
                Launched in one city with 40 teams and a single live case,
                judged in person by a five-member panel.
              </p>
            </div>
            <div className="border-l-2 border-[#0E1B2E] pl-6">
              <span className="font-mono text-[11px] tracking-widest text-[#C68B3D]">2021</span>
              <h3 className="mt-1 font-serif text-xl text-[#0E1B2E]">Going regional</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3E4450]/80">
                Introduced the two-region structure — North &amp; East, West &amp;
                South — so teams could present to juries closer to home.
              </p>
            </div>
            <div className="border-l-2 border-[#0E1B2E] pl-6">
              <span className="font-mono text-[11px] tracking-widest text-[#C68B3D]">2023</span>
              <h3 className="mt-1 font-serif text-xl text-[#0E1B2E]">Going national</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3E4450]/80">
                Crossed 2,000 registered teams and moved submissions online,
                including the first video-pitch format for Regional Round 1.
              </p>
            </div>
            <div className="border-l-2 border-[#0E1B2E] pl-6">
              <span className="font-mono text-[11px] tracking-widest text-[#C68B3D]">2026</span>
              <h3 className="mt-1 font-serif text-xl text-[#0E1B2E]">Edition VII</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3E4450]/80">
                Now open to every accredited college nationwide, with 4,000+
                teams registered and a fully online round structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMME STRUCTURE ─────────────────────────────────────── */}
      <section className="border-b border-[#0E1B2E]/10 bg-white/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            Programme Structure
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl text-[#0E1B2E] md:text-4xl">
            Three stages. Every team follows the same path.
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
        </div>
      </section>

      {/* ── PHOTOS & VIDEOS FROM PAST EDITIONS ──────────────────────── */}
      <section className="border-b border-[#0E1B2E]/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
                The Archive
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl text-[#0E1B2E] md:text-4xl">
                Photos and video from every past edition.
              </h2>
            </div>
            <a
              href="#"
              className="whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-[#6E2A2A] underline decoration-1 underline-offset-4"
            >
              Open the full archive →
            </a>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {editions.map((ed) => (
              <div key={ed.year} className="group cursor-pointer rounded-sm border border-[#0E1B2E]/10 bg-white/50">
                <div className="flex aspect-[4/3] items-center justify-center bg-[#0E1B2E]/5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]/40 transition group-hover:bg-[#0E1B2E]/10">
                  Photos &amp; recap film
                </div>
                <div className="p-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
                    {ed.year} · {ed.label}
                  </p>
                  <p className="mt-1 text-sm text-[#3E4450]/80">{ed.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ───────────────────────────────────────── */}
      <section className="border-b border-[#0E1B2E]/10 bg-white/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            In Their Words
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl text-[#0E1B2E] md:text-4xl">
            What it is actually like to go through all three rounds.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-sm border border-[#0E1B2E]/10 bg-white/60 p-6">
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

      {/* ── PAST WINNING TEAMS ───────────────────────────────────────── */}
      <section className="border-b border-[#0E1B2E]/10 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            The Record
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl text-[#0E1B2E] md:text-4xl">
            Past winning teams.
          </h2>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#0E1B2E] font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]/60">
                  <th className="py-3 pr-4">Year</th>
                  <th className="py-3 pr-4">Team</th>
                  <th className="py-3 pr-4">College</th>
                  <th className="py-3">Region</th>
                </tr>
              </thead>
              <tbody>
                {winners.map((w) => (
                  <tr key={w.year} className="border-b border-[#0E1B2E]/10 text-sm">
                    <td className="py-4 pr-4 font-mono text-[#C68B3D]">{w.year}</td>
                    <td className="py-4 pr-4 font-serif text-lg text-[#0E1B2E]">{w.team}</td>
                    <td className="py-4 pr-4 text-[#3E4450]/80">{w.college}</td>
                    <td className="py-4 text-[#3E4450]/80">{w.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── LIVE ANNOUNCEMENTS & UPDATES ────────────────────────────── */}
      <section className="bg-[#0E1B2E] py-20 text-[#F6F3EC]">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">
            Live Updates
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl md:text-4xl">
            Announcements for the current edition.
          </h2>

          <ul className="mt-12 divide-y divide-[#F6F3EC]/10">
            {announcements.map((a) => (
              <li key={a.text} className="flex flex-wrap items-baseline gap-4 py-5">
                <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
                  {a.date}
                </span>
                <span className="text-[15px] text-[#F6F3EC]/85">{a.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/register"
              className="rounded-sm bg-[#C68B3D] px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E] transition hover:bg-[#F6F3EC]"
            >
              Register Your Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
