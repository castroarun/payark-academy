import { notFound } from "next/navigation";
import { hsModules, getHsModule } from "@/data/healthspan/curriculum";
import Player from "@/components/track/Player";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return hsModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const mod = getHsModule(slug);
  return {
    title: mod ? `Module ${mod.id}: ${mod.title} — Longevity & Healthspan` : "Longevity & Healthspan",
  };
}

export default async function HealthspanModulePage({ params }: PageProps) {
  const { slug } = await params;
  const mod = getHsModule(slug);
  if (!mod) notFound();
  return <Player trackId="healthspan" slug={mod.slug} />;
}
