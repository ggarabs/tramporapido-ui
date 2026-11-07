"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Inter } from "next/font/google";
import styles from "../vagas/registrar/registration.module.css";

const inter = Inter({ subsets: ["latin"] });
export default function CandidateShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return <div className={`${styles.screen} ${inter.className}`} lang="pt-BR">
    <header className={styles.header}><button type="button" aria-expanded={open} aria-controls="candidate-menu" onClick={() => setOpen(!open)}>☰&nbsp; Menu</button><span className={styles.brand}>tramporapido</span><span className={styles.caption}>ÁREA DO CANDIDATO</span></header>
    <div className={styles.content}>
      <aside id="candidate-menu" className={styles.candidateSidebar} hidden={!open}>
        <p>Seu próximo passo</p><h2>Olá, Ana</h2>
        <nav aria-label="Área do candidato">
          <button type="button" disabled>Buscar vagas</button>
          <button type="button" disabled>Minhas candidaturas</button>
          <Link href="/curriculo/escolaridade" aria-current="page" className={styles.primary}>Perfil / Currículo</Link>
        </nav>
        <p className={styles.hint}>Currículo atualizado<br />Seus dados estão com você.</p>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  </div>;
}
