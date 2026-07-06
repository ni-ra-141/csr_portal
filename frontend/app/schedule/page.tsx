"use client";

import { useMemo, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// Regional Round 1 — /schedule/page.tsx
// Same token system: ink #0E1B2E, brass #C68B3D, oxblood #6E2A2A, paper #F6F3EC.
//
// This page covers two distinct jobs for a logged-in, registered team:
//   1. Submit video pitch + PDF deck before the RR1 deadline.
//   2. Book a live presentation slot with a jury member from their own region.
//
// IMPORTANT — this is UI scaffolding only. The rules that actually matter
// (deadline cutoff, duplicate booking, region lock, file validation) MUST
// also be enforced server-side. A client-side check only improves UX; it
// is not a security or integrity boundary. See notes inline.
// ─────────────────────────────────────────────────────────────────────────

type Region = "North & East" | "West & South";

type Slot = {
  id: string;
  date: string; // display string
  time: string;
  juryName: string;
  region: Region;
  booked: boolean;
};

// Mock: replace with the logged-in team's actual region from their registration record.
const TEAM_REGION: Region = "North & East";

const SUBMISSION_DEADLINE = new Date("2026-07-20T23:59:00+05:30");

const mockSlots: Slot[] = [
  { id: "s1", date: "22 Jul", time: "10:00 AM IST", juryName: "R. Kapoor", region: "North & East", booked: false },
  { id: "s2", date: "22 Jul", time: "11:00 AM IST", juryName: "R. Kapoor", region: "North & East", booked: true },
  { id: "s3", date: "22 Jul", time: "3:00 PM IST", juryName: "S. Bhattacharya", region: "North & East", booked: false },
  { id: "s4", date: "23 Jul", time: "10:00 AM IST", juryName: "S. Bhattacharya", region: "North & East", booked: false },
  { id: "s5", date: "22 Jul", time: "10:00 AM IST", juryName: "A. Menon", region: "West & South", booked: false },
  { id: "s6", date: "23 Jul", time: "1:00 PM IST", juryName: "A. Menon", region: "West & South", booked: false },
];

function useCountdown(deadline: Date) {
  const now = new Date(); // for real use, tick this with setInterval — kept static here for clarity
  const diffMs = deadline.getTime() - now.getTime();
  const isOpen = diffMs > 0;
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diffMs / (1000 * 60 * 60)) % 24));
  return { isOpen, days, hours };
}

export default function RegionalRound1Page() {
  const { isOpen, days, hours } = useCountdown(SUBMISSION_DEADLINE);

  const [deckFile, setDeckFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitted" | "rejected">("idle");

  const [slots, setSlots] = useState<Slot[]>(mockSlots);
  const [bookedSlotId, setBookedSlotId] = useState<string | null>(null);

  const regionSlots = useMemo(
    () => slots.filter((s) => s.region === TEAM_REGION),
    [slots]
  );

  function handleSubmitEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!isOpen) {
      setSubmissionStatus("rejected");
      return;
    }
    // TODO: server call — upload deck + video link, server re-validates
    // the deadline against its own clock before accepting.
    setSubmissionStatus("submitted");
  }

  function handleBookSlot(slotId: string) {
    // TODO: server call — must re-check the slot is still open and belongs
    // to the team's region before confirming, to avoid a race between two
    // teams booking the same slot at once.
    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, booked: true } : s)));
    setBookedSlotId(slotId);
  }

  return (
    <main className="bg-[#F6F3EC] text-[#3E4450]">
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-[#0E1B2E] py-20 text-[#F6F3EC]">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">
            Regional Round 1
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            Submit your entry, then pick your presentation slot.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#F6F3EC]/70">
            Your team is registered under <strong className="text-[#C68B3D]">{TEAM_REGION}</strong>.
            You will only see jury slots from your own region below.
          </p>
        </div>
      </section>

      {/* ── SUBMISSION WINDOW BANNER ─────────────────────────────────── */}
      <section
        className={`border-b border-[#0E1B2E]/10 py-4 ${
          isOpen ? "bg-white/50" : "bg-[#6E2A2A]/10"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          {isOpen ? (
            <p className="font-mono text-[12px] uppercase tracking-widest text-[#0E1B2E]">
              Submissions close in {days}d {hours}h — 20 Jul 2026, 11:59 PM IST
            </p>
          ) : (
            <p className="font-mono text-[12px] uppercase tracking-widest text-[#6E2A2A]">
              Submission window closed. Late entries are rejected automatically.
            </p>
          )}
        </div>
      </section>

      {/* ── SUBMISSION PORTAL ─────────────────────────────────────────── */}
      <section className="border-b border-[#0E1B2E]/10 bg-white/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            Step 1
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#0E1B2E] md:text-4xl">
            Submit your video pitch and deck
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#3E4450]/80">
            One submission per team. You can re-upload to replace your entry
            any time before the deadline — after that, the form locks.
          </p>

          {submissionStatus === "submitted" ? (
            <div className="mt-10 rounded-sm border border-[#0E1B2E]/10 bg-white/70 p-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
                Received
              </p>
              <p className="mt-2 font-serif text-xl text-[#0E1B2E]">
                Your entry is in. A confirmation email is on its way.
              </p>
              <p className="mt-2 text-sm text-[#3E4450]/70">
                You will get a second email once the jury panel has reviewed it
                for the presentation stage.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitEntry} className="mt-10 space-y-6">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]">
                  Video pitch link
                </label>
                <input
                  type="url"
                  required
                  disabled={!isOpen}
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="Unlisted YouTube / Google Drive link"
                  className="mt-2 w-full rounded-sm border border-[#0E1B2E]/20 bg-white px-4 py-3 text-sm disabled:opacity-40"
                />
                <p className="mt-1 text-xs text-[#3E4450]/50">
                  Max 5 minutes. Set sharing to &quot;Anyone with the link can view.&quot;
                </p>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]">
                  Deck (PDF, max 15MB)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  disabled={!isOpen}
                  onChange={(e) => setDeckFile(e.target.files?.[0] ?? null)}
                  className="mt-2 w-full rounded-sm border border-[#0E1B2E]/20 bg-white px-4 py-3 text-sm disabled:opacity-40"
                />
                {deckFile && (
                  <p className="mt-2 text-xs text-[#3E4450]/60">
                    Selected file: {deckFile.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isOpen}
                className="rounded-sm bg-[#0E1B2E] px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC] transition hover:bg-[#C68B3D] hover:text-[#0E1B2E] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit Entry
              </button>

              {submissionStatus === "rejected" && (
                <p className="font-mono text-[12px] uppercase tracking-widest text-[#6E2A2A]">
                  Submission window has closed — this entry was not accepted.
                </p>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ── SLOT BOOKING ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6E2A2A]">
            Step 2
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#0E1B2E] md:text-4xl">
            Book your presentation slot
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3E4450]/80">
            Slots below are open only to jury members assigned to{" "}
            <strong>{TEAM_REGION}</strong>. Once you book a slot, it is locked
            to your team and removed from everyone else list.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {regionSlots.map((slot) => {
              const isMine = bookedSlotId === slot.id;
              return (
                <div
                  key={slot.id}
                  className={`flex items-center justify-between gap-4 rounded-sm border p-5 ${
                    isMine
                      ? "border-[#C68B3D] bg-[#C68B3D]/10"
                      : slot.booked
                      ? "border-[#0E1B2E]/10 bg-[#0E1B2E]/5 opacity-50"
                      : "border-[#0E1B2E]/10 bg-white/50"
                  }`}
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-[#6E2A2A]">
                      {slot.date} · {slot.time}
                    </p>
                    <p className="mt-1 font-serif text-lg text-[#0E1B2E]">
                      Jury: {slot.juryName}
                    </p>
                  </div>

                  {isMine ? (
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
                      Your slot
                    </span>
                  ) : slot.booked ? (
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]/40">
                      Booked
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBookSlot(slot.id)}
                      disabled={bookedSlotId !== null}
                      className="shrink-0 rounded-sm bg-[#0E1B2E] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC] transition hover:bg-[#C68B3D] hover:text-[#0E1B2E] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Book This Slot
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {bookedSlotId && (
            <div className="mt-10 rounded-sm border border-[#0E1B2E]/10 bg-white/70 p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
                Confirmed
              </p>
              <p className="mt-2 text-sm text-[#3E4450]/80">
                Your presentation room link will appear here, and be emailed
                to your team, 24 hours before your slot.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
