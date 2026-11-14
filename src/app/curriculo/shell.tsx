"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Inter } from "next/font/google";
import styles from "../vagas/registrar/registration.module.css";

const inter = Inter({ subsets: ["latin"] });
export default function CandidateShell({
  children,
  active = "resume",
}: {
  children: ReactNode;
  active?: "resume" | "jobs";
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`${styles.screen} ${inter.className}`} lang="pt-BR">
      <div className={styles.content}>
        <aside
          id="candidate-menu"
          className={styles.candidateSidebar}
          hidden={!open}
        >
          <p>Seu próximo passo</p>
          <h2>Olá, Ana</h2>
          <nav aria-label="Área do candidato">
            <Link
              href="/vagas"
              aria-current={active === "jobs" ? "page" : undefined}
              className={active === "jobs" ? styles.primary : undefined}
            >
              Buscar vagas
            </Link>
            <button type="button" disabled>
              Minhas candidaturas
            </button>
            <Link
              href="/curriculo/escolaridade"
              aria-current={active === "resume" ? "page" : undefined}
              className={active === "resume" ? styles.primary : undefined}
            >
              Perfil / Currículo
            </Link>
          </nav>
          <p className={styles.hint}>
            Currículo atualizado
            <br />
            Seus dados estão com você.
          </p>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
