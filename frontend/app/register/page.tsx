"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// Register a Team — /register/page.tsx
// Same token system: ink #0E1B2E, brass #C68B3D, oxblood #6E2A2A, paper #F6F3EC.
//
// ⚠️ FIELD PARITY: the fields below are placeholders based on typical
// team-competition forms. Requirement #3 says this must MIRROR your
// existing Zoho form exactly, including every mandatory disclaimer.
// Pull the real Zoho field list before treating this as final.
//
// ⚠️ SECURITY BOUNDARY: every check in this file (OTP match, duplicate
// email/mobile, required fields) is UI convenience only. The server MUST
// independently re-validate all of it — OTP correctness, expiry, rate
// limiting, and duplicate lookups against the real database — before
// writing a registration record. Never trust a client-reported "verified"
// flag.
// ─────────────────────────────────────────────────────────────────────────

type Member = {
  name: string;
  email: string;
  mobile: string;
};

type FormState = {
  teamName: string;
  college: string;
  region: "North & East" | "West & South" | "";
  leaderName: string;
  leaderEmail: string;
  leaderMobile: string;
  members: Member[];
};

const initialForm: FormState = {
  teamName: "",
  college: "",
  region: "",
  leaderName: "",
  leaderEmail: "",
  leaderMobile: "",
  members: [
    { name: "", email: "", mobile: "" },
    { name: "", email: "", mobile: "" },
  ],
};

type Step = "details" | "verify-email" | "disclaimers" | "done";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<FormState>(initialForm);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpError, setEmailOtpError] = useState<string | null>(null);

  /*const [mobileOtp, setMobileOtp] = useState("");
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpError, setMobileOtpError] = useState<string | null>(null);*/

  const [agreements, setAgreements] = useState({
    rulesAccepted: false,
    dataConsent: false,
    codeOfConduct: false,
    accuracyDeclaration: false,
  });

  function updateMember(index: number, field: keyof Member, value: string) {
    setForm((prev) => {
      const members = [...prev.members];
      members[index] = { ...members[index], [field]: value };
      return { ...prev, members };
    });
  }

  async function handleDetailsSubmit(e: React.FormEvent) {
  e.preventDefault();
  setDuplicateError(null);

  // Check email
  const emailResponse = await fetch("/api/auth/check-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.leaderEmail,
    }),
  });

  const emailData = await emailResponse.json();

  if (emailData.exists) {
    setDuplicateError(
      "This email is already linked to a registered team."
    );
    return;
  }

  // Check mobile
  const mobileResponse = await fetch("/api/auth/check-mobile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile: form.leaderMobile,
    }),
  });

  const mobileData = await mobileResponse.json();

  if (mobileData.exists) {
    setDuplicateError(
      "This mobile number is already linked to a registered team."
    );
    return;
  }

  setStep("verify-email");
}

  async function sendEmailOtp() {
  setEmailOtpError(null);

  const response = await fetch("/api/auth/send-email-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.leaderEmail,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    setEmailOtpError(data.message);
    return;
  }

  setEmailOtpSent(true);
}

  async function verifyEmailOtp() {
  setEmailOtpError(null);

  const response = await fetch("/api/auth/verify-email-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.leaderEmail,
      otp: emailOtp,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    setEmailOtpError(data.message);
    return;
  }

  setStep("disclaimers");
}

  const allAgreed = Object.values(agreements).every(Boolean);

  async function handleFinalSubmit() {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamName: form.teamName,
        college: form.college,
        region: form.region,
        leaderName: form.leaderName,
        leaderEmail: form.leaderEmail,
        leaderMobile: form.leaderMobile,
        members: form.members,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    setStep("done");
  } catch (error) {
    console.error(error);
    alert("Something went wrong while registering.");
  }
}

  return (
    <main className="min-h-screen bg-[#F6F3EC] text-[#3E4450]">
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-[#0E1B2E] py-16 text-[#F6F3EC]">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C68B3D]">
            Register a Team
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Four steps. About ten minutes.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#F6F3EC]/70">
            Team & college details → verify the leader email →
            accept the programme disclaimers.
          </p>
        </div>
      </section>

      {/* ── STEP INDICATOR ──────────────────────────────────────────── */}
      <div className="border-b border-[#0E1B2E]/10 bg-white/40 py-4">
        <div className="mx-auto flex max-w-3xl gap-6 px-6 font-mono text-[11px] uppercase tracking-widest">
          {(["details", "verify-email", "disclaimers"] as Step[]).map(
            (s, i) => (
              <span
                key={s}
                className={
                  step === s
                    ? "text-[#0E1B2E]"
                    : "text-[#0E1B2E]/30"
                }
              >
                {i + 1}. {s.replace("-", " ")}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* ── STEP 1: DETAILS ─────────────────────────────────────────── */}
        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-10">
            <fieldset className="space-y-4">
              <legend className="font-serif text-2xl text-[#0E1B2E]">Team &amp; college</legend>
              <Field label="Team name" required>
                <input
                  required
                  value={form.teamName}
                  onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="College / institute name" required>
                <input
                  required
                  value={form.college}
                  onChange={(e) => setForm({ ...form, college: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Region" required>
                <select
                  required
                  value={form.region}
                  onChange={(e) =>
                    setForm({ ...form, region: e.target.value as FormState["region"] })
                  }
                  className={inputClass}
                >
                  <option value="">Select your region</option>
                  <option value="North & East">North &amp; East</option>
                  <option value="West & South">West &amp; South</option>
                </select>
              </Field>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-serif text-2xl text-[#0E1B2E]">Team leader</legend>
              <p className="text-sm text-[#3E4450]/60">
                The leader email will be verified by OTP.
                The mobile number is used only for programme communication.
              </p>
              <Field label="Full name" required>
                <input
                  required
                  value={form.leaderName}
                  onChange={(e) => setForm({ ...form, leaderName: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Email address" required>
                <input
                  required
                  type="email"
                  value={form.leaderEmail}
                  onChange={(e) => setForm({ ...form, leaderEmail: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Mobile number" required>
                <input
                  required
                  type="tel"
                  value={form.leaderMobile}
                  onChange={(e) => setForm({ ...form, leaderMobile: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="font-serif text-2xl text-[#0E1B2E]">Team members</legend>
              {form.members.map((m, i) => (
                <div key={i} className="rounded-sm border border-[#0E1B2E]/10 bg-white/50 p-5">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[#6E2A2A]">
                    Member {i + 2}
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <input
                      placeholder="Full name"
                      required
                      value={m.name}
                      onChange={(e) => updateMember(i, "name", e.target.value)}
                      className={inputClass}
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      required
                      value={m.email}
                      onChange={(e) => updateMember(i, "email", e.target.value)}
                      className={inputClass}
                    />
                    <input
                      placeholder="Mobile"
                      type="tel"
                      required
                      value={m.mobile}
                      onChange={(e) => updateMember(i, "mobile", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              ))}
            </fieldset>

            {duplicateError && (
              <p className="rounded-sm border border-[#6E2A2A]/30 bg-[#6E2A2A]/10 p-4 text-sm text-[#6E2A2A]">
                {duplicateError}
              </p>
            )}

            <button type="submit" className={primaryButtonClass}>
              Continue to Email Verification
            </button>
          </form>
        )}

        {/* ── STEP 2: EMAIL OTP ───────────────────────────────────────── */}
        {step === "verify-email" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-[#0E1B2E]">Verify the leader email</h2>
            <p className="text-sm text-[#3E4450]/70">
              We will send a 6-digit code to <strong>{form.leaderEmail}</strong>.
            </p>
            {!emailOtpSent ? (
              <button onClick={sendEmailOtp} className={primaryButtonClass}>
                Send Code
              </button>
            ) : (
              <div className="space-y-3">
                <input
                  placeholder="6-digit code"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className={inputClass + " max-w-xs"}
                />
                {emailOtpError && <p className="text-sm text-[#6E2A2A]">{emailOtpError}</p>}
                <div className="flex gap-3">
                  <button onClick={verifyEmailOtp} className={primaryButtonClass}>
                    Verify Code
                  </button>
                  <button onClick={sendEmailOtp} className={secondaryButtonClass}>
                    Resend Code
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 3: DISCLAIMERS ─────────────────────────────────────── */}
        {step === "disclaimers" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-[#0E1B2E]">Before you submit</h2>
            <p className="text-sm text-[#3E4450]/70">
              Replace this list with the exact disclaimers from your Zoho
              form — these are placeholders.
            </p>

            <div className="space-y-4">
              <Checkbox
                checked={agreements.rulesAccepted}
                onChange={(v) => setAgreements({ ...agreements, rulesAccepted: v })}
                label="I have read and accept the official programme rules and eligibility criteria."
              />
              <Checkbox
                checked={agreements.dataConsent}
                onChange={(v) => setAgreements({ ...agreements, dataConsent: v })}
                label="I consent to my team data being used for programme communication, judging, and result publication."
              />
              <Checkbox
                checked={agreements.codeOfConduct}
                onChange={(v) => setAgreements({ ...agreements, codeOfConduct: v })}
                label="All team members agree to the programme code of conduct."
              />
              <Checkbox
                checked={agreements.accuracyDeclaration}
                onChange={(v) => setAgreements({ ...agreements, accuracyDeclaration: v })}
                label="I declare that all details provided above are accurate and belong to enrolled students."
              />
            </div>

            <button
              onClick={handleFinalSubmit}
              disabled={!allAgreed}
              className={primaryButtonClass + " disabled:cursor-not-allowed disabled:opacity-40"}
            >
              Complete Registration
            </button>
          </div>
        )}

        {/* ── DONE ────────────────────────────────────────────────────── */}
        {step === "done" && (
          <div className="rounded-sm border border-[#0E1B2E]/10 bg-white/60 p-10 text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#C68B3D]">
              Registered
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#0E1B2E]">
              {form.teamName || "Your team"} is in.
            </h2>
            <p className="mt-3 text-sm text-[#3E4450]/70">
              Your registration has been received successfully. A confirmation email will be sent after registration is processed. Keep an eye on the Resources page for what comes next.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// ── shared bits ────────────────────────────────────────────────────────
const inputClass =
  "w-full rounded-sm border border-[#0E1B2E]/20 bg-white px-4 py-3 text-sm";
const primaryButtonClass =
  "rounded-sm bg-[#0E1B2E] px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC] transition hover:bg-[#C68B3D] hover:text-[#0E1B2E]";
const secondaryButtonClass =
  "rounded-sm border border-[#0E1B2E] px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E] transition hover:bg-[#0E1B2E] hover:text-[#F6F3EC]";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-widest text-[#0E1B2E]">
        {label} {required && <span className="text-[#C68B3D]">*</span>}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 text-sm text-[#3E4450]/85">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1"
      />
      <span>{label}</span>
    </label>
  );
}
