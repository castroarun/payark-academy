import { notFound } from "next/navigation";
import { PRACTICE_SETS } from "@/data/practice";
import PracticeById from "@/components/practice/PracticeById";

export function generateStaticParams() {
  return PRACTICE_SETS.map((s) => ({ set: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ set: string }> }) {
  const { set } = await params;
  const s = PRACTICE_SETS.find((x) => x.id === set);
  return { title: s ? `${s.title}: practice — PayArk Academy` : "Practice — PayArk Academy" };
}

export default async function PracticeSetPage({ params }: { params: Promise<{ set: string }> }) {
  const { set } = await params;
  if (!PRACTICE_SETS.some((s) => s.id === set)) notFound();
  return <PracticeById id={set} />;
}
