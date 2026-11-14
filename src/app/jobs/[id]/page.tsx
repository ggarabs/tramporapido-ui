"use client";

import { useState, use } from "react";
import Link from "next/link";
import RepresentativeShell from "../representative-shell";
import styles from "../registrar/registration.module.css";

interface Duvida {
  id: string;
  pergunta: string;
  resposta?: string;
}

interface Candidatura {
  id: string;
  candidateId: string;
  status: string;
}

export default function VagaDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [activeView, setActiveView] = useState<
    "resumo" | "candidaturas" | "duvidas"
  >("resumo");
  const [novaPergunta, setNovaPergunta] = useState("");
  const [duvidas, setDuvidas] = useState<Duvida[]>([
    {
      id: "1",
      pergunta: "Qual a carga horária semanal presencial no modelo híbrido?",
      resposta: "Serão 3 dias no escritório (Centro) e 2 dias em home office.",
    },
  ]);

  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([
    {
      id: "946160bf-f5a3-47ea-b2d8-8ff78b662ff1",
      candidateId: "11111111-1111-1111-1111-111111111111",
      status: "PENDING",
    },
  ]);

  function handleEnviarPergunta(e: React.FormEvent) {
    e.preventDefault();
    if (!novaPergunta.trim()) return;
    setDuvidas([
      ...duvidas,
      { id: String(Date.now()), pergunta: novaPergunta.trim() },
    ]);
    setNovaPergunta("");
  }

  function handleAlterarStatus(appId: string, novoStatus: string) {
    setCandidaturas(
      candidaturas.map((c) =>
        c.id === appId ? { ...c, status: novoStatus } : c,
      ),
    );
  }

  return (
    <RepresentativeShell>
      <h1>Gerenciamento da vaga</h1>
      <p className={styles.hint}>
        Nº {id.substring(0, 8)} • Informações detalhadas da oportunidade
      </p>

      <div className={styles.publishedColumns}>
        {/* Coluna Principal: Alterna entre Resumo, Candidaturas e Dúvidas */}
        <section className={`${styles.card} ${styles.summary}`}>
          {activeView === "resumo" && (
            <>
              <h2>Auxiliar administrativo</h2>
              <p className={styles.muted}>
                Nº 1024 • CLT • Período integral • Presencial
              </p>
              <p>Salário: R$ 1.900,00 / mês</p>
              <p>Centro • São Paulo / SP</p>
              <h3>Descrição e requisitos</h3>
              <p>
                Organize documentos, atenda clientes e apoie rotinas
                administrativas. Ensino médio completo e organização.
              </p>
            </>
          )}

          {activeView === "candidaturas" && (
            <>
              <h2>Candidaturas recebidas</h2>
              <p className={styles.muted}>
                Total: {candidaturas.length} inscrito(s)
              </p>
              <div style={{ display: "grid", gap: "12px", width: "100%" }}>
                {candidaturas.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      border: "1px solid #808080",
                      padding: "12px",
                      borderRadius: "8px",
                    }}
                  >
                    <p>
                      <strong>Candidato:</strong>{" "}
                      {c.candidateId.substring(0, 8)}...
                    </p>
                    <p>
                      <strong>Status:</strong> {c.status}
                    </p>
                    <div
                      style={{ display: "flex", gap: "8px", marginTop: "8px" }}
                    >
                      <button
                        type="button"
                        className={styles.primary}
                        onClick={() => handleAlterarStatus(c.id, "APPROVED")}
                      >
                        Aprovar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAlterarStatus(c.id, "REJECTED")}
                      >
                        Rejeitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeView === "duvidas" && (
            <>
              <h2>Dúvidas e comentários</h2>
              <form
                onSubmit={handleEnviarPergunta}
                style={{ display: "grid", gap: "8px", width: "100%" }}
              >
                <label htmlFor="duvida">Enviar pergunta ao contratante:</label>
                <input
                  id="duvida"
                  type="text"
                  placeholder="Escreva sua dúvida aqui..."
                  value={novaPergunta}
                  onChange={(e) => setNovaPergunta(e.target.value)}
                  style={{ width: "100%" }}
                />
                <button
                  type="submit"
                  className={styles.primary}
                  style={{ width: "160px" }}
                >
                  Enviar dúvida
                </button>
              </form>

              <h3 style={{ marginTop: "16px" }}>Perguntas registradas</h3>
              <div style={{ display: "grid", gap: "12px", width: "100%" }}>
                {duvidas.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      border: "1px solid #808080",
                      padding: "12px",
                      borderRadius: "8px",
                    }}
                  >
                    <p>
                      <strong>P:</strong> {d.pergunta}
                    </p>
                    {d.resposta ? (
                      <p className={styles.muted} style={{ marginTop: "6px" }}>
                        <strong>R:</strong> {d.resposta}
                      </p>
                    ) : (
                      <p
                        className={styles.muted}
                        style={{ fontStyle: "italic", marginTop: "6px" }}
                      >
                        Aguardando resposta do contratante.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Coluna Lateral: Botões de Ação do Design System */}
        <nav className={styles.jobActions} aria-label="Ações da oportunidade">
          <button
            type="button"
            className={activeView === "resumo" ? styles.primary : undefined}
            onClick={() => setActiveView("resumo")}
          >
            Resumo da vaga
          </button>
          <button
            type="button"
            className={
              activeView === "candidaturas" ? styles.primary : undefined
            }
            onClick={() => setActiveView("candidaturas")}
          >
            Acompanhar candidaturas
          </button>
          <button
            type="button"
            className={activeView === "duvidas" ? styles.primary : undefined}
            onClick={() => setActiveView("duvidas")}
          >
            Dúvidas / comentários
          </button>
          <Link
            href="/jobs"
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            Voltar para lista
          </Link>
        </nav>
      </div>
    </RepresentativeShell>
  );
}
