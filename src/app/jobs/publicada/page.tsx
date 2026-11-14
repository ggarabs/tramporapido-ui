import type { Metadata } from "next";
import PublishedJobView from "./published-job-view";

export const metadata: Metadata = {
  title: "Vaga publicada | tramporapido",
  description: "Confira as informações da vaga recém-publicada.",
};

export default function PublishedJobPage() {
  return <PublishedJobView />;
}