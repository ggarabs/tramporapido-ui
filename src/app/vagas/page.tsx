"use client";

import { useState } from "react";
import Link from "next/link";
import RepresentativeShell from "./representative-shell";
import styles from "./vagas.module.css";

const mockVagas = [
  {
    id: "1",
    titulo: "Auxiliar Administrativo",
    periodo: "Integral",
    modalidade: "Presencial",
    local: "São Paulo, SP",
    salario: "R$ 1.900,00",
    descricao: "Organize documentos, atenda clientes e apoie rotinas administrativas gerais da empresa.",
    status: "Ativa",
  },
  {
    id: "2",
    titulo: "Recepcionista Comercial",
    periodo: "Manhã",
    modalidade: "Presencial",
    local: "São Paulo, SP",
    salario: "R$ 1.650,00",
    descricao: "Recebimento de visitantes, encaminhamento de correspondências e atendimento telefónico.",
    status: "Ativa",
  },
  {
    id: "3",
    titulo: "Assistente de Atendimento",
    periodo: "Flexível",
    modalidade: "Remoto",
    local: "Brasil",
    salario: "R$ 2.100,00",
    descricao: "Suporte e atendimento direto via chat e e-mail a clientes cadastrados no portal.",
    status: "Ativa",
  },
];

export default function VagasPage() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todas");
  const [busca, setBusca] = useState("");

  const filtros = ["Todas", "Presencial", "Remoto", "Integral", "Manhã"];

  const vagasFiltradas = mockVagas.filter((vaga) => {
    const matchBusca =
      vaga.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      vaga.local.toLowerCase().includes(busca.toLowerCase());

    if (filtroAtivo === "Todas") return matchBusca;
    if (filtroAtivo === vaga.modalidade || filtroAtivo === vaga.periodo) return matchBusca;
    return false;
  });

  return (
    <RepresentativeShell>
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <div>
            <h1>Oportunidades</h1>
            <p className={styles.subtext}>Consulte e acompanhe as vagas registadas no sistema.</p>
          </div>
          <Link href="/vagas/registrar" className={styles.btnNewJob}>
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
        <div className={styles.cardsList}>
          {vagasFiltradas.map((vaga) => (
            <article key={vaga.id} className={styles.jobCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{vaga.titulo}</h2>
                <span className={styles.statusTag}>{vaga.status}</span>
              </div>

              <p className={styles.cardDesc}>{vaga.descricao}</p>

              <div className={styles.cardFooter}>
                <div className={styles.badges}>
                  <span className={styles.badge}>{vaga.modalidade}</span>
                  <span className={styles.badge}>{vaga.periodo}</span>
                  <span className={styles.badge}>{vaga.local}</span>
                  <span className={styles.badgeSalary}>{vaga.salario}</span>
                </div>

                <div className={styles.cardActions}>
                  <Link href={`/vagas/${vaga.id}`} className={styles.btnDetails}>
                    Detalhes
                  </Link>
                  <Link href="/candidaturas" className={styles.btnApplications}>
                    Candidaturas
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {vagasFiltradas.length === 0 && (
            <p className={styles.emptyState}>Nenhuma oportunidade encontrada para a sua busca.</p>
          )}
        </div>
      </div>
    </RepresentativeShell>
  );
}