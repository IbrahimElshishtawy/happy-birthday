export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
  emoji: string;
  color: string;
  image?: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "The Day We First Met",
    date: "A Beautiful Day",
    description: "The universe conspired to bring two souls together. That first meeting changed everything — little did we know it would be the beginning of something extraordinary.",
    emoji: "✨",
    color: "from-pink-400 to-rose-400",
  },
  {
    id: 2,
    title: "Our First Adventure",
    date: "Early Days",
    description: "We packed our bags, left worries behind, and explored the world together. Every step felt like magic when shared with you.",
    emoji: "🌍",
    color: "from-purple-400 to-pink-400",
  },
  {
    id: 3,
    title: "A Day I'll Never Forget",
    date: "A Special Moment",
    description: "Some days etch themselves into your memory forever. This was one of those days — perfect in every detail, perfect because you were there.",
    emoji: "💫",
    color: "from-amber-400 to-pink-400",
  },
  {
    id: 4,
    title: "Through the Challenges",
    date: "Together Always",
    description: "Life isn't always easy, but having you beside me made every hard day worth fighting through. Your strength inspires me every single day.",
    emoji: "💪",
    color: "from-rose-400 to-purple-400",
  },
  {
    id: 5,
    title: "Celebrating Milestones",
    date: "Growing Together",
    description: "Every achievement, big or small, becomes sweeter when celebrated with someone who believes in you completely. Thank you for always being my biggest cheerleader.",
    emoji: "🏆",
    color: "from-pink-400 to-amber-400",
  },
  {
    id: 6,
    title: "Today — Your Special Day",
    date: "Your Birthday 🎂",
    description: "Here we are, celebrating YOU — the most wonderful person I know. This day belongs to you, Rola. Happy Birthday, darling! 💕",
    emoji: "🎂",
    color: "from-primary to-secondary",
  },
];
