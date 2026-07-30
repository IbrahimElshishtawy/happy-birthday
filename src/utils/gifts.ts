export interface Gift {
  id: number;
  title: string;
  emoji: string;
  ribbonColor: string;
  boxColor: string;
  content: {
    type: 'message' | 'photo' | 'video';
    text?: string;
    mediaUrl?: string;
  };
}

export const gifts: Gift[] = [
  {
    id: 1,
    title: "Gift of Words",
    emoji: "💌",
    ribbonColor: "from-pink-400 to-rose-500",
    boxColor: "from-pink-100 to-rose-100",
    content: {
      type: 'message',
      text: "You are the definition of grace. From the way you carry yourself to the way you treat others — everything about you is remarkable. This gift is a reminder that you are loved beyond measure, not just today, but every single day. Happy Birthday, beautiful! 💕",
    },
  },
  {
    id: 2,
    title: "Gift of Memory",
    emoji: "📸",
    ribbonColor: "from-purple-400 to-violet-500",
    boxColor: "from-purple-100 to-violet-100",
    content: {
      type: 'message',
      text: "Every photo we've taken together holds a universe of memories. Every laugh captured, every smile frozen in time — these are our treasures. Thank you for filling my camera roll and my heart with the most beautiful memories. 🌸",
    },
  },
  {
    id: 3,
    title: "Gift of Dreams",
    emoji: "⭐",
    ribbonColor: "from-amber-400 to-orange-400",
    boxColor: "from-amber-100 to-orange-100",
    content: {
      type: 'message',
      text: "This gift is a promise — a promise to support every dream you have, to cheer you on through every challenge, and to celebrate every victory with you. Your dreams are valid, your ambitions are worthy, and I believe in you with every fiber of my being. Shoot for the stars, Rola! ✨🚀",
    },
  },
];
