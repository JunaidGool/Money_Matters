import { sessions, getSessionById } from "@/lib/sessions";
import CoachingSessionView from "@/components/CoachingSession";
import Link from "next/link";

export function generateStaticParams() {
  return sessions.map((s) => ({ sessionId: s.id }));
}

export default function SessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const session = getSessionById(params.sessionId);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-slate-400">Session not found</p>
        <Link
          href="/"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          ← Back to sessions
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>
      <CoachingSessionView session={session} />
    </div>
  );
}
