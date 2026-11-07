"use client";

import { useState } from "react";
import RepresentativeShell from "../vagas/representative-shell";
import styles from "./candidaturas.module.css";

interface Candidatura {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  vaga: string;
  data: string;
  experiencia: string;
  status: "Pendente" | "Em análise" | "Aprovada" | "Rejeitada";
}

const mockCandidaturas: Candidatura[] = [
  {
    id: "1",
    nome: "Ana Beatriz Ramos",
    email: "ana.ramos@email.com",
    telefone: "(11) 98765-4321",
    vaga: "Auxiliar Administrativo",
    data: "28/10/2026",
    experiencia: "2 anos de experiência em rotinas administrativas, gestão de arquivos e atendimento ao público.",
    status: "Em análise",
  },
  {
    id: "2",
    nome: "João Pedro Silveira",
    email: "jp.silveira@email.com",
    telefone: "(11) 97123-4567",
    vaga: "Auxiliar Administrativo",
    data: "29/10/2026",
    experiencia: "Ensino médio completo, facilidade com ferramentas Office e atendimento presencial.",
    status: "Pendente",
  },
  {
    id: "3",
    nome: "Carla Mendes",
    email: "carla.mendes@email.com",
    telefone: "(11) 99876-1122",
    vaga: "Recepcionista Comercial",
    data: "25/10/2026",
    experiencia: "Experiência prévia de 3 anos em receção corporativa e gestão de marcações de salas de reunião.",
    status: "Aprovada",
  },
];

export default function CandidaturasView() {
  const [lista, setLista] = useState<Candidatura[]>(mockCandidaturas);
  const [filtroStatus, setFiltroStatus] = useState("Todas");
  const [candidaturaSelecionada, setCandidaturaSelecionada] = useState<Candidatura | null>(null);

  const filtros = ["Todas", "Pendente", "Em análise", "Aprovada", "Rejeitada"];

  const candidaturasFiltradas = lista.filter((item) => {
    if (filtroStatus === "Todas") return true;
    return item.status === filtroStatus;
  });

  function alterarStatus(novoStatus: Candidatura["status"]) {
    if (!candidaturaSelecionada) return;

    setLista((prev) =>
      prev.map((c) =>
        c.id === candidaturaSelecionada.id ? { ...c, status: novoStatus } : c
      )
    );
    setCandidaturaSelecionada((prev) => (prev ? { ...prev, status: novoStatus } : null));
  }

  return (
    <RepresentativeShell>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Acompanhamento de Candidaturas</h1>
          <p className={styles.hint}>
            Analise os perfis recebidos e gira as etapas de seleção de cada profissional.
          </p>
        </div>

        {/* Filtros rápidos em pílulas */}
        <div className={styles.filterPills}>
          {filtros.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.pill} ${filtroStatus === f ? styles.pillActive : ""}`}
              onClick={() => setFiltroStatus(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Lista de candidatos */}
        <div className={styles.candidatesGrid}>
          {candidaturasFiltradas.map((cand) => (
            <article key={cand.id} className={styles.candidateCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.candidateName}>{cand.nome}</h2>
                  <p className={styles.vagaText}>{cand.vaga}</p>
                </div>
                <span
                  className={`${styles.statusBadge} ${
                    cand.status === "Aprovada"
                      ? styles.badgeSuccess
                      : cand.status === "Rejeitada"
                      ? styles.badgeDanger
                      : cand.status === "Em análise"
                      ? styles.badgeWarning
                      : styles.badgeNeutral
                  }`}
                >
                  {cand.status}
                </span>
              </div>

              <p className={styles.dateText}>Inscrição a: {cand.data}</p>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => setCandidaturaSelecionada(cand)}
                >
                  Ver candidatura e perfil
                </button>
              </div>
            </article>
          ))}

          {candidaturasFiltradas.length === 0 && (
            <p className={styles.empty}>Nenhuma candidatura encontrada para este filtro.</p>
          )}
        </div>

        {/* Modal / Popup de Detalhes da Candidatura */}
        {candidaturaSelecionada && (
          <div
            className={styles.modalOverlay}
            onClick={() => setCandidaturaSelecionada(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h2>{candidaturaSelecionada.nome}</h2>
                  <p className={styles.hint}>{candidaturaSelecionada.vaga}</p>
                </div>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setCandidaturaSelecionada(null)}
                  aria-label="Fechar popup"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.detailGroup}>
                  <label>E-mail</label>
                  <p>{candidaturaSelecionada.email}</p>
                </div>

                <div className={styles.detailGroup}>
                  <label>Telefone / WhatsApp</label>
                  <p>{candidaturaSelecionada.telefone}</p>
                </div>

                <div className={styles.detailGroup}>
                  <label>Resumo de Experiência</label>
                  <p>{candidaturaSelecionada.experiencia}</p>
                </div>

                <div className={styles.detailGroup}>
                  <label>Alterar Estado do Processo</label>
                  <div className={styles.statusButtonsGroup}>
                    <button
                      type="button"
                      className={`${styles.statusBtn} ${
                        candidaturaSelecionada.status === "Em análise" ? styles.selectedWarning : ""
                      }`}
                      onClick={() => alterarStatus("Em análise")}
                    >
                      Em análise
                    </button>
                    <button
                      type="button"
                      className={`${styles.statusBtn} ${
                        candidaturaSelecionada.status === "Aprovada" ? styles.selectedSuccess : ""
                      }`}
                      onClick={() => alterarStatus("Aprovada")}
                    >
                      Aprovar
                    </button>
                    <button
                      type="button"
                      className={`${styles.statusBtn} ${
                        candidaturaSelecionada.status === "Rejeitada" ? styles.selectedDanger : ""
                      }`}
                      onClick={() => alterarStatus("Rejeitada")}
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={() => setCandidaturaSelecionada(null)}
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