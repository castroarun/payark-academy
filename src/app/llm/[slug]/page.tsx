import { notFound } from "next/navigation";
import { llmModules, getLlmModule } from "@/data/llm/curriculum";
import Player from "@/components/llm/Player";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return llmModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const mod = getLlmModule(slug);
  return {
    title: mod
      ? `Module ${mod.id}: ${mod.title} — Build an LLM`
      : "Build an LLM",
  };
}

export default async function LlmModulePage({ params }: PageProps) {
  const { slug } = await params;
  const mod = getLlmModule(slug);
  if (!mod) notFound();
  return <Player slug={mod.slug} />;
}
