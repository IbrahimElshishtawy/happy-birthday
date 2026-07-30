export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  emoji: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is Rola's favorite color? 🎨",
    options: ["Ocean Blue", "Rose Pink 🌸", "Emerald Green", "Sunset Orange"],
    correctIndex: 1,
    explanation: "Of course it's Rose Pink! It matches her beautiful personality perfectly! 💕",
    emoji: "🌸",
  },
  {
    id: 2,
    question: "What is Rola's superpower? ✨",
    options: ["Speed", "Invisibility", "Making everyone smile 😊", "Time travel"],
    correctIndex: 2,
    explanation: "She can brighten any room and make anyone smile — that's a true superpower! ✨",
    emoji: "😊",
  },
  {
    id: 3,
    question: "If Rola could travel anywhere right now, where would she go? 🌍",
    options: ["Paris 🗼", "Tokyo 🗾", "Maldives 🏝️", "New York 🗽"],
    correctIndex: 0,
    explanation: "The city of love, romance, and beauty — just like Rola herself! 🗼💕",
    emoji: "🗼",
  },
  {
    id: 4,
    question: "What's the best way to describe Rola in one word? 💫",
    options: ["Ordinary", "Magnificent ✨", "Average", "Just okay"],
    correctIndex: 1,
    explanation: "Magnificent is the only word that even comes close! She's extraordinary! 👑",
    emoji: "✨",
  },
  {
    id: 5,
    question: "What does Rola deserve on her birthday? 🎂",
    options: ["Nothing special", "A small card", "Everything beautiful in the world 💝", "A quick text"],
    correctIndex: 2,
    explanation: "She deserves the entire universe! Every blessing, every joy, every beautiful thing! 🌟",
    emoji: "🎂",
  },
];
