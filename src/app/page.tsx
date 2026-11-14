import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-w-0 flex-1 flex flex-col gap-6">
      <div>
        <h1 className="m-0 text-2xl font-semibold leading-[35px] text-ink">
          Encontre seu próximo trabalho
        </h1>
        <p className="mt-1 mb-0 text-muted">
          Vagas perto de você, com um currículo sempre à mão.
        </p>
      </div>

      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
        aria-label="Atalhos principais"
      >
        <article className="flex flex-col justify-between rounded-lg border border-default bg-white p-5 h-full shadow-sm">
          <div>
            <h2 className="m-0 text-lg font-semibold text-ink">Buscar vagas</h2>
            <p className="mt-2 mb-4 text-muted">
              Veja oportunidades e conheça os requisitos detalhados.
            </p>
          </div>
          <Link
            href="/jobs"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-ink bg-ink px-4 py-2.5 font-medium text-white no-underline transition-all hover:brightness-94 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3 w-full sm:w-auto"
          >
            Me candidatar a vagas
          </Link>
        </article>

        <article className="flex flex-col justify-between rounded-lg border border-default bg-white p-5 h-full shadow-sm">
          <div>
            <h2 className="m-0 text-lg font-semibold text-ink">
              Minhas candidaturas
            </h2>
            <p className="mt-2 mb-4 text-muted">
              Acompanhe o status das vagas em que você se inscreveu.
            </p>
          </div>
          <Link
            href="/jobs"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-ink bg-white px-4 py-2.5 font-medium text-ink no-underline transition-all hover:brightness-94 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3 w-full sm:w-auto"
          >
            Ver candidaturas
          </Link>
        </article>
      </section>

      <section
        className="rounded-lg border border-default bg-white p-5 w-full shadow-sm"
        aria-labelledby="updates-title"
      >
        <h2 id="updates-title" className="m-0 text-lg font-semibold text-ink">
          Atualizações
        </h2>
        <p className="mt-2 mb-0 text-muted leading-relaxed">
          Seu currículo está pronto para novas oportunidades. Ao se candidatar,
          você poderá escrever uma mensagem personalizada ao representante.
        </p>
      </section>

      <div>
        <Link
          href="/resume"
          className="inline-flex min-h-[44px] w-full sm:w-[240px] items-center justify-center rounded-lg border border-ink bg-white px-4 py-2.5 font-medium text-ink no-underline transition-all hover:brightness-94 focus-visible:outline-3 focus-visible:outline-ink focus-visible:outline-offset-3"
        >
          Editar meu currículo
        </Link>
      </div>
    </main>
  );
}
