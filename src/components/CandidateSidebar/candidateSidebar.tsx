"use client";

import Link from "next/link";

interface CandidateLayoutProps {
  active?: "resume" | "jobs";
}

export default function CandidateSidebar({
  active = "resume",
}: CandidateLayoutProps) {
  return (
    <div
      className="min-h-screen bg-white text-ink text-sm leading-5"
      lang="pt-BR"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 p-4 sm:flex-row sm:p-6">
        <aside
          id="candidate-menu"
          className="w-full shrink-0 rounded-lg bg-cream p-4 sm:w-[204px]"
        >
          <p className="m-0 mb-3 font-medium text-muted">Seu próximo passo</p>
          <h2 className="m-0 text-2xl font-semibold text-ink">Olá, Ana</h2>

          <nav aria-label="Área do candidato" className="mt-4 grid gap-3">
            <Link
              href="/vagas"
              aria-current={active === "jobs" ? "page" : undefined}
              className={`flex min-h-11 items-center justify-center rounded-lg border border-ink p-2 text-center font-medium no-underline transition-colors ${
                active === "jobs"
                  ? "bg-ink text-white"
                  : "bg-white text-ink hover:bg-cream/40"
              }`}
            >
              Buscar vagas
            </Link>
            <button
              type="button"
              disabled
              className="flex min-h-11 cursor-not-allowed items-center justify-center rounded-lg border border-default bg-neutral-100 p-2 text-center font-medium text-neutral-400"
            >
              Minhas candidaturas
            </button>
            <Link
              href="/curriculo"
              aria-current={active === "resume" ? "page" : undefined}
              className={`flex min-h-11 items-center justify-center rounded-lg border border-ink p-2 text-center font-medium no-underline transition-colors ${
                active === "resume"
                  ? "bg-ink text-white"
                  : "bg-white text-ink hover:bg-cream/40"
              }`}
            >
              Perfil / Currículo
            </Link>
          </nav>

          <p className="mt-4 mb-0 text-xs leading-4 text-muted">
            <strong className="font-semibold">Currículo atualizado</strong>
            <br />
            Seus dados estão com você.
          </p>
        </aside>
      </div>
    </div>
  );
}
