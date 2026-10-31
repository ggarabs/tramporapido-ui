import type { Metadata } from "next";
import RegistrationForm from "./registration-form";

export const metadata: Metadata = {
  title: "Registrar vaga | tramporapido",
  description: "Cadastre as informações de uma oportunidade de trabalho.",
};

export default function RegisterJobPage() {
  return <RegistrationForm />;
}
