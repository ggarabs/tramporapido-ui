import Link from "next/link";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Vaga publicada | tramporapido",
  description: "Confira as informações da vaga recém-publicada.",
};

export default function PublishedJobPage() {
  return (
    <div className="w-full text-ink text-sm leading-5">
      <h1 className="m-0 text-2xl font-semibold leading-[35px] text-ink">
        Vaga publicada
      </h1>
      <p className="mt-1 mb-[18px] text-xs leading-[17px] text-muted">
        Esta oportunidade já se encontra visível para candidatos na plataforma.
      </p>

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[580px_324px] md:gap-5">
        {/* Coluna 1: Resumo com os dados da vaga */}
        <section
          className="flex flex-col gap-4 rounded-lg border border-default bg-white p-5 box-border"
          aria-labelledby="summary-heading"
        >
          <h2
            id="summary-heading"
            className="m-0 text-2xl font-semibold leading-[35px] text-ink"
          >
            {defaultJob.title}
          </h2>

          <div>
            <span className="block text-xs leading-[17px] text-muted">
              Período
            </span>
            <p className="mt-1 mb-0">
              <strong className="font-semibold">{defaultJob.period}</strong>
            </p>
          </div>

          <div>
            <span className="block text-xs leading-[17px] text-muted">
              Modalidade e Local
            </span>
            <p className="mt-1 mb-0">
              <strong className="font-semibold">{defaultJob.modality}</strong> —{" "}
              {defaultJob.city}/{defaultJob.state} ({defaultJob.district})
            </p>
            <p className="mt-1 mb-0 text-xs leading-[17px] text-muted">
              {defaultJob.address}
            </p>
          </div>

          <div>
            <span className="block text-xs leading-[17px] text-muted">
              Salário
            </span>
            <p className="mt-1 mb-0">
              <strong className="font-semibold">R$ {defaultJob.salary}</strong>
            </p>
          </div>

          <div>
            <span className="block text-xs leading-[17px] text-muted">
              Benefícios
            </span>
            <p className="mt-1 mb-0">{defaultJob.benefits}</p>
          </div>

          <div>
            <span className="block text-xs leading-[17px] text-muted">
              Descrição e requisitos
            </span>
            <p className="mt-1 mb-0">{defaultJob.description}</p>
          </div>

          <p className="m-0 text-xs leading-[17px] text-muted">
            Publicada em: {defaultJob.date}
          </p>
        </section>

        {/* Coluna 2: Ações de Gestão */}
        <aside className="flex w-full md:w-[310px] flex-col gap-4 rounded-lg border border-default bg-white p-5 box-border">
          <h3 className="m-0 text-lg font-semibold text-ink">Gestão da vaga</h3>
          <p className="m-0 text-xs leading-[17px] text-muted">
            Acompanhe as candidaturas ou cadastre uma nova vaga.
          </p>

          <Link
            href="/candidaturas"
            className="box-border inline-flex min-h-[48px] md:min-h-[44px] w-full items-center justify-center rounded-lg border border-ink bg-ink px-3 py-2.5 text-center font-medium text-white no-underline transition-all hover:brightness-94 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3"
          >
            Ver candidaturas (0)
          </Link>

          <Link
            href="/jobs/register"
            className="box-border inline-flex min-h-[48px] md:min-h-[44px] w-full items-center justify-center rounded-lg border border-ink bg-white px-3 py-2.5 text-center font-medium text-ink no-underline transition-all hover:brightness-94 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3"
          >
            Cadastrar outra vaga
          </Link>

          <Link
            href="/jobs"
            className="box-border inline-flex min-h-[48px] md:min-h-[44px] w-full items-center justify-center rounded-lg border border-ink bg-white px-3 py-2.5 text-center font-medium text-ink no-underline transition-all hover:brightness-94 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3"
          >
            Ir para listagem de vagas
          </Link>
        </aside>
      </div>
    </div>
  );
}
