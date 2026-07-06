import Link from "next/link";

const announcements = [
  { date: "12 JUL", text: "Registration for the 2026 cohort closes on 31 July." },
  { date: "08 JUL", text: "Masterclass on structuring a business case — recording live now." },
  { date: "02 JUL", text: "Regional jury panels for North & East, West & South confirmed." },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Submissions", href: "/submissions" },
  { label: "RR1 Schedule", href: "/schedule" },
  { label: "FAQs", href: "/faq" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#0E1B2E]/10 bg-[#F6F3EC]/95 backdrop-blur">
      <section className="overflow-hidden border-b border-[#F6F3EC]/10 bg-[#0E1B2E] py-2">
        <div className="flex w-max animate-ticker items-center gap-8 whitespace-nowrap px-6">
          {[...announcements, ...announcements].map((announcement, index) => (
            <span
              key={`${announcement.text}-${index}`}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#F6F3EC]/80"
            >
              <span className="text-[#C68B3D]">{announcement.date}</span>
              <span>{announcement.text}</span>
            </span>
          ))}
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-serif text-base font-semibold tracking-tight text-[#0E1B2E] md:text-lg"
        >
          India Business Case Programme
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative font-mono text-[11px] uppercase tracking-widest text-[#3E4450] transition hover:text-[#0E1B2E]
                         after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#C68B3D]
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/register"
          className="shrink-0 rounded-sm bg-[#0E1B2E] px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-[#F6F3EC] transition hover:bg-[#C68B3D] hover:text-[#0E1B2E] md:px-5 md:text-[11px]"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
