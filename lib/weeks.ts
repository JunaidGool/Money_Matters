import { WeekPlan } from "./types";

export const weeks: WeekPlan[] = [
  {
    week: 1,
    title: "Know Your Starting Point",
    focus: "Awareness & baseline assessment",
    description:
      "This week is about understanding where you are right now — your money story, your spending patterns, and building the weekly check-in habit.",
    sessionIds: ["money-story-rewrite", "fifty-thirty-twenty", "weekly-check-in"],
  },
  {
    week: 2,
    title: "Face Your Numbers",
    focus: "Deep dive into expenses & debt",
    description:
      "Time to look at the details. Audit your expenses, inventory your debts, and understand what triggers unnecessary spending.",
    sessionIds: ["expense-audit", "debt-inventory", "spending-triggers"],
  },
  {
    week: 3,
    title: "Build the Foundation",
    focus: "Emergency savings & cash flow planning",
    description:
      "With clarity on your numbers, start building your safety net and forecasting your cash flow for the weeks ahead.",
    sessionIds: ["emergency-fund", "cash-flow-forecasting"],
  },
  {
    week: 4,
    title: "Break Free from Debt",
    focus: "Debt motivation & negotiation skills",
    description:
      "Attack your debt with renewed motivation and learn to negotiate better terms on what you owe.",
    sessionIds: ["debt-motivation", "negotiate-reduce"],
  },
  {
    week: 5,
    title: "Shift Your Mindset",
    focus: "Abundance thinking & goal setting",
    description:
      "Transform your relationship with money. Shift from scarcity to abundance and set clear financial goals.",
    sessionIds: ["scarcity-to-abundance", "financial-goal-setting"],
  },
  {
    week: 6,
    title: "Grow Your Income",
    focus: "Salary negotiation & side income",
    description:
      "Focus on the earning side. Practice negotiating your worth and brainstorm additional income opportunities.",
    sessionIds: ["salary-negotiation", "side-income"],
  },
  {
    week: 7,
    title: "Invest in Your Future",
    focus: "Investing basics & retirement planning",
    description:
      "Learn the fundamentals of investing and check whether your retirement savings are on track.",
    sessionIds: ["investing-demystified", "retirement-check"],
  },
  {
    week: 8,
    title: "Sustain & Level Up",
    focus: "Review, repeat, and deepen",
    description:
      "All sessions are available for repeat practice. Focus on areas where your scores are lowest and build lasting habits.",
    sessionIds: [],
  },
];
