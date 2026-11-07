"use client";

import { useMemo, useState } from "react";
import CandidateShell from "../curriculo/shell";
import styles from "./registrar/registration.module.css";

const jobs = [
  { id: 1, title: "Auxiliar administrativo", company: "Empresa Horizonte", modality: "Presencial", distance: 1.8, salary: 1900, contract: "CLT", district: "Centro", address: "Rua Exemplo, 120 — CEP 01000-000", description: "Organize documentos, atenda clientes e apoie as rotinas administrativas. Ensino médio completo e organização.", published: "2026-10-18" },
  { id: 2, title: "Atendente de loja", company: "Mercado Central", modality: "Presencial", distance: 1.4, salary: 1750, contract: "CLT", district: "Centro", address: "Rua do Comércio, 45", description: "Atenda clientes, organize produtos e apoie a operação diária da loja.", published: "2026-10-16" },
  { id: 3, title: "Auxiliar de estoque", company: "Logística Sul", modality: "Presencial", distance: 4.2, salary: 1850, contract: "CLT", district: "Vila Nova", address: "Avenida Industrial, 800", description: "Receba mercadorias, organize o estoque e acompanhe a separação de pedidos.", published: "2026-10-14" },
];
const money = (amount: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(amount);

export default function AvailableJobsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [distance, setDistance] = useState("any");
  const [modality, setModality] = useState("any");
  const [date, setDate] = useState("any");
  const filtered = useMemo(() => jobs.filter(job =>
    (distance === "any" || job.distance <= Number(distance)) &&
    (modality === "any" || job.modality === modality) &&
    (date === "any" || job.published >= date)), [distance, modality, date]);
  const selected = jobs.find(job => job.id === selectedId);

  return <CandidateShell active="jobs">
    <h1>Vagas</h1>
    <div className={styles.availableLayout}>
      <section className={styles.availableList} aria-label="Lista de vagas">
        <button type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}>Filtrar vagas</button>
        {filtersOpen && <fieldset className={styles.jobFilters}>
          <legend>Filtros</legend>
          <label>Distância<select value={distance} onChange={event => setDistance(event.target.value)}><option value="any">Qualquer distância</option><option value="2">Até 2 km</option><option value="5">Até 5 km</option></select></label>
          <label>Tipo de vaga<select value={modality} onChange={event => setModality(event.target.value)}><option value="any">Todos os tipos</option><option>Presencial</option><option>Híbrido</option><option>Remoto</option></select></label>
          <label>Publicada desde<select value={date} onChange={event => setDate(event.target.value)}><option value="any">Qualquer data</option><option value="2026-10-16">Últimos dias</option><option value="2026-10-18">Hoje</option></select></label>
          <button type="button" onClick={() => { setDistance("any"); setModality("any"); setDate("any"); }}>Limpar filtros</button>
        </fieldset>}
        <p className={styles.muted} aria-live="polite">{filtered.length} {filtered.length === 1 ? "vaga encontrada" : "vagas encontradas"}</p>
        {filtered.map(job => <button type="button" key={job.id} aria-pressed={selectedId === job.id} className={`${styles.jobCard} ${selectedId === job.id ? styles.jobCardSelected : ""}`} onClick={() => setSelectedId(job.id)}>
          <strong>{job.title}</strong><span>{job.company}</span><span>{job.modality} • até {job.distance} km</span><span>{money(job.salary)} / mês&nbsp; ↗</span>
        </button>)}
        {!filtered.length && <p>Nenhuma vaga encontrada. Tente alterar os filtros.</p>}
      </section>
      <div className={styles.jobDetailColumn}>
        {selected ? <>
          <section className={styles.card} aria-label="Detalhes da vaga">
            <h2>{selected.title}</h2><p>{selected.company} • {selected.contract} • {selected.modality}</p>
            <p>{money(selected.salary)} / mês</p><p>{selected.description}</p>
          </section>
          <section className={styles.card} aria-labelledby="job-location"><h3 id="job-location">Localização</h3><p>{selected.district} • a aproximadamente {selected.distance} km</p><p>{selected.address}</p></section>
          <div className={styles.jobApplyActions}><button type="button" className={styles.resumeSecondary} disabled>Enviar dúvida</button><button type="button" className={styles.resumePrimary} disabled title="Candidaturas disponíveis em uma próxima etapa">Me candidatar</button></div>
        </> : <>
          <section className={styles.card}><h2>Selecione uma vaga</h2><p>Clique em um card à esquerda para consultar requisitos, remuneração e localização.</p></section>
          <h2>Buscas e filtros</h2><p>Distância, tipo de vaga e data de publicação ajudam você a encontrar oportunidades.</p>
          <button type="button" className={styles.resumePrimary} onClick={() => filtered.length && setSelectedId(filtered[0].id)}>Abrir primeira vaga</button>
        </>}
      </div>
    </div>
  </CandidateShell>;
}
