"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import CandidateShell from "./shell";
import styles from "../vagas/registrar/registration.module.css";

type Education = { course: string; level: string; institution: string; start: string; end: string; ongoing: boolean };
type Experience = { role: string; company: string; current: boolean; start: string; end: string; modality: string; description: string };
type Resume = { education: Education[]; skills: string[]; experiences: Experience[] };
const emptyEducation: Education = { course: "", level: "", institution: "", start: "", end: "", ongoing: false };
const emptyExperience: Experience = { role: "", company: "", current: false, start: "", end: "", modality: "", description: "" };
const example: Resume = {
  education: [{ course: "Ensino médio", level: "Médio", institution: "Escola Municipal Central", start: "02/2018", end: "12/2020", ongoing: false }],
  skills: ["Organização", "Atendimento", "Informática"],
  experiences: [{ role: "Assistente de atendimento", company: "Empresa Exemplo", current: false, start: "03/2023", end: "09/2026", modality: "Presencial", description: "Atendimento ao público e organização de documentos." }],
};
const storageKey = "tramporapido-curriculo";
const subscribe = (notify: () => void) => {
  window.addEventListener("storage", notify);
  window.addEventListener("curriculo-atualizado", notify);
  return () => { window.removeEventListener("storage", notify); window.removeEventListener("curriculo-atualizado", notify); };
};
const getResumeSnapshot = () => localStorage.getItem(storageKey);
const getServerSnapshot = () => null;

export default function ResumeFlow({ step }: { step: "education" | "experience" | "saved" }) {
  const storedResume = useSyncExternalStore(subscribe, getResumeSnapshot, getServerSnapshot);
  const [initialResume] = useState(() => {
    try { return storedResume ? JSON.parse(storedResume) as Resume : example; } catch { return example; }
  });
  const resume = (() => { try { return storedResume ? JSON.parse(storedResume) as Resume : initialResume; } catch { return example; } })();
  const router = useRouter();
  const [skill, setSkill] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [educationInvalid, setEducationInvalid] = useState(false);

  function save(next: Resume) {
    try { localStorage.setItem(storageKey, JSON.stringify(next)); window.dispatchEvent(new Event("curriculo-atualizado")); } catch { /* The current step still works without storage. */ }
  }
  function editEducation(index: number, key: keyof Education, value: string | boolean) {
    const education = resume.education.map((item, i) => i === index ? { ...item, [key]: value } : item);
    save({ ...resume, education });
    setEducationInvalid(false);
  }
  function editEducationDates(index: number, value: string) {
    const [start, end = ""] = value.split("—").map(part => part.trim());
    save({ ...resume, education: resume.education.map((item, i) => i === index ? { ...item, start, end } : item) });
  }
  function editExperience(index: number, key: keyof Experience, value: string | boolean) {
    const experiences = resume.experiences.map((item, i) => i === index ? { ...item, [key]: value } : item);
    save({ ...resume, experiences });
    setInvalid(false);
  }
  function editExperienceDates(index: number, value: string) {
    const [start, end = ""] = value.split("—").map(part => part.trim());
    save({ ...resume, experiences: resume.experiences.map((item, i) => i === index ? { ...item, start, end } : item) });
  }
  function addSkill() {
    const value = skill.trim();
    if (value && !resume.skills.some(item => item.toLocaleLowerCase("pt-BR") === value.toLocaleLowerCase("pt-BR"))) save({ ...resume, skills: [...resume.skills, value] });
    setSkill("");
  }
  const addRow = <T,>(items: T[], empty: T, update: (items: T[]) => void) => update([...items, empty]);

  return <CandidateShell>
    <h1>Meu currículo</h1>
    <p className={styles.hint}>1. Escolaridade e habilidades → 2. Experiências</p>
    {step === "education" && <>
      <section className={styles.card} aria-labelledby="education-title">
        <h2 id="education-title">Escolaridade</h2>
        {resume.education.map((item, i) => <div className={styles.resumeFields} key={i}>
          <Field label="Título do curso *" value={item.course} invalid={educationInvalid && !item.course.trim()} onChange={value => editEducation(i, "course", value)} />
          <Field label="Nível *" value={item.level} invalid={educationInvalid && !item.level.trim()} onChange={value => editEducation(i, "level", value)} />
          <Field label="Instituição *" value={item.institution} invalid={educationInvalid && !item.institution.trim()} onChange={value => editEducation(i, "institution", value)} />
          <Field label="Início / conclusão" value={item.ongoing ? item.start : [item.start, item.end].filter(Boolean).join("  —  ")} onChange={value => editEducationDates(i, value)} />
          <label className={styles.resumeCheck}><input type="checkbox" checked={item.ongoing} onChange={e => editEducation(i, "ongoing", e.target.checked)} /> Em andamento</label>
        </div>)}
        <button type="button" className={styles.resumeSecondary} onClick={() => addRow(resume.education, emptyEducation, education => save({ ...resume, education }))}>+ Adicionar escolaridade</button>
      </section>
      <section className={`${styles.card} ${styles.resumeSkills}`} aria-labelledby="skills-title">
        <h2 id="skills-title">Habilidades</h2>
        <div className={styles.skillAdd}><Field label="Adicionar habilidade" value={skill} onChange={setSkill} onEnter={addSkill} /><button type="button" onClick={addSkill}>Adicionar</button></div>
        <div className={styles.skillList}>{resume.skills.map((item, i) => <button key={`${item}-${i}`} type="button" aria-label={`Remover ${item}`} onClick={() => save({ ...resume, skills: resume.skills.filter((_, index) => index !== i) })}>{item} ×</button>)}</div>
      </section>
      {educationInvalid && <p className={styles.error} role="alert">Preencha o curso, o nível e a instituição para continuar.</p>}
      <button className={`${styles.resumePrimary} ${styles.resumeNext}`} type="button" onClick={() => {
        const missing = resume.education.some(item => !item.course.trim() || !item.level.trim() || !item.institution.trim());
        if (missing) { setEducationInvalid(true); document.getElementById("course-title")?.focus(); }
        else router.push("/curriculo/experiencias");
      }}>Continuar para experiências</button>
    </>}
    {step === "experience" && <>
      <section className={styles.card} aria-labelledby="experience-title">
        <h2 id="experience-title">Experiências profissionais</h2>
        {resume.experiences.map((item, i) => <div className={styles.resumeFields} key={i}>
          <Field label="Cargo *" value={item.role} invalid={invalid && !item.role.trim()} onChange={value => editExperience(i, "role", value)} />
          <Field label="Empresa *" value={item.company} invalid={invalid && !item.company.trim()} onChange={value => editExperience(i, "company", value)} />
          <label className={styles.resumeCheck}><input type="checkbox" checked={item.current} onChange={e => editExperience(i, "current", e.target.checked)} /> Emprego atual</label>
          <Field label="Data de início * / data de fim *" value={[item.start, item.end].filter(Boolean).join("  —  ")} invalid={invalid && (!item.start.trim() || (!item.current && !item.end.trim()))} onChange={value => editExperienceDates(i, value)} />
          <label>Modalidade *<select aria-invalid={invalid && !item.modality} value={item.modality} onChange={e => editExperience(i, "modality", e.target.value)}><option value="">Selecione</option>{["Presencial", "Híbrido", "Remoto"].map(value => <option key={value}>{value}</option>)}</select></label>
          <Field label="Descrição das atividades" value={item.description} onChange={value => editExperience(i, "description", value)} />
        </div>)}
        <button type="button" className={styles.resumeSecondary} onClick={() => addRow(resume.experiences, emptyExperience, experiences => save({ ...resume, experiences }))}>+ Adicionar experiência</button>
      </section>
      <div className={styles.resumeActions}>
        <Link className={styles.resumeSecondary} href="/curriculo/escolaridade">Voltar</Link>
        <button type="button" className={styles.resumePrimary} onClick={() => { const missing = resume.experiences.some(item => !item.role.trim() || !item.company.trim() || !item.start.trim() || (!item.current && !item.end.trim()) || !item.modality); if (missing) { setInvalid(true); document.getElementById("job-role")?.focus(); } else { setInvalid(false); save(resume); router.push("/curriculo/salvo"); } }}>Salvar currículo</button>
        <button type="button" className={styles.resumeSecondary} onClick={() => setInvalid(true)}>Ver validação de campos</button>
      </div>
      {invalid && <section className={styles.card} role="alert"><h2>Não foi possível salvar</h2><p>Existem campos inválidos ou não preenchidos. Confira o cargo, a empresa, as datas e a modalidade antes de tentar novamente.</p><a href="#job-role">Corrigir cargo</a></section>}
    </>}
    {step === "saved" && <>
      <section className={styles.card} role="status"><h2>✓ Currículo salvo com sucesso</h2><p>Suas informações estão atualizadas e prontas para as próximas candidaturas.</p></section>
      <Link className={`${styles.resumePrimary} ${styles.resumeNext}`} href="/vagas">Buscar vagas</Link>
    </>}
  </CandidateShell>;
}

function Field({ label, value, onChange, invalid = false, onEnter }: { label: string; value: string; onChange: (value: string) => void; invalid?: boolean; onEnter?: () => void }) {
  const id = label.startsWith("Cargo") ? "job-role" : label.startsWith("Título do curso") ? "course-title" : undefined;
  return <label className={styles.resumeField}>{label}<input id={id} value={value} aria-invalid={invalid} onChange={e => onChange(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && onEnter) { e.preventDefault(); onEnter(); } }} /></label>;
}
