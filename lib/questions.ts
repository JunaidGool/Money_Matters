import { FlashCard } from "./types";

export const questions: FlashCard[] = [
  // Budgeting Basics
  {
    id: "q1",
    section: "Budgeting Basics",
    question: "What is the 50/30/20 rule?",
    answer:
      "A budgeting framework: 50% of after-tax income goes to needs (rent, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment.",
    weight: 1,
  },
  {
    id: "q2",
    section: "Budgeting Basics",
    question: "What's the difference between a need and a want?",
    answer:
      "A need is essential for survival and basic functioning (housing, food, healthcare). A want improves quality of life but isn't essential (streaming services, dining out, new clothes when you have enough).",
    weight: 1,
  },
  {
    id: "q3",
    section: "Budgeting Basics",
    question: "What is cash flow?",
    answer:
      "The movement of money in and out of your accounts. Positive cash flow means you earn more than you spend. Tracking it helps you see where money goes and plan ahead.",
    weight: 1,
  },
  {
    id: "q4",
    section: "Budgeting Basics",
    question: "Why should you track your spending?",
    answer:
      "Tracking reveals where money actually goes vs. where you think it goes. Most people underestimate spending by 20-40%. Awareness is the first step to behavior change.",
    weight: 1,
  },
  {
    id: "q5",
    section: "Budgeting Basics",
    question: "What is zero-based budgeting?",
    answer:
      "A method where every dollar of income is assigned a specific purpose (expenses, savings, or debt), so income minus planned spending equals zero. It ensures intentional use of all money.",
    weight: 1,
  },

  // Debt Management
  {
    id: "q6",
    section: "Debt Management",
    question: "What's the avalanche method?",
    answer:
      "Pay minimum on all debts, then put extra money toward the highest interest rate debt first. Saves the most money on interest over time.",
    weight: 1,
  },
  {
    id: "q7",
    section: "Debt Management",
    question: "What's the snowball method?",
    answer:
      "Pay minimum on all debts, then put extra money toward the smallest balance first. Builds motivation through quick wins, even if it costs more in interest.",
    weight: 1,
  },
  {
    id: "q8",
    section: "Debt Management",
    question: "What is a credit score?",
    answer:
      "A number (300-850) that represents your creditworthiness. Based on payment history (35%), amounts owed (30%), length of history (15%), new credit (10%), and credit mix (10%).",
    weight: 1,
  },
  {
    id: "q9",
    section: "Debt Management",
    question: "What's the difference between good debt and bad debt?",
    answer:
      "Good debt finances appreciating assets or increases earning potential (mortgage, student loans, business loans). Bad debt finances depreciating assets or consumption (credit card debt, payday loans).",
    weight: 1,
  },
  {
    id: "q10",
    section: "Debt Management",
    question: "What is APR?",
    answer:
      "Annual Percentage Rate — the yearly cost of borrowing money, including interest and fees. A 20% APR credit card charges roughly 1.67% per month on unpaid balances.",
    weight: 1,
  },

  // Saving
  {
    id: "q11",
    section: "Saving",
    question: "How much emergency fund do you need?",
    answer:
      "3-6 months of essential expenses. Start with $1,000 as a starter fund, then build to 1 month, then 3 months. Freelancers and variable-income earners should aim for 6+ months.",
    weight: 1,
  },
  {
    id: "q12",
    section: "Saving",
    question: "What is a high-yield savings account?",
    answer:
      "A savings account offering significantly higher interest than traditional banks (often 10-20x more). FDIC insured, liquid, and ideal for emergency funds and short-term savings goals.",
    weight: 1,
  },
  {
    id: "q13",
    section: "Saving",
    question: 'What does "pay yourself first" mean?',
    answer:
      'Automatically transfer money to savings before paying other expenses. Treating savings like a non-negotiable bill ensures you save consistently rather than saving "what\'s left over."',
    weight: 1,
  },
  {
    id: "q14",
    section: "Saving",
    question: "Why automate your savings?",
    answer:
      "Removes willpower from the equation. Automated transfers happen whether you feel like saving or not. Studies show automated savers save 2-3x more than manual savers.",
    weight: 1,
  },
  {
    id: "q15",
    section: "Saving",
    question: "What is the opportunity cost of not saving?",
    answer:
      "Money not saved misses out on compound growth. $200/month invested at 7% for 30 years becomes ~$227,000. Starting 10 years later with the same contributions yields only ~$98,000.",
    weight: 1,
  },

  // Investing Fundamentals
  {
    id: "q16",
    section: "Investing Fundamentals",
    question: "What is compound interest?",
    answer:
      'Interest earned on both your original investment AND previously earned interest. It creates exponential growth over time — often called "the eighth wonder of the world."',
    weight: 1,
  },
  {
    id: "q17",
    section: "Investing Fundamentals",
    question: "What is an index fund?",
    answer:
      "A fund that tracks a market index (like the S&P 500) by holding all its stocks. Offers broad diversification, low fees, and historically outperforms most actively managed funds.",
    weight: 1,
  },
  {
    id: "q18",
    section: "Investing Fundamentals",
    question: "What is diversification?",
    answer:
      'Spreading investments across different asset types, sectors, and geographies to reduce risk. "Don\'t put all your eggs in one basket" — if one investment falls, others may hold steady.',
    weight: 1,
  },
  {
    id: "q19",
    section: "Investing Fundamentals",
    question: "What is risk tolerance?",
    answer:
      "Your ability and willingness to endure investment losses. Depends on your time horizon, financial stability, and emotional comfort with volatility. Younger investors can typically take more risk.",
    weight: 1,
  },
  {
    id: "q20",
    section: "Investing Fundamentals",
    question: "What is dollar-cost averaging?",
    answer:
      "Investing a fixed amount at regular intervals regardless of market price. You buy more shares when prices are low and fewer when high, reducing the impact of volatility over time.",
    weight: 1,
  },
  {
    id: "q21",
    section: "Investing Fundamentals",
    question:
      'Why is "time in the market" better than "timing the market"?',
    answer:
      "Missing just the 10 best market days over 20 years can cut returns in half. Consistent investing beats trying to predict market highs and lows, which even professionals fail at reliably.",
    weight: 1,
  },

  // Earning & Negotiation
  {
    id: "q22",
    section: "Earning & Negotiation",
    question: "How do you research your market rate?",
    answer:
      "Use sites like Glassdoor, Levels.fyi, Payscale, and LinkedIn Salary. Look at your role, experience level, location, and industry. Talk to recruiters and peers for real-world data.",
    weight: 1,
  },
  {
    id: "q23",
    section: "Earning & Negotiation",
    question: "What is total compensation?",
    answer:
      "Your complete pay package beyond base salary: bonuses, equity/stock options, retirement matching, health insurance, PTO, and other benefits. Always negotiate on total comp, not just salary.",
    weight: 1,
  },
  {
    id: "q24",
    section: "Earning & Negotiation",
    question: "What is anchoring in negotiation?",
    answer:
      "The first number mentioned sets the reference point for the entire negotiation. Research suggests the party who anchors first often gets a better outcome — so name your number confidently.",
    weight: 1,
  },
  {
    id: "q25",
    section: "Earning & Negotiation",
    question: "Why have multiple income streams?",
    answer:
      "Reduces dependence on a single employer, provides financial resilience, accelerates wealth building, and can turn skills into scalable assets. Even one side stream significantly improves financial security.",
    weight: 1,
  },
];

export const sections = [...new Set(questions.map((q) => q.section))];
