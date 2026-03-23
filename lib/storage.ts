import { AppState, SessionLog } from "./types";

const STORAGE_KEY = "moneymatters_state";

const defaultState: AppState = {
  sessions: [],
  studyProgress: {},
  streaks: {
    currentStreak: 0,
    longestStreak: 0,
    lastSessionDate: "",
    activeDays: [],
  },
  completedSessions: [],
  weekProgress: {},
};

export function getState(): AppState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function setState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  return Math.round(Math.abs(da.getTime() - db.getTime()) / (1000 * 60 * 60 * 24));
}

export function logSession(log: SessionLog): void {
  const state = getState();
  state.sessions.push(log);

  if (!state.completedSessions.includes(log.sessionId)) {
    state.completedSessions.push(log.sessionId);
  }

  const today = getToday();
  if (!state.streaks.activeDays.includes(today)) {
    state.streaks.activeDays.push(today);
  }

  // Update streak
  const lastDate = state.streaks.lastSessionDate;
  if (!lastDate || daysBetween(lastDate, today) > 1) {
    state.streaks.currentStreak = 1;
  } else if (daysBetween(lastDate, today) === 1) {
    state.streaks.currentStreak += 1;
  }
  // same day — streak stays the same

  state.streaks.lastSessionDate = today;
  state.streaks.longestStreak = Math.max(
    state.streaks.longestStreak,
    state.streaks.currentStreak
  );

  setState(state);
}

export function getSessionLogs(sessionId: string): SessionLog[] {
  return getState().sessions.filter((s) => s.sessionId === sessionId);
}

export function getTotalMinutes(): number {
  return getState().sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
}

export function getAverageScore(): number {
  const sessions = getState().sessions;
  if (sessions.length === 0) return 0;
  const total = sessions.reduce((sum, s) => sum + s.averageScore, 0);
  return Math.round((total / sessions.length) * 10) / 10;
}

export function updateStudyProgress(
  questionId: string,
  status: "confident" | "needs-work"
): void {
  const state = getState();
  state.studyProgress[questionId] = status;
  setState(state);
}

export function getStudyStats(): {
  confident: number;
  needsWork: number;
  unseen: number;
  total: number;
} {
  const state = getState();
  const progress = state.studyProgress;
  const values = Object.values(progress);
  const confident = values.filter((v) => v === "confident").length;
  const needsWork = values.filter((v) => v === "needs-work").length;
  // total is set by the caller based on total questions
  return { confident, needsWork, unseen: 0, total: 0 };
}

export function resetAllData(): void {
  setState(defaultState);
}

export function resetStudyProgress(): void {
  const state = getState();
  state.studyProgress = {};
  setState(state);
}

export function markWeekSession(week: number, sessionId: string): void {
  const state = getState();
  if (!state.weekProgress[week]) {
    state.weekProgress[week] = [];
  }
  if (!state.weekProgress[week].includes(sessionId)) {
    state.weekProgress[week].push(sessionId);
  }
  setState(state);
}
