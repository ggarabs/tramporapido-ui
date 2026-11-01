"use client";

import { useRef, useState, type FormEvent } from "react";
import RepresentativeShell from "../representative-shell";
import styles from "./registration.module.css";

const fields = [
  { name: "title", label: "Vaga", placeholder: "Título da vaga", required: true },
  { name: "period", label: "Período", placeholder: "Selecione o período", required: true,
    options: ["Integral", "Manhã", "Tarde", "Noite", "Flexível"] },
  { name: "date", label: "Data", type: "date" },
  { name: "modality", label: "Modalidade", placeholder: "Selecione",
    options: ["Presencial", "Híbrido", "Remoto"] },
  { name: "state", label: "Estado", placeholder: "UF",
    options: "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ") },
  { name: "city", label: "Município", placeholder: "Município" },
  { name: "district", label: "Bairro", placeholder: "Bairro" },
  { name: "address", label: "Rua / número", placeholder: "Rua e número" },
  { name: "salary", label: "Salário", placeholder: "Informe o valor", required: true },
  { name: "benefits", label: "Benefícios", placeholder: "Informe os benefícios", required: true },
  { name: "description", label: "Descrição e requisitos", placeholder: "Descreva atividades e requisitos", required: true },
];
const example: Record<string, string> = {
  title: "Auxiliar administrativo", period: "Integral", date: "2026-10-18",
  modality: "Presencial", state: "SP", city: "São Paulo", district: "Centro",
  address: "Rua Exemplo, 120", salary: "1.900,00", benefits: "vale-transporte e vale-alimentação",
  description: "Organize documentos, atenda clientes e apoie rotinas administrativas. Ensino médio completo e organização.",
};
const initialValues: Record<string, string> = { date: "2026-10-18" };

export default function RegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  function continueRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid: Record<string, string> = {};
    fields.forEach(({ name, required }) => {
      if (required && !values[name]?.trim()) invalid[name] = "Preencha este campo.";
    });
    if (values.salary?.trim() && !/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(values.salary.trim())) {
      invalid.salary = "Informe um valor como 1.900,00.";
    }
    setErrors(invalid);
    setValidated(Object.keys(invalid).length === 0);
    if (Object.keys(invalid).length) {
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(invalid)[0]}"]`)?.focus();
    }
  }

  function cancelRegistration() {
    const dirty = Object.keys(values).some((key) => values[key] !== (initialValues[key] ?? ""));
    if (dirty && !window.confirm("Descartar as informações preenchidas?")) return;
    setValues(initialValues);
    setErrors({});
    setValidated(false);
    form.current?.querySelector<HTMLInputElement>("input")?.focus();
  }

  return (
    <RepresentativeShell>
      <h1>Registrar vaga</h1>
      <p className={styles.hint}>Os campos marcados com * são obrigatórios.</p>
      <form ref={form} noValidate onSubmit={continueRegistration}>
        <section className={styles.card} aria-labelledby="opportunity-heading">
          <h2 id="opportunity-heading">Informações da oportunidade</h2>
          <div className={styles.grid}>
            {fields.map((field) => (
              <div key={field.name} className={field.name === "description" ? styles.fullWidth : undefined}>
                {field.name === "state" && <h3 className={styles.location}>Local</h3>}
                <label htmlFor={field.name}>{field.label}{field.required && " *"}</label>
                {field.options ? (
                  <select id={field.name} name={field.name} required={field.required} value={values[field.name] ?? ""}
                    aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    onChange={(event) => { setValues({ ...values, [field.name]: event.target.value }); setValidated(false); }}>
                    <option value="" disabled>{field.placeholder}</option>
                    {field.options.map((option) => <option key={option}>{option}</option>)}
                  </select>
                ) : (
                  <input id={field.name} name={field.name} type={field.type ?? "text"} required={field.required}
                    placeholder={field.placeholder} value={values[field.name] ?? ""}
                    inputMode={field.name === "salary" ? "decimal" : undefined}
                    aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    onChange={(event) => { setValues({ ...values, [field.name]: event.target.value }); setValidated(false); }} />
                )}
                {errors[field.name] && <p id={`${field.name}-error`} className={styles.error}>{errors[field.name]}</p>}
              </div>
            ))}
          </div>
        </section>
        <div className={styles.actions}>
          <button type="button" onClick={cancelRegistration}>Cancelar</button>
          <button type="submit" className={styles.primary}>Continuar</button>
        </div>
        <button type="button" className={styles.example} onClick={() => {
          setValues(example); setErrors({}); setValidated(false);
        }}>Preencher com exemplo</button>
        <p role="status" className={styles.hint}>
          {validated && "Informações validadas. A revisão e a publicação estarão disponíveis em uma próxima etapa; nenhuma vaga foi publicada."}
        </p>
      </form>
    </RepresentativeShell>
  );
}
