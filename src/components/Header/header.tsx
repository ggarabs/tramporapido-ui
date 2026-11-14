import Link from "next/link";

const candidateLinks = [
  { href: "/vagas", label: "Buscar vagas", active: true },
  { href: "/vagas", label: "Minhas candidaturas" },
  { href: "/curriculo/escolaridade", label: "Perfil / Currículo" },
];

export default function Home() {
  return (
    <div className="min-h-screen border border-[#925807] bg-white text-[#925807] font-[Inter,Arial,sans-serif] text-[14px] leading-[20px]">
      <header className="flex min-h-[76px] sm:h-[92px] flex-wrap sm:flex-nowrap items-center justify-between gap-4 p-4 sm:px-6 border-b border-[#e5e5e5]">
        <Link
          className="flex items-center gap-3 text-[20px] sm:text-[24px] font-semibold text-inherit no-underline"
          href="/"
          aria-label="tramporapido — início"
        >
          <span className="grid w-[40px] h-[40px] place-items-center rounded-lg bg-[#925807] text-white text-[22px]">
            T
          </span>
          <span>tramporapido</span>
        </Link>

        <nav
          className="flex w-full sm:w-auto flex-wrap items-center gap-4 sm:gap-6"
          aria-label="Navegação principal"
        >
          <Link
            className="text-[#2d0f0f] no-underline hover:underline"
            href="/"
          >
            Início
          </Link>
          <Link
            className="text-[#2d0f0f] no-underline hover:underline"
            href="/vagas"
          >
            Processos
          </Link>
          <Link
            className="text-[#2d0f0f] no-underline hover:underline"
            href="/curriculo/escolaridade"
          >
            Documentos
          </Link>
          <Link
            className="grid min-w-[110px] min-h-[44px] place-items-center border border-[#925807] rounded-lg text-[#925807] font-medium no-underline"
            href="/curriculo/escolaridade"
          >
            Login
          </Link>
        </nav>
      </header>

      <div className="flex flex-col sm:flex-row items-start gap-6 max-w-[1200px] mx-auto p-4 sm:p-6">
        <aside
          className="w-full sm:w-[204px] sm:flex-none min-h-[313px] p-4 bg-[#ffeed2]"
          aria-label="Área do candidato"
        >
          <p className="m-0 mb-3 text-[#2d0f0f] font-medium">
            Seu próximo passo
          </p>
          <h2 className="m-0 text-[24px] font-semibold leading-[35px]">
            Olá, Ana
          </h2>

          <nav className="grid gap-3 mt-4" aria-label="Atalhos do candidato">
            {candidateLinks.map(({ href, label, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex min-h-[44px] items-center justify-center border border-[#925807] rounded-lg p-2 bg-white text-[#925807] text-center no-underline font-medium hover:underline ${
                  active ? "bg-[#925807] text-white hover:no-underline" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="mt-4 mb-0 text-[#2d0f0f] text-[12px] leading-[17px]">
            <strong className="font-medium">Currículo atualizado</strong>
            <br />
            Seus dados estão com você.
          </p>
        </aside>

        <main className="w-full sm:flex-1 min-w-0 max-w-[924px]">
          <h1 className="m-0 text-[24px] font-semibold leading-[35px]">
            Encontre seu próximo trabalho
          </h1>
          <p className="m-0 text-[#2d0f0f]">
            Vagas perto de você, com um currículo sempre à mão.
          </p>

          <section
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6"
            aria-label="Atalhos principais"
          >
            <article className="flex min-h-[173px] flex-col items-start border border-[#808080] rounded-lg p-5">
              <h2 className="m-0 text-[16px] font-medium leading-[6px]">
                Buscar vagas
              </h2>
              <p className="my-2 text-[#2d0f0f]">
                Veja oportunidades e conheça os requisitos.
              </p>
              <Link
                className="inline-flex min-h-[44px] items-center justify-center border border-[#925807] rounded-lg px-4 py-2 bg-[#925807] text-white font-medium no-underline hover:brightness-[0.94]"
                href="/vagas"
              >
                Me candidatar a vagas
              </Link>
            </article>

            <article className="flex min-h-[173px] flex-col items-start border border-[#808080] rounded-lg p-5">
              <h2 className="m-0 text-[16px] font-medium leading-[24px]">
                Minhas candidaturas
              </h2>
              <p className="my-2 text-[#2d0f0f]">
                Acompanhe as vagas em que você se inscreveu.
              </p>
              <Link
                className="inline-flex min-h-[44px] items-center justify-center border border-[#925807] rounded-lg px-4 py-2 text-[#925807] font-medium no-underline"
                href="/vagas"
              >
                Ver candidaturas
              </Link>
            </article>
          </section>

          <section
            className="mt-[18px] border border-[#808080] rounded-lg p-5"
            aria-labelledby="updates-title"
          >
            <h2
              id="updates-title"
              className="m-0 text-[16px] font-medium leading-[24px]"
            >
              Atualizações
            </h2>
            <p className="mt-2 mb-0 text-[#2d0f0f]">
              Seu currículo está pronto para novas oportunidades. Ao se
              candidatar, você poderá escrever uma mensagem ao representante.
            </p>
          </section>

          <Link
            className="w-full sm:w-[240px] mt-4 inline-flex min-h-[44px] items-center justify-center border border-[#925807] rounded-lg px-4 py-2 text-[#925807] font-medium no-underline hover:brightness-[0.94]"
            href="/curriculo/escolaridade"
          >
            Editar meu currículo
          </Link>
        </main>
      </div>
    </div>
  );
}
