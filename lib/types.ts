export interface AppState {
  sessions: SessionLog[];
  studyProgress: Record<string, "confident" | "needs-work" | "unseen">;
  streaks: {
    currentStreak: number;
    longestStreak: number;
    lastSessionDate: string;
    activeDays: string[];
  };
  completedSessions: string[];
  weekProgress: Record<number, string[]>;
}

export interface SessionLog {
  id: string;
  sessionId: string;
  date: string;
  durationMinutes: number;
  scores: Record<string, number>;
  averageScore: number;
}

export interface CoachingSession {
  id: string;
  category: string;
  title: string;
  minutes: number;
  icon: string;
  weekIntroduced: number;
  priority: number;
  description: string;
  systemPrompt: string;
  tips: string[];
  assessmentCriteria: string[];
}

export interface WeekPlan {
  week: number;
  title: string;
  focus: string;
  description: string;
  sessionIds: string[];
}

export interface FlashCard {
  id: string;
  section: string;
  question: string;
  answer: string;
  weight: number;
}
