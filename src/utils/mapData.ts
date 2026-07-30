export interface MapPin {
  id: number;
  name: string;
  country: string;
  emoji: string;
  memory: string;
  x: number; // percentage from left
  y: number; // percentage from top
  visited: boolean;
  dream?: boolean;
}

export const mapPins: MapPin[] = [
  {
    id: 1,
    name: "Cairo",
    country: "Egypt 🇪🇬",
    emoji: "🏛️",
    memory: "Home sweet home — where our story began",
    x: 56,
    y: 43,
    visited: true,
  },
  {
    id: 2,
    name: "Paris",
    country: "France 🇫🇷",
    emoji: "🗼",
    memory: "Dream destination — the City of Love awaits us",
    x: 46,
    y: 28,
    visited: false,
    dream: true,
  },
  {
    id: 3,
    name: "Dubai",
    country: "UAE 🇦🇪",
    emoji: "🌆",
    memory: "Golden lights, golden memories",
    x: 62,
    y: 43,
    visited: true,
  },
  {
    id: 4,
    name: "Istanbul",
    country: "Turkey 🇹🇷",
    emoji: "🕌",
    memory: "Where East meets West, just like us",
    x: 55,
    y: 31,
    visited: true,
  },
  {
    id: 5,
    name: "Maldives",
    country: "Maldives 🇲🇻",
    emoji: "🏝️",
    memory: "Paradise on Earth — our dream escape",
    x: 70,
    y: 54,
    visited: false,
    dream: true,
  },
  {
    id: 6,
    name: "Rome",
    country: "Italy 🇮🇹",
    emoji: "🏺",
    memory: "All roads lead to Rome — and to you",
    x: 50,
    y: 31,
    visited: false,
    dream: true,
  },
  {
    id: 7,
    name: "Santorini",
    country: "Greece 🇬🇷",
    emoji: "⛵",
    memory: "Blue domes and white walls — a dream together",
    x: 54,
    y: 33,
    visited: false,
    dream: true,
  },
];
