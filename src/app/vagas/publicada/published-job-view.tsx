"use client";

import Link from "next/link";
import RepresentativeShell from "../representative-shell";
import styles from "../registrar/registration.module.css";

const defaultJob = {
  title: "Auxiliar administrativo",
  period: "Integral",
  date: "18/10/2026",
  modality: "Presencial",
  state: "SP",
  city: "São Paulo",
  district: "Centro",
  address: "Rua Exemplo, 120",
  salary: "1.900,00",
  benefits: "vale-transporte e vale-alimentação",
  description:
    "Organize documentos, atenda clientes e apoie rotinas administrativas. Ensino médio completo e organização.",
};

export default function PublishedJobView() {
  return (
    <RepresentativeShell>
      <h1>Vaga publicada</h1>
      <p className={styles.hint}>
        Esta oportunidade já se encontra visível para candidatos na plataforma.
      </p>

      <div className={styles.publishedColumns}>
        {/* Coluna 1: Resumo com os dados da vaga */}
        <section className={`${styles.card} ${styles.summary}`} aria-labelledby="summary-heading">
          <h2 id="summary-heading">{defaultJob.title}</h2>

          <div>
            <span className={styles.hint}>Período</span>
            <p><strong>{defaultJob.period}</strong></p>
          </div>

          <div>
            <span className={styles.hint}>Modalidade e Local</span>
            <p>
              <strong>{defaultJob.modality}</strong> — {defaultJob.city}/{defaultJob.state} ({defaultJob.district})
            </p>
            <p className={styles.hint}>{defaultJob.address}</p>
          </div>

          <div>
            <span className={styles.hint}>Salário</span>
            <p><strong>R$ {defaultJob.salary}</strong></p>
          </div>

          <div>
            <span className={styles.hint}>Benefícios</span>
            <p>{defaultJob.benefits}</p>
          </div>

          <div>
            <span className={styles.hint}>Descrição e requisitos</span>
            <p>{defaultJob.description}</p>
          </div>

          <p className={styles.hint}>Publicada em: {defaultJob.date}</p>
        </section>

        {/* Coluna 2: Ações de Gestão */}
        <aside className={`${styles.card} ${styles.jobActions} ${styles.management}`}>
          <h3>Gestão da vaga</h3>
          <p className={styles.hint}>
            Acompanhe as candidaturas ou cadastre uma nova vaga.
          </p>

          <Link href="/candidaturas" className={styles.primary}>
            Ver candidaturas (0)
          </Link>

          <Link href="/vagas/registrar">
            Cadastrar outra vaga
          </Link>

          <Link href="/vagas">
            Ir para listagem de vagas
          </Link>
        </aside>
      </div>
    </RepresentativeShell>
  );
}