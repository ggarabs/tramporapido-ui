import Link from "next/link";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/jobs", label: "Vagas" },
  { href: "/about", label: "Sobre" },
];

export default function Header() {
  return (
    <header className="flex min-h-[76px] sm:h-[92px] w-full flex-wrap sm:flex-nowrap items-center justify-between gap-4 p-4 sm:px-6 border-b border-[#a86a09] bg-[#925807] text-white">
      <Link
        href="/"
        aria-label="tramporapido — início"
        className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-white no-underline"
      >
        <span className="grid size-10 place-items-center rounded-lg bg-white text-[#925807] text-[22px] font-bold">
          T
        </span>
        <span>tramporapido</span>
      </Link>

      <nav
        aria-label="Navegação principal"
        className="flex w-full sm:w-auto flex-wrap items-center gap-4 sm:gap-6"
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="text-white/90 no-underline hover:text-white hover:underline transition-colors"
          >
            {label}
          </Link>
        ))}

        <Link
          href="/resume"
          className="grid min-w-[110px] min-h-11 place-items-center border border-white rounded-lg text-white font-medium no-underline hover:bg-white hover:text-[#925807] transition-colors"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
