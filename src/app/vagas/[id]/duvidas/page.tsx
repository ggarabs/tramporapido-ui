import type { Metadata } from "next";
import JobQuestionsView from "./job-questions-view";

export const metadata: Metadata = {
  title: "Dúvidas da Vaga | tramporapido",
  description: "Esclareça dúvidas e veja perguntas frequentes sobre a oportunidade.",
};

export default function JobQuestionsPage() {
  return <JobQuestionsView />;
}