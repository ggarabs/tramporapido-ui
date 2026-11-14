"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import styles from "./registrar/registration.module.css";

interface ShellProps {
  children: ReactNode;
}

export default function RepresentativeShell({ children }: ShellProps) {
  const [menuOpen, setMenuOpen] = useState(true);

  const closeMenuMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 760) {
      setMenuOpen(false);
    }
  };

  return (
    <div className={styles.screen}>
      {menuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={styles.content}>
        {menuOpen && (
          <aside
            className={`${styles.sidebar} ${styles.sidebarOpen}`}
            id="menu-lateral"
            aria-label="Menu principal"
          >
            <p
              style={{
                margin: "0 0 4px 0",
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              Empresa Horizonte
            </p>
            <h2
              style={{
                margin: "0 0 16px 0",
                fontSize: "20px",
                color: "var(--ink)",
              }}
            >
              Olá, Carlos
            </h2>
            <nav>
              <Link
                href="/vagas/registrar"
                className={styles.primary}
                onClick={closeMenuMobile}
              >
                Registrar vaga
              </Link>
              <Link href="/vagas" onClick={closeMenuMobile}>
                Gerenciar vagas
              </Link>
              <Link href="/vagas" onClick={closeMenuMobile}>
                Perfil
              </Link>
              <Link href="/vagas" onClick={closeMenuMobile}>
                Configurações
              </Link>
              <Link href="/vagas" onClick={closeMenuMobile}>
                Suporte e dúvidas
              </Link>
            </nav>
            <p
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                marginTop: "24px",
              }}
            >
              Gerencie oportunidades e acompanhe pessoas.
            </p>
          </aside>
        )}

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
