import type { Metadata } from "next";
import ResumeFlow from "../flow";
export const metadata: Metadata = { title: "Meu currículo | tramporapido" };
export default function EducationPage() { return <ResumeFlow step="education" />; }
