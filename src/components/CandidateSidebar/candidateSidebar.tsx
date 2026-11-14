"use client";

import Link from "next/link";

interface CandidateSidebarProps {
  active?: "resume" | "jobs";
}

export default function CandidateSidebar({
  active = "resume",
}: CandidateSidebarProps) {
  return (
    <aside
      id="candidate-menu"
      className="w-full shrink-0 rounded-lg bg-[#ffeed2] p-4 sm:w-[204px]"
      lang="pt-BR"
    >
      <p className="m-0 mb-3 font-medium text-[#2d0f0f]">Seu próximo passo</p>
      <h2 className="m-0 text-2xl font-semibold text-[#925807]">Olá, Ana</h2>

      <nav aria-label="Área do candidato" className="mt-4 grid gap-3">
        <Link
          href="/vagas"
          aria-current={active === "jobs" ? "page" : undefined}
          className={`flex min-h-[44px] items-center justify-center rounded-lg border p-2 text-center font-medium no-underline transition-colors ${
            active === "jobs"
              ? "border-[#925807] bg-[#925807] text-white"
              : "border-[#925807] bg-white text-[#925807] hover:bg-[#ffeed2]/60"
          }`}
        >
          Buscar vagas
        </Link>

        <button
          type="button"
          disabled
          className="flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100 p-2 text-center font-medium text-neutral-400"
        >
          Minhas candidaturas
        </button>

        <Link
          href="/curriculo"
          aria-current={active === "resume" ? "page" : undefined}
          className={`flex min-h-[44px] items-center justify-center rounded-lg border p-2 text-center font-medium no-underline transition-colors ${
            active === "resume"
              ? "border-[#925807] bg-[#925807] text-white"
              : "border-[#925807] bg-white text-[#925807] hover:bg-[#ffeed2]/60"
          }`}
        >
          Perfil / Currículo
        </Link>
      </nav>

      <p className="mt-4 mb-0 text-xs leading-4 text-[#2d0f0f]">
        <strong className="font-semibold">Currículo atualizado</strong>
        <br />
        Seus dados estão com você.
      </p>
    </aside>
  );
}
