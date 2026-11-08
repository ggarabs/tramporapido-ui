"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await userApi.csrf();
      await userApi.login(email, password, token);
      router.push("/vagas");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "4rem auto", padding: "1.5rem" }}>
      <h1>Entrar</h1>
      <form onSubmit={submit}>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" autoComplete="username" required value={email}
          onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" autoComplete="current-password" required value={password}
          onChange={(event) => setPassword(event.target.value)} />
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Entrando…" : "Entrar"}</button>
      </form>
    </main>
  );
}
