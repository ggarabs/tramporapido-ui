"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { taskApi } from "@/lib/api";

type JobFormData = {
  title: string;
  period: string;
  date: string;
  modality: string;
  state: string;
  city: string;
  district: string;
  address: string;
  salary: string;
  benefits: string;
  description: string;
};

type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  type?: string;
  options?: readonly string[];
};

const fields: FieldConfig[] = [
  {
    name: "title",
    label: "Vaga",
    placeholder: "Título da vaga",
    required: true,
  },
  {
    name: "period",
    label: "Período",
    placeholder: "Selecione o período",
    required: true,
    options: ["Integral", "Manhã", "Tarde", "Noite", "Flexível"],
  },
  {
    name: "date",
    placeholder: "",
    label: "Data",
    type: "date",
    required: false,
  },
  {
    name: "modality",
    label: "Modalidade",
    placeholder: "Selecione",
    options: ["Presencial", "Híbrido", "Remoto"],
    required: false,
  },
  {
    name: "state",
    label: "Estado",
    placeholder: "UF",
    options: [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
    required: false,
  },
  {
    name: "city",
    label: "Município",
    placeholder: "Município",
    required: false,
  },
  { name: "district", label: "Bairro", placeholder: "Bairro", required: false },
  {
    name: "address",
    label: "Rua / número",
    placeholder: "Rua e número",
    required: false,
  },
  {
    name: "salary",
    label: "Salário",
    placeholder: "Informe o valor",
    required: true,
  },
  {
    name: "benefits",
    label: "Benefícios",
    placeholder: "Informe os benefícios",
    required: true,
  },
  {
    name: "description",
    label: "Descrição e requisitos",
    placeholder: "Descreva atividades e requisitos",
    required: true,
  },
];

const defaultValues: JobFormData = {
  title: "",
  period: "",
  date: "2026-10-18",
  modality: "",
  state: "",
  city: "",
  district: "",
  address: "",
  salary: "",
  benefits: "",
  description: "",
};

export default function RegistrationForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormData>({
    defaultValues,
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      setSaving(true);
      setApiError("");

      const created = await taskApi.create({
        title: data.title.trim(),
        description: data.description.trim(),
        city: data.city.trim(),
        neighborhood: data.district.trim(),
        status: "OPEN",
        modality:
          data.modality === "Remoto"
            ? "HOME_OFFICE"
            : data.modality === "Híbrido"
              ? "HYBRID"
              : "IN_PERSON",
        dateTimeOpen: data.date ? `${data.date}T00:00:00` : undefined,
        income: Number(
          (data.salary ?? "").replace(/\./g, "").replace(",", "."),
        ),
      });

      sessionStorage.setItem("created-task-id", created.id);
      router.push("/jobs/publicada");
    } catch (cause) {
      setApiError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível cadastrar a vaga.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Descartar as informações preenchidas?")) {
      reset(defaultValues);
      setApiError("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-ink text-sm leading-5 antialiased">
      <h1 className="m-0 text-2xl font-semibold leading-[35px] text-ink mb-2">
        Registrar vaga
      </h1>
      <p className="mt-1 mb-0 text-xs leading-[17px] text-muted">
        Os campos marcados com * são obrigatórios.
      </p>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-[18px]">
        <section
          className="rounded-lg border border-[#808080] bg-white p-5"
          aria-labelledby="opportunity-heading"
        >
          <h2
            id="opportunity-heading"
            className="m-0 text-2xl font-semibold leading-[35px] text-ink mb-4"
          >
            Informações da oportunidade
          </h2>

          <div className="mt-4 grid w-full grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 [&>div]:min-w-0 [&>div:nth-child(5)]:pt-9 [&>div:nth-child(5)]:relative [&>div:nth-child(6)]:pt-9 [&>div:nth-child(6)]:relative sm:[&>div:nth-child(6)]:pt-0">
            {fields.map((field) => {
              const fieldError = errors[field.name as keyof JobFormData];
              const isDescription = field.name === "description";

              return (
                <div
                  key={field.name}
                  className={isDescription ? "sm:col-span-full" : undefined}
                >
                  {field.name === "state" && (
                    <h3 className="absolute top-0 m-0 font-medium text-ink">
                      Local
                    </h3>
                  )}

                  <label
                    htmlFor={field.name}
                    className="block font-medium mb-1.5 text-ink"
                  >
                    {field.label}
                    {field.required && " *"}
                  </label>

                  {field.options ? (
                    <select
                      id={field.name}
                      {...register(field.name as keyof JobFormData, {
                        required: field.required
                          ? "Preencha este campo."
                          : false,
                      })}
                      aria-invalid={Boolean(fieldError)}
                      aria-describedby={
                        fieldError ? `${field.name}-error` : undefined
                      }
                      className="block box-border h-[42px] w-full max-w-[400px] sm:max-w-full rounded-lg border border-[#808080] bg-white px-3 py-2 text-muted font-inherit text-inherit cursor-pointer placeholder:text-muted/60 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3 aria-invalid:border-[#b42318]"
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      inputMode={
                        field.name === "salary" ? "decimal" : undefined
                      }
                      {...register(field.name as keyof JobFormData, {
                        required: field.required
                          ? "Preencha este campo."
                          : false,
                        validate:
                          field.name === "salary"
                            ? (val) =>
                                !val ||
                                /^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(
                                  val.trim(),
                                ) ||
                                "Informe um valor como 1.900,00."
                            : undefined,
                      })}
                      aria-invalid={Boolean(fieldError)}
                      aria-describedby={
                        fieldError ? `${field.name}-error` : undefined
                      }
                      className="block box-border h-[42px] w-full max-w-[400px] sm:max-w-full rounded-lg border border-[#808080] bg-white px-3 py-2 text-muted font-inherit text-inherit placeholder:text-muted/60 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3 aria-invalid:border-[#b42318]"
                    />
                  )}

                  {fieldError && (
                    <p
                      id={`${field.name}-error`}
                      className="mt-1.5 text-xs text-[#b42318]"
                    >
                      {fieldError.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <div className="my-[18px] flex gap-4 sm:flex-col sm:w-full sm:gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex min-h-[44px] sm:min-h-[48px] sm:w-full w-[200px] cursor-pointer items-center justify-center rounded-lg border border-ink bg-white p-2.5 font-medium text-ink no-underline transition-all hover:brightness-94 disabled:cursor-not-allowed focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-[44px] sm:min-h-[48px] sm:w-full w-[200px] cursor-pointer items-center justify-center rounded-lg border border-ink bg-ink p-2.5 font-medium text-white no-underline transition-all hover:brightness-94 disabled:cursor-not-allowed focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3"
          >
            {saving ? "Enviando…" : "Publicar vaga"}
          </button>
        </div>

        {apiError && (
          <p role="alert" className="mt-4 text-xs text-[#b42318]">
            {apiError}
          </p>
        )}
      </form>
    </div>
  );
}
