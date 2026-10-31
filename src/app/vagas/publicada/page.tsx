import type { Metadata } from "next";
import RepresentativeShell from "../representative-shell";
import styles from "../registrar/registration.module.css";

export const metadata: Metadata = {
  title: "Vaga publicada | tramporapido",
  description: "Resumo da oportunidade publicada e ações de gerenciamento.",
};

// Dados demonstrativos do frame 4:18595; esta página não publica vagas.
export default function PublishedJobPage() {
  return (
    <RepresentativeShell published>
      <h1>✓ Vaga publicada</h1>
      <div className={styles.publishedColumns}>
        <section className={`${styles.card} ${styles.summary}`} aria-labelledby="job-title">
          <h2 id="job-title">Auxiliar administrativo</h2>
          <p className={styles.muted}>Nº 1024 • CLT • período integral • Presencial</p>
          <p>Data: 18/10/2026&nbsp; • &nbsp;Salário: R$ 1.900 / mês</p>
          <p>Benefícios: vale-transporte e vale-alimentação</p>
          <p>Centro • São Paulo / SP<br />Rua Exemplo, 120 — CEP 01000-000</p>
          <h3>Descrição e requisitos</h3>
          <p>Organize documentos, atenda clientes e apoie rotinas administrativas. Ensino médio completo e organização.</p>
        </section>
        <nav className={styles.jobActions} aria-label="Ações da oportunidade">
          {["Acompanhar candidaturas", "Alterar vaga", "Informações de visualizações",
            "Dúvidas / comentários", "Encerrar vaga"].map((label, index) => (
            <button key={label} type="button" disabled title="Disponível em uma próxima etapa"
              className={index === 0 ? styles.primary : undefined}>{label}</button>
          ))}
        </nav>
      </div>
      <button type="button" className={styles.management} disabled title="Página ainda indisponível">
        Gerenciamento de vagas
      </button>
    </RepresentativeShell>
  );
}
