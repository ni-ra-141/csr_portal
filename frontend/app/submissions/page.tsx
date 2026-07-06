"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// Submissions — /submissions/page.tsx
// Same token system: ink #0E1B2E, brass #C68B3D, oxblood #6E2A2A, paper #F6F3EC.
//
// PURPOSE: a single "status board" for a logged-in team across every round
// that requires a submission — not a duplicate of the RR1 submission form
// already in schedule/page.tsx. This page answers "what have we sent, and
// what's still due", and hosts the upload UI for whichever round is
// currently open.
//
// ⚠️ If you keep both this page AND the inline form in schedule/page.tsx,
// pick ONE as the actual source of truth for submitting, and make the
// other read-only / a link over to it — otherwise you'll end up with two
// forms writing to the same record and no clear "did it actually save"
// answer for the student.
// ─────────────────────────────────────────────────────────────────────────

type Status = "not-open" | "open" | "submitted" | "under-review" | "accepted" | "rejected" | "closed-missed";

type RoundSubmission = {
  id: string;
  stage: string;
  requirement: string;
  deadline: string;
  status: Status;
  submittedAt?: string;
};

const initialRounds: RoundSubmission[] = [
  {
    id: "prelim",
    stage: "Preliminary Round",
    requirement: "Case write-up (PDF)",
    deadline: "05 Jul 2026, 11:59 PM IST",
    status: "accepted",
    submittedAt: "03 Jul 2026",
  },
  {
    id: "rr1",
    stage: "Regional Round 1",
    requirement: "Video pitch link + deck (PDF)",
    deadline: "20 Jul 2026, 11:59 PM IST",
    status: "open",
  },
  {
    id: "finale",
    stage: "Grand Finale",
    requirement: "Final deck (PDF)",
    deadline: "TBA — announced after Regional Round 1 results",
    status: "not-open",
  },
];

const statusStyles: Record<Status, { label: string; className: string }> = {
  "not-open": { label: "Not open yet", className: "bg-[#0E1B2E]/5 text-[#0E1B2E]/40" },
  open: { label: "Open — action needed", className: "bg-[#C68B3D]/20 text-[#0E1B2E]" },
  submitted: { label: "Submitted", className: "bg-[#0E1B2E]/10 text-[#0E1B2E]" },
  "under-review": { label: "Under review", className: "bg-[#0E1B2E]/10 text-[#0E1B2E]" },
  accepted: { label: "Accepted", className: "bg-[#3E6E4A]/15 text-[#3E6E4A]" },
  rejected: { label: "Rejected", className: "bg-[#6E2A2A]/15 text-[#6E2A2A]" },
  "closed-missed": { label: "Window closed — not submitted", className: "bg-[#6E2A2A]/15 text-[#6E2A2A]" },
};

export default function SubmissionsPage() {
  const [rounds, setRounds] = useState(initialRounds);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [deckFile, setDeckFile] = useState<File | null>(null);

  function handleUpload(id: string, e: React.FormEvent) {
    e.preventDefault();
    // TODO: real upload — POST to your backend, which re-validates the
    // deadline against its own clock (not the browser's) before accepting,
    // then triggers the accepted/rejected confirmation email.
    setRounds((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "submitted", submittedAt: new Date().toLocaleDateString() }
          : r
      )
    );
    setExpandedId(null);
  }

  return (
    <main className="bg-[#F6F3EC] text-[#3E4450]">
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-[#0E1B2E] py-20 text-[#F6F3EC]">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">
            Submissions
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            What is due, what is done.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#F6F3EC]/70">
            One board across every round your team needs to submit to.
          </p>
        </div>
      </section>

      {/* ── ROUND LIST ──────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 space-y-4">
          {rounds.map((r) => {
            const style = statusStyles[r.status];
            const isExpanded = expandedId === r.id;
            const canUpload = r.status === "open";

            return (
              <div key={r.id} className="rounded-sm border border-[#0E1B2E]/10 bg-white/50">
                <div className="flex flex-wrap items-center justify-between gap-4 p-6">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[#6E2A2A]">
                      {r.stage}
                    </p>
                    <p className="mt-1 font-serif text-xl text-[#0E1B2E]">{r.requirement}</p>
                    <p className="mt-1 text-sm text-[#3E4450]/60">
                      Deadline: {r.deadline}
                      {r.submittedAt ? ` · Submitted ${r.submittedAt}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest ${style.className}`}
                    >
                      {style.label}
                    </span>
                    {canUpload && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : r.id)}
                        className="rounded-sm bg-[#0E1B2E] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC] transition hover:bg-[#C68B3D] hover:text-[#0E1B2E]"
                      >
                        {isExpanded ? "Close" : "Submit"}
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && canUpload && (
                  <form
                    onSubmit={(e) => handleUpload(r.id, e)}
                    className="space-y-4 border-t border-[#0E1B2E]/10 p-6"
                  >
                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]">
                        Video pitch link
                      </label>
                      <input
                        type="url"
                        required
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        placeholder="Unlisted YouTube / Google Drive link"
                        className="mt-2 w-full rounded-sm border border-[#0E1B2E]/20 bg-white px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]">
                        Deck (PDF, max 15MB)
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        required
                        onChange={(e) => setDeckFile(e.target.files?.[0] ?? null)}
                        className="mt-2 w-full rounded-sm border border-[#0E1B2E]/20 bg-white px-4 py-3 text-sm"
                      />
                      {deckFile && (
                        <p className="mt-2 text-xs text-[#3E4450]/60">
                          Selected file: {deckFile.name}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="rounded-sm bg-[#0E1B2E] px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC] transition hover:bg-[#C68B3D] hover:text-[#0E1B2E]"
                    >
                      Confirm Submission
                    </button>
                  </form>
                )}

                {r.status === "rejected" && (
                  <p className="border-t border-[#0E1B2E]/10 p-6 text-sm text-[#6E2A2A]">
                    This entry was rejected. Check the reason emailed to your
                    team, or reach out via the FAQ chatbot for support.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
