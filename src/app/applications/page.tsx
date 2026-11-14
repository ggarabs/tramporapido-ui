"use client";

import { useState } from "react";
import RepresentativeShell from "../vagas/representative-shell";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  job: string;
  date: string;
  experience: string;
  status: "Pendente" | "Em análise" | "Aprovada" | "Rejeitada";
}

export default function Applications() {
  const [list, setList] = useState<Application[]>();
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [selected, setSelected] = useState<Application | null>(null);

  const filters = ["Todas", "Pendente", "Em análise", "Aprovada", "Rejeitada"];

  const filtered = list?.filter((item) => {
    if (statusFilter === "Todas") return true;
    return item.status === statusFilter;
  });

  function changeStatus(newStatus: Application["status"]) {
    if (!selected) return;

    setList((prev) =>
      prev?.map((c) =>
        c.id === selected.id ? { ...c, status: newStatus } : c,
      ),
    );
    setSelected((prev) => (prev ? { ...prev, status: newStatus } : null));
  }

  return (
    <RepresentativeShell>
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col">
          <h1 className="m-0 text-2xl font-semibold text-ink">
            Acompanhamento de Candidaturas
          </h1>
          <p className="mt-1 mb-0 text-xs text-neutral-600">
            Analise os perfis recebidos e gira as etapas de seleção de cada
            profissional.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 touch-pan-x">
          {filters.map((f) => {
            const isActive = statusFilter === f;
            return (
              <button
                key={f}
                type="button"
                className={`cursor-pointer whitespace-nowrap rounded-full border border-ink px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-ink text-white"
                    : "bg-white text-ink hover:bg-cream/40"
                }`}
                onClick={() => setStatusFilter(f)}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered?.map((cand) => {
            const badgeClass =
              cand.status === "Aprovada"
                ? "bg-emerald-50 text-emerald-700"
                : cand.status === "Rejeitada"
                  ? "bg-rose-50 text-rose-700"
                  : cand.status === "Em análise"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-neutral-100 text-neutral-700";

            return (
              <article
                key={cand.id}
                className="flex flex-col justify-between gap-3 rounded-lg border border-default bg-white p-4.5 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="m-0 text-base font-semibold text-ink">
                      {cand.name}
                    </h2>
                    <p className="mt-0.5 mb-0 text-xs text-neutral-600">
                      {cand.job}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-bold uppercase ${badgeClass}`}
                  >
                    {cand.status}
                  </span>
                </div>

                <p className="m-0 text-xs text-neutral-500">
                  Inscrição a: {cand.date}
                </p>

                <div className="mt-1.5">
                  <button
                    type="button"
                    className="inline-flex min-h-10 w-full cursor-pointer items-center justify-center rounded-md border border-ink bg-ink text-xs font-semibold text-white transition-all hover:brightness-95"
                    onClick={() => setSelected(cand)}
                  >
                    Ver candidatura e perfil
                  </button>
                </div>
              </article>
            );
          })}

          {filtered?.length === 0 && (
            <p className="col-span-full m-0 py-8 text-center text-neutral-500">
              Nenhuma candidatura encontrada para este filtro.
            </p>
          )}
        </div>

        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-cream p-5">
                <div>
                  <h2 className="m-0 text-xl font-semibold text-ink">
                    {selected.name}
                  </h2>
                  <p className="mt-1 mb-0 text-xs text-neutral-600">
                    {selected.job}
                  </p>
                </div>
                <button
                  type="button"
                  className="cursor-pointer border-none bg-transparent p-1 text-lg text-neutral-600 hover:text-muted"
                  onClick={() => setSelected(null)}
                  aria-label="Fechar popup"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3.5 p-5">
                <div className="flex flex-col">
                  <label className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                    E-mail
                  </label>
                  <p className="m-0 text-sm leading-5 text-muted">
                    {selected.email}
                  </p>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                    Telefone / WhatsApp
                  </label>
                  <p className="m-0 text-sm leading-5 text-muted">
                    {selected.phone}
                  </p>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                    Resumo de Experiência
                  </label>
                  <p className="m-0 text-sm leading-5 text-muted">
                    {selected.experience}
                  </p>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 block text-xs font-semibold uppercase text-neutral-500">
                    Alterar Estado do Processo
                  </label>
                  <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      className={`flex-1 cursor-pointer rounded-md border p-2.5 text-xs font-semibold transition-colors ${
                        selected.status === "Em análise"
                          ? "border-amber-700 bg-amber-700 text-white"
                          : "border-default bg-white text-muted hover:bg-neutral-50"
                      }`}
                      onClick={() => changeStatus("Em análise")}
                    >
                      Em análise
                    </button>
                    <button
                      type="button"
                      className={`flex-1 cursor-pointer rounded-md border p-2.5 text-xs font-semibold transition-colors ${
                        selected.status === "Aprovada"
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-default bg-white text-muted hover:bg-neutral-50"
                      }`}
                      onClick={() => changeStatus("Aprovada")}
                    >
                      Aprovar
                    </button>
                    <button
                      type="button"
                      className={`flex-1 cursor-pointer rounded-md border p-2.5 text-xs font-semibold transition-colors ${
                        selected.status === "Rejeitada"
                          ? "border-rose-700 bg-rose-700 text-white"
                          : "border-default bg-white text-muted hover:bg-neutral-50"
                      }`}
                      onClick={() => changeStatus("Rejeitada")}
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-cream p-4">
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-md border border-ink bg-ink px-5 py-2.5 font-semibold text-white transition-all hover:brightness-95 sm:w-auto"
                  onClick={() => setSelected(null)}
                >
                  Concluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RepresentativeShell>
  );
}
