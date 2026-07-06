"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────
// Resources — /resources/page.tsx
// Same token system as homepage/about: ink #0E1B2E, brass #C68B3D,
// oxblood #6E2A2A, paper #F6F3EC. Fraunces (serif) / Inter (body) / IBM Plex Mono.
//
// This page assumes resources come from a data source (CMS/DB) shaped like
// the `resources` array below — swap the mock array for a real fetch.
// ─────────────────────────────────────────────────────────────────────────

type Stage = "Preliminary Round" | "Regional Round 1" | "Grand Finale";
type Kind = "Prep Material" | "Masterclass" | "Webinar Recording";

type Resource = {
  id: string;
  title: string;
  kind: Kind;
  stage: Stage;
  format: "PDF" | "Video";
  duration?: string; // for video content
};

const stages: Stage[] = ["Preliminary Round", "Regional Round 1", "Grand Finale"];
const kinds: Kind[] = ["Prep Material", "Masterclass", "Webinar Recording"];

const resources: Resource[] = [
  { id: "r1", title: "How to structure a business case from scratch", kind: "Prep Material", stage: "Preliminary Round", format: "PDF" },
  { id: "r2", title: "Framework library: market entry, pricing, ops", kind: "Prep Material", stage: "Preliminary Round", format: "PDF" },
  { id: "r3", title: "Masterclass: Reading a case brief the right way", kind: "Masterclass", stage: "Preliminary Round", format: "Video", duration: "48 min" },
  { id: "r4", title: "Building a video pitch that holds a jury's attention", kind: "Masterclass", stage: "Regional Round 1", format: "Video", duration: "36 min" },
  { id: "r5", title: "Deck template + submission checklist", kind: "Prep Material", stage: "Regional Round 1", format: "PDF" },
  { id: "r6", title: "Regional Round 1 kickoff webinar — recording", kind: "Webinar Recording", stage: "Regional Round 1", format: "Video", duration: "1 hr 05 min" },
  { id: "r7", title: "Presenting to a national jury panel", kind: "Masterclass", stage: "Grand Finale", format: "Video", duration: "42 min" },
  { id: "r8", title: "Grand Finale format & judging rubric", kind: "Prep Material", stage: "Grand Finale", format: "PDF" },
];

const upcomingWebinars = [
  { date: "18 JUL", time: "6:00 PM IST", title: "Live Q&A: Preliminary Round submissions", stage: "Preliminary Round" as Stage },
  { date: "25 JUL", time: "6:00 PM IST", title: "Masterclass: Financial modelling under time pressure", stage: "Regional Round 1" as Stage },
];

export default function ResourcesPage() {
  const [stageFilter, setStageFilter] = useState<Stage | "All">("All");
  const [kindFilter, setKindFilter] = useState<Kind | "All">("All");

  const filtered = useMemo(
    () =>
      resources.filter(
        (r) =>
          (stageFilter === "All" || r.stage === stageFilter) &&
          (kindFilter === "All" || r.kind === kindFilter)
      ),
    [stageFilter, kindFilter]
  );

  return (
    <main className="bg-[#F6F3EC] text-[#3E4450]">
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-[#0E1B2E] py-20 text-[#F6F3EC]">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">
            Resources
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            Everything you need, sorted by the round you are preparing for.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#F6F3EC]/70">
            Prep material, recorded masterclasses, and past webinars — all free
            to access, all tagged to a stage so you only see what is relevant
            right now.
          </p>
        </div>
      </section>

      {/* ── UPCOMING LIVE WEBINARS ───────────────────────────────────── */}
      <section className="border-b border-[#0E1B2E]/10 bg-white/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
                Live &amp; Upcoming
              </p>
              <h2 className="mt-3 font-serif text-2xl text-[#0E1B2E] md:text-3xl">
                Webinars scheduled this month
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {upcomingWebinars.map((w) => (
              <div
                key={w.title}
                className="flex items-center justify-between gap-4 rounded-sm border border-[#0E1B2E]/10 bg-white/60 p-5"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
                    {w.date} · {w.time} · {w.stage}
                  </p>
                  <p className="mt-1 font-serif text-lg text-[#0E1B2E]">{w.title}</p>
                </div>
                <button className="shrink-0 rounded-sm bg-[#0E1B2E] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC] transition hover:bg-[#C68B3D] hover:text-[#0E1B2E]">
                  Reserve a Seat
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#3E4450]/60">
            Cannot make it live? Every session is recorded and added to the
            library below within 24 hours.
          </p>
        </div>
      </section>

      {/* ── FILTERABLE LIBRARY ───────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            The Library
          </p>
          <h2 className="mt-3 font-serif text-2xl text-[#0E1B2E] md:text-3xl">
            Filter by stage and format
          </h2>

          {/* Stage filter */}
          <div className="mt-8 flex flex-wrap gap-2">
            {(["All", ...stages] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStageFilter(s)}
                className={`rounded-sm border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition ${
                  stageFilter === s
                    ? "border-[#0E1B2E] bg-[#0E1B2E] text-[#F6F3EC]"
                    : "border-[#0E1B2E]/20 text-[#0E1B2E]/70 hover:border-[#0E1B2E]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Kind filter */}
          <div className="mt-3 flex flex-wrap gap-2">
            {(["All", ...kinds] as const).map((k) => (
              <button
                key={k}
                onClick={() => setKindFilter(k)}
                className={`rounded-sm border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition ${
                  kindFilter === k
                    ? "border-[#C68B3D] bg-[#C68B3D] text-[#0E1B2E]"
                    : "border-[#0E1B2E]/20 text-[#0E1B2E]/70 hover:border-[#C68B3D]"
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mt-10 grid gap-4">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-[#0E1B2E]/10 bg-white/50 p-5 transition hover:border-[#0E1B2E]/30"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#6E2A2A]">
                    {r.stage} · {r.kind}
                  </p>
                  <p className="mt-1 font-serif text-lg text-[#0E1B2E]">{r.title}</p>
                  <p className="mt-1 text-sm text-[#3E4450]/60">
                    {r.format}
                    {r.duration ? ` · ${r.duration}` : ""}
                  </p>
                </div>
                <button className="shrink-0 rounded-sm border border-[#0E1B2E] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E] transition hover:bg-[#0E1B2E] hover:text-[#F6F3EC]">
                  {r.format === "PDF" ? "Download" : "Watch"}
                </button>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="rounded-sm border border-[#0E1B2E]/10 bg-white/30 p-8 text-center text-sm text-[#3E4450]/60">
                Nothing here yet for this combination — try a different filter.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0E1B2E] py-16 text-[#F6F3EC]">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl">
            Ready to put this into practice?
          </h2>
          <div className="mt-6">
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
