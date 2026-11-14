import Link from "next/link";
import styles from "./home.module.css";

const candidateLinks = [
  { href: "/jobs", label: "Buscar vagas", active: true },
  { href: "/applications", label: "Minhas candidaturas" },
  { href: "/resume", label: "Perfil / Currículo" },
];

export default function Home() {
  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <aside className={styles.sidebar} aria-label="Área do candidato">
          <p className={styles.eyebrow}>Seu próximo passo</p>
          <h2>Olá, Ana</h2>
          <nav className={styles.sideNav} aria-label="Atalhos do candidato">
            {candidateLinks.map(({ href, label, active }) => (
              <Link
                key={label}
                href={href}
                className={active ? styles.activeLink : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className={styles.hint}>
            <strong>Currículo atualizado</strong>
            <br />
            Seus dados estão com você.
          </p>
        </aside>

        <main className={styles.main}>
          <h1>Encontre seu próximo trabalho</h1>
          <p className={styles.subtitle}>
            Vagas perto de você, com um currículo sempre à mão.
          </p>

          <section className={styles.shortcuts} aria-label="Atalhos principais">
            <article className={styles.card}>
              <h2>Buscar vagas</h2>
              <p>Veja oportunidades e conheça os requisitos.</p>
              <Link className={styles.primary} href="/vagas">
                Me candidatar a vagas
              </Link>
            </article>
            <article className={styles.card}>
              <h2>Minhas candidaturas</h2>
              <p>Acompanhe as vagas em que você se inscreveu.</p>
              <Link className={styles.secondary} href="/vagas">
                Ver candidaturas
              </Link>
            </article>
          </section>

          <section className={styles.updates} aria-labelledby="updates-title">
            <h2 id="updates-title">Atualizações</h2>
            <p>
              Seu currículo está pronto para novas oportunidades. Ao se
              candidatar, você poderá escrever uma mensagem ao representante.
            </p>
          </section>
          <Link className={styles.editResume} href="/curriculo/escolaridade">
            Editar meu currículo
          </Link>
        </main>
      </div>
    </div>
  );
}
