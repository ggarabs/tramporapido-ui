"use client";

import { useState, type ReactNode } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./registrar/registration.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RepresentativeShell({ children, published = false }: {
  children: ReactNode;
  published?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className={`${styles.screen} ${inter.className}`} lang="pt-BR">
      <header className={styles.header}>
        <button type="button" aria-expanded={menuOpen} aria-controls="representative-menu"
          onClick={() => setMenuOpen(!menuOpen)}>☰&nbsp; Menu</button>
        <span className={styles.brand}>tramporapido</span>
        <span className={styles.caption}>ÁREA DO REPRESENTANTE</span>
      </header>
      <div className={styles.content}>
        <aside id="representative-menu" className={styles.sidebar} hidden={!menuOpen}>
          <p>Empresa Horizonte</p>
          <h2>Olá, Carlos</h2>
          <nav aria-label="Área do representante">
            <Link href="/vagas/registrar" aria-current={published ? undefined : "page"}
              className={published ? undefined : styles.primary}>Registrar vaga</Link>
            {["Gerenciar vagas", "Perfil", "Configurações", "Suporte e dúvidas"].map((label, index) => (
              <button key={label} type="button" disabled title="Página ainda indisponível"
                className={published && index === 0 ? styles.primary : undefined}>{label}</button>
            ))}
          </nav>
          <p className={styles.hint}>Gerencie oportunidades<br />e acompanhe pessoas.</p>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
