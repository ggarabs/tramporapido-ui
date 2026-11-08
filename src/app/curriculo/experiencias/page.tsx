import type { Metadata } from "next";
import ResumeFlow from "../flow";
export const metadata: Metadata = { title: "Experiências profissionais | tramporapido" };
export default function ExperiencePage() { return <ResumeFlow step="experience" />; }
