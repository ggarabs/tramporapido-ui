"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RepresentativeShell from "./representative-shell";
import styles from "./vagas.module.css";
import { taskApi, type Task } from "@/lib/api";

const modalityLabel: Record<Task["modality"], string> = {
  IN_PERSON: "Presencial",
  HOME_OFFICE: "Remoto",
  HYBRID: "Híbrido",
};

export default function VagasPage() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [vagas, setVagas] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    taskApi
      .list()
      .then(setVagas)
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

  const vagasFiltradas = vagas.filter((vaga) => {
    const matchBusca =
      vaga.title.toLowerCase().includes(busca.toLowerCase()) ||
      vaga.city.toLowerCase().includes(busca.toLowerCase());

    if (filtroAtivo === "Todas") return matchBusca;
    if (filtroAtivo === modalityLabel[vaga.modality]) return matchBusca;
    return false;
  });

  return (
    <RepresentativeShell>
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <div>
            <h1>Oportunidades</h1>
            <p className={styles.subtext}>
              Consulte e acompanhe as vagas registadas no sistema.
            </p>
          </div>
          <Link href="/jobs/register" className={styles.btnNewJob}>
            + Nova vaga
          </Link>
        </div>

        {/* Barra de pesquisa mobile/desktop */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por cargo, palavra-chave ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* Filtros em pílulas com scroll horizontal fluido no telemóvel */}
        <div className={styles.filterPills}>
          {filtros.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.pill} ${filtroAtivo === f ? styles.pillActive : ""}`}
              onClick={() => setFiltroAtivo(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Listagem de cartões */}
        {loading && <p role="status">Carregando oportunidades…</p>}
        {error && <p role="alert">{error}</p>}
        <div className={styles.cardsList}>
          {vagasFiltradas.map((vaga) => (
            <article key={vaga.id} className={styles.jobCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{vaga.title}</h2>
                <span className={styles.statusTag}>
                  {vaga.status === "OPEN" ? "Ativa" : vaga.status}
                </span>
              </div>

              <p className={styles.cardDesc}>{vaga.description}</p>

              <div className={styles.cardFooter}>
                <div className={styles.badges}>
                  <span className={styles.badge}>
                    {modalityLabel[vaga.modality]}
                  </span>
                  <span className={styles.badge}>
                    {vaga.city}
                    {vaga.neighborhood ? `, ${vaga.neighborhood}` : ""}
                  </span>
                  {vaga.income != null && (
                    <span className={styles.badgeSalary}>
                      {vaga.income.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  )}
                </div>

                <div className={styles.cardActions}>
                  <Link href={`/jobs/${vaga.id}`} className={styles.btnDetails}>
                    Detalhes
                  </Link>
                  <Link href="/candidaturas" className={styles.btnApplications}>
                    Candidaturas
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {!loading && !error && vagasFiltradas.length === 0 && (
            <p className={styles.emptyState}>
              Nenhuma oportunidade encontrada para a sua busca.
            </p>
          )}
        </div>
      </div>
    </RepresentativeShell>
  );
}
