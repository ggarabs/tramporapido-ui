"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { taskApi, type Task } from "@/lib/api";

const modalityLabel: Record<Task["modality"], string> = {
  IN_PERSON: "Presencial",
  HOME_OFFICE: "Remoto",
  HYBRID: "Híbrido",
};

export default function JobsPage() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    taskApi
      .list()
      .then(setJobs)
      .catch((cause: unknown) =>
        setError(
          cause instanceof Error
            ? cause.message
            : "Não foi possível carregar as vagas.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const filtros = ["Todas", "Presencial", "Remoto", "Integral", "Manhã"];

  const vagasFiltradas = jobs.filter((vaga) => {
    const matchBusca =
      vaga.title.toLowerCase().includes(search.toLowerCase()) ||
      vaga.city.toLowerCase().includes(search.toLowerCase());

    if (activeFilter === "Todas") return matchBusca;
    if (activeFilter === modalityLabel[vaga.modality]) return matchBusca;
    return false;
  });

  return (
    <div className="flex w-full flex-col gap-4.5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="m-0 text-2xl font-semibold leading-8 text-ink">
            Oportunidades
          </h1>
          <p className="mt-1 mb-0 text-[13px] text-neutral-600">
            Consulte e acompanhe as vagas registadas no sistema.
          </p>
        </div>
        <Link
          href="/jobs/register"
          className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white no-underline transition-all hover:brightness-92 w-full sm:w-auto"
        >
          + Nova vaga
        </Link>
      </div>

      <div className="w-full">
        <input
          type="text"
          className="box-border h-11 w-full rounded-lg border border-default bg-white px-3.5 py-2.5 text-[14px] text-muted outline-none focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-2"
          placeholder="Buscar por cargo, palavra-chave ou cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 touch-pan-x">
        {filtros.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              type="button"
              className={`cursor-pointer whitespace-nowrap rounded-[20px] border px-3.5 py-[7px] text-[13px] font-medium transition-colors ${
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-ink bg-white text-ink hover:bg-cream/40"
              }`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          );
        })}
      </div>

      {loading && (
        <p role="status" className="text-sm text-neutral-500">
          Carregando oportunidades…
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-rose-600 font-medium">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3.5">
        {vagasFiltradas.map((vaga) => (
          <article
            key={vaga.id}
            className="flex flex-col gap-2.5 rounded-lg border border-default bg-white p-[18px]"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="m-0 text-lg font-semibold text-ink">
                {vaga.title}
              </h2>
              <span className="shrink-0 rounded bg-emerald-50 px-2 py-[3px] text-[11px] font-bold uppercase text-emerald-700">
                {vaga.status === "OPEN" ? "Ativa" : vaga.status}
              </span>
            </div>

            <p className="m-0 text-[13px] leading-[19px] text-neutral-600">
              {vaga.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-wrap gap-3 pt-2.5 border-t border-cream">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-md border border-neutral-200 bg-[#fbf6ee] px-2 py-1 text-xs text-ink">
                  {modalityLabel[vaga.modality]}
                </span>
                <span className="rounded-md border border-neutral-200 bg-[#fbf6ee] px-2 py-1 text-xs text-ink">
                  {vaga.city}
                  {vaga.neighborhood ? `, ${vaga.neighborhood}` : ""}
                </span>
                {vaga.income != null && (
                  <span className="rounded-md border border-ink bg-[#fff9ed] px-2 py-1 text-xs font-semibold text-ink">
                    {vaga.income.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/jobs/${vaga.id}`}
                  className="box-border inline-flex min-h-[36px] sm:min-h-[36px] w-full sm:w-auto items-center justify-center rounded-md border border-ink bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink no-underline transition-colors hover:bg-cream/40"
                >
                  Detalhes
                </Link>
                <Link
                  href="/candidaturas"
                  className="box-border inline-flex min-h-[36px] sm:min-h-[36px] w-full sm:w-auto items-center justify-center rounded-md border border-ink bg-ink px-3.5 py-1.5 text-[13px] font-semibold text-white no-underline transition-all hover:brightness-92"
                >
                  Candidaturas
                </Link>
              </div>
            </div>
          </article>
        ))}

        {!loading && !error && vagasFiltradas.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-neutral-500">
            Nenhuma oportunidade encontrada para a sua busca.
          </p>
        )}
      </div>
    </div>
  );
}
