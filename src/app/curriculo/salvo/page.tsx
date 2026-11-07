import type { Metadata } from "next";
import ResumeFlow from "../flow";
export const metadata: Metadata = { title: "Currículo salvo | tramporapido" };
export default function SavedPage() { return <ResumeFlow step="saved" />; }
