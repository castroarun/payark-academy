import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ResultsProps {
  score: number;
  total: number;
  passed: boolean;
  moduleId: string;
}

export default function Results({
  score,
  total,
  passed,
  moduleId,
}: ResultsProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="max-w-md mx-auto flex flex-col items-center gap-6 py-8">
      {/* Score circle */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--color-bg3)"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={passed ? "var(--color-green)" : "var(--color-amber)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono text-t1">{pct}%</span>
          <span className="text-xs text-t3">
            {score}/{total}
          </span>
        </div>
      </div>

      {/* Status */}
      {passed ? (
        <Card className="w-full text-center border-green/30">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green/15 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-t1">Module Complete!</h2>
            <p className="text-sm text-t2">
              You passed with {pct}%. Great work -- keep going.
            </p>
          </div>
        </Card>
      ) : (
        <Card className="w-full text-center border-amber/30">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber/15 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-amber"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-t1">Not quite there</h2>
            <p className="text-sm text-t2">
              You need 70% to pass. Review the material and try again.
            </p>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link href={`/module/${moduleId}`} className="flex-1 no-underline">
          <Button variant="secondary" className="w-full">
            Back to Module
          </Button>
        </Link>
        {!passed && (
          <Link
            href={`/module/${moduleId}/quiz`}
            className="flex-1 no-underline"
          >
            <Button variant="primary" className="w-full">
              Retake Quiz
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
