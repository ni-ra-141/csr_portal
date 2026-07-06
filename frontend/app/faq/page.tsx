"use client";

import { useMemo, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// FAQs — /faq/page.tsx
// Same token system: ink #0E1B2E, brass #C68B3D, oxblood #6E2A2A, paper #F6F3EC.
//
// Two parts:
//   1. A searchable, categorized FAQ list — this alone should absorb most
//      repeat questions before anyone needs the chatbot.
//   2. A chatbot widget shell. The UI here is fully working; the "brain"
//      behind sendMessage() is a stub — see the TODO and the note at the
//      bottom of the response for what actually needs deciding.
// ─────────────────────────────────────────────────────────────────────────

type Category = "Registration" | "Regional Round 1" | "Resources" | "General";

type FAQ = {
  id: string;
  category: Category;
  q: string;
  a: string;
};

const categories: Category[] = ["Registration", "Regional Round 1", "Resources", "General"];

const faqs: FAQ[] = [
  {
    id: "f1",
    category: "Registration",
    q: "Can I register more than once with the same email?",
    a: "No. Each email address and mobile number can only be linked to one team registration. If you try to register again, the system will flag it as a duplicate.",
  },
  {
    id: "f2",
    category: "Registration",
    q: "I didn't receive my OTP. What do I do?",
    a: "Wait 60 seconds and use the Resend Code option on the registration page. Check your spam folder for the email OTP. If it still doesn't arrive, contact support with your registered email.",
  },
  {
    id: "f3",
    category: "Registration",
    q: "Can I change a team member after registering?",
    a: "Team changes must be requested by the team leader through support before the Preliminary Round closes. Changes aren't possible once Regional Round 1 begins.",
  },
  {
    id: "f4",
    category: "Regional Round 1",
    q: "What happens if I miss the submission deadline?",
    a: "Submissions are rejected automatically once the deadline passes — there's no manual override or grace period, so submit early if you can.",
  },
  {
    id: "f5",
    category: "Regional Round 1",
    q: "Can I book a jury slot outside my assigned region?",
    a: "No. Teams can only book presentation slots with jury members from their own region (North & East or West & South), based on your registration details.",
  },
  {
    id: "f6",
    category: "Regional Round 1",
    q: "Can I reschedule my presentation slot once booked?",
    a: "Slots are locked once booked. If there's a genuine conflict, contact support at least 48 hours in advance — rescheduling isn't guaranteed.",
  },
  {
    id: "f7",
    category: "Resources",
    q: "Are the masterclasses free to access?",
    a: "Yes, every masterclass and piece of prep material on the Resources page is free for registered teams.",
  },
  {
    id: "f8",
    category: "Resources",
    q: "I missed a live webinar. Can I still watch it?",
    a: "Yes. Every live session is recorded and added to the Resources library, usually within 24 hours.",
  },
  {
    id: "f9",
    category: "General",
    q: "Who can participate?",
    a: "Any team of enrolled students meeting the eligibility criteria listed in the programme rules can register.",
  },
  {
    id: "f10",
    category: "General",
    q: "How do I contact the programme team directly?",
    a: "Use the chatbot below for common questions, or email the support address listed in your confirmation email for anything account-specific.",
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCategory = activeCategory === "All" || f.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <main className="bg-[#F6F3EC] text-[#3E4450]">
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-[#0E1B2E] py-20 text-[#F6F3EC]">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">FAQs</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Answers first. A chat window if you still need one.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#F6F3EC]/70">
            Search below, or filter by the stage you are stuck on.
          </p>

          {/* Search */}
          <div className="mt-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — e.g. 'OTP', 'deadline', 'slot'"
              className="w-full max-w-lg rounded-sm border border-[#F6F3EC]/20 bg-[#0E1B2E]/40 px-4 py-3 text-sm text-[#F6F3EC] placeholder:text-[#F6F3EC]/40"
            />
          </div>
        </div>
      </section>

      {/* ── FILTERS + LIST ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-wrap gap-2">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`rounded-sm border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition ${
                  activeCategory === c
                    ? "border-[#0E1B2E] bg-[#0E1B2E] text-[#F6F3EC]"
                    : "border-[#0E1B2E]/20 text-[#0E1B2E]/70 hover:border-[#0E1B2E]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 divide-y divide-[#0E1B2E]/10 border-t border-[#0E1B2E]/10">
            {filtered.map((f) => {
              const isOpen = openId === f.id;
              return (
                <div key={f.id}>
                  <button
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
                        {f.category}
                      </p>
                      <p className="mt-1 font-serif text-lg text-[#0E1B2E]">{f.q}</p>
                    </div>
                    <span className="shrink-0 font-mono text-lg text-[#0E1B2E]/40">
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm leading-relaxed text-[#3E4450]/80">{f.a}</p>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <p className="py-10 text-center text-sm text-[#3E4450]/60">
                Nothing matches &quot;{query}&quot; — try the chatbot below instead.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── CHATBOT LAUNCHER (persistent bottom-right) ───────────────── */}
      <ChatbotWidget />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Chatbot widget — working UI shell, stubbed responses.
// Swap `getBotReply` for a real call to your backend once you've picked
// an approach (see the note after the code).
// ─────────────────────────────────────────────────────────────────────────

type ChatMessage = { role: "user" | "bot"; text: string };

/*function _getBotReplyStub(userText: string): string {
  const text = userText.toLowerCase();
  if (text.includes("otp")) {
    return "If your OTP hasn't arrived, check spam first, then use Resend Code on the registration page. Still stuck? I can connect you to support.";
  }
  if (text.includes("deadline") || text.includes("late")) {
    return "Submissions close automatically at the deadline shown on the Regional Round 1 page — there's no grace period, so submit a little early.";
  }
  return "I don't have a confident answer for that yet — try the FAQ list above, or I can pass this to the support team.";
}*/

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi! Ask me anything about registration, deadlines, or slots." },
  ]);

  async function sendMessage() {
  if (!input.trim()) return;

  const question = input;

  const userMsg: ChatMessage = {
    role: "user",
    text: question,
  };

  // Show the user's message immediately
  setMessages((prev) => [...prev, userMsg]);

  setInput("");

  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: data.reply,
      },
    ]);
  } catch (err) {
    console.error("Chatbot widget error:", err);
    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: "Sorry, something went wrong.",
      },
    ]);
  }
}

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col rounded-sm border border-[#0E1B2E]/10 bg-[#F6F3EC] shadow-xl">
          <div className="flex items-center justify-between border-b border-[#0E1B2E]/10 bg-[#0E1B2E] px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC]">
              Programme Assistant
            </span>
            <button onClick={() => setOpen(false)} className="text-[#F6F3EC]/60 hover:text-[#F6F3EC]">
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-sm px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-[#C68B3D]/20 text-[#0E1B2E]"
                    : "bg-white/70 text-[#3E4450]"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-[#0E1B2E]/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a question…"
              className="flex-1 rounded-sm border border-[#0E1B2E]/20 bg-white px-3 py-2 text-sm"
            />
            <button
              onClick={sendMessage}
              className="rounded-sm bg-[#0E1B2E] px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC]"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="rounded-full bg-[#0E1B2E] px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC] shadow-lg transition hover:bg-[#C68B3D] hover:text-[#0E1B2E]"
      >
        {open ? "Close" : "Ask a Question"}
      </button>
    </div>
  );
}
