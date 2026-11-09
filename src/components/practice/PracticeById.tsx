"use client";

import { PRACTICE_SETS } from "@/data/practice";
import PracticeApp from "./PracticeApp";

export default function PracticeById({ id }: { id: string }) {
  const set = PRACTICE_SETS.find((s) => s.id === id);
  if (!set) return null;
  return <PracticeApp set={set} />;
}
