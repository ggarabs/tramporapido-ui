"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import RepresentativeShell from "../../representative-shell";
import styles from "./duvidas.module.css";

interface Question {
  id: string;
  author: string;
  date: string;
  text: string;
  answer?: string;
  answeredAt?: string;
}

const initialQuestions: Question[] = [
  {
    id: "1",
    author: "Mariana Silva",
    date: "20/10/2026",
    text: "O modelo de trabalho aceita flexibilidade de horário para estudantes no período noturno?",
    answer: "Olá, Mariana! Sim, a jornada de 8 horas pode ser ajustada entre 08:00 e 17:00 para não coincidir com as aulas.",
    answeredAt: "21/10/2026",
  },
  {
    id: "2",
    author: "Lucas Ferreira",
    date: "19/10/2026",
    text: "O vale-transporte cobre deslocamentos intermunicipais ou apenas linhas municipais?",
    answer: "Olá, Lucas! O benefício cobre o trajeto completo residência-trabalho via transporte público intermunicipal ou municipal.",
    answeredAt: "19/10/2026",
  },
];

export default function JobQuestionsView() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [newQuestion, setNewQuestion] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [feedback, setFeedback] = useState("");

  function handleSendQuestion(e: FormEvent) {
    e.preventDefault();
    if (!newQuestion.trim() || !authorName.trim()) return;

    const questionObj: Question = {
      id: String(Date.now()),
      author: authorName.trim(),
      date: "Hoje",
      text: newQuestion.trim(),
    };

    setQuestions([questionObj, ...questions]);
    setNewQuestion("");
    setAuthorName("");
    setFeedback("A sua dúvida foi enviada e será respondida pelo responsável da vaga!");
  }

  return (
    <RepresentativeShell>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <Link href="/vagas" className={styles.backLink}>
              ← Voltar às vagas
            </Link>
            <h1>Dúvidas e Comentários</h1>
            <p className={styles.subtitle}>
              Auxiliar Administrativo • São Paulo, SP
            </p>
          </div>
        </div>

        {/* Formulário para envio de nova dúvida */}
        <section className={styles.card}>
          <h2>Tem alguma pergunta sobre a vaga?</h2>
          <p className={styles.hint}>
            As perguntas públicas ajudam outros candidatos a compreender os requisitos da oportunidade.
          </p>

          <form onSubmit={handleSendQuestion} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="author">O seu nome</label>
              <input
                id="author"
                type="text"
                required
                placeholder="Ex.: Carolina Santos"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="question">A sua dúvida</label>
              <textarea
                id="question"
                rows={3}
                required
                placeholder="Escreva aqui a sua dúvida detalhada..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.primaryBtn}>
              Enviar pergunta
            </button>

            {feedback && <p className={styles.successMessage}>{feedback}</p>}
          </form>
        </section>

        {/* Lista de dúvidas enviadas e respostas oficiais */}
        <section className={styles.listSection}>
          <h2>Perguntas frequentes e da comunidade ({questions.length})</h2>

          <div className={styles.questionsList}>
            {questions.map((q) => (
              <article key={q.id} className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <strong>{q.author}</strong>
                  <span className={styles.date}>{q.date}</span>
                </div>
                <p className={styles.questionText}>{q.text}</p>

                {q.answer ? (
                  <div className={styles.replyBox}>
                    <div className={styles.replyHeader}>
                      <span className={styles.badgeRepresentante}>Resposta da Empresa</span>
                      <span className={styles.date}>{q.answeredAt}</span>
                    </div>
                    <p className={styles.replyText}>{q.answer}</p>
                  </div>
                ) : (
                  <p className={styles.pendingAnswer}>Aguardando resposta da empresa...</p>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </RepresentativeShell>
  );
}