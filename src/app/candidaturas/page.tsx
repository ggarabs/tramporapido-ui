import type { Metadata } from "next";
import CandidaturasView from "./candidaturas-view";

export const metadata: Metadata = {
  title: "Candidaturas | tramporapido",
  description: "Acompanhe e gerencie as candidaturas recebidas para as suas vagas.",
};

export default function CandidaturasPage() {
  return <CandidaturasView />;
}