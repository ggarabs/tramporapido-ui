import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RegistrationForm from "./registration-form";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Registrar vaga | tramporapido",
  description: "Cadastre as informações de uma oportunidade de trabalho.",
};

export default function RegisterJobPage() {
  return <RegistrationForm className={inter.className} />;
}
