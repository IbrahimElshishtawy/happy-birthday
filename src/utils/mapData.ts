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
    name: "Cairo & Alexandria",
    country: "Egypt 🇪🇬",
    emoji: "🌅",
    memory: "Home sweet home — where our love story and coastal memories began 💕",
    x: 56,
    y: 43,
    visited: true,
  },
  {
    id: 2,
    name: "Maldives (المالديف)",
    country: "Maldives 🇲🇻",
    emoji: "🏝️",
    memory: "Our #1 dream paradise! Turquoise waters, overwater bungalows & endless ocean views 🌊",
    x: 70,
    y: 54,
    visited: false,
    dream: true,
  },
  {
    id: 3,
    name: "Switzerland (سويسرا)",
    country: "Switzerland 🇨🇭",
    emoji: "🏔️",
    memory: "Snowy Alps, green valleys & scenic train rides through heaven on Earth ❄️",
    x: 48,
    y: 27,
    visited: false,
    dream: true,
  },
  {
    id: 4,
    name: "Hawaii (هاواي)",
    country: "USA 🇺🇸",
    emoji: "🌺",
    memory: "Tropical beaches, golden sunsets, surfing & island adventures 🏄‍♀️",
    x: 12,
    y: 45,
    visited: false,
    dream: true,
  },
  {
    id: 5,
    name: "United States (أمريكا)",
    country: "USA 🇺🇸",
    emoji: "🗽",
    memory: "New York lights, California coast & an epic road trip after military service 🫡🚗",
    x: 22,
    y: 33,
    visited: false,
    dream: true,
  },
  {
    id: 6,
    name: "Coastal Havens (الأماكن الساحلية)",
    country: "World Beaches 🏖️",
    emoji: "🌊",
    memory: "Anywhere with sea, sand, sunsets & Rola's joyful smile 💕",
    x: 62,
    y: 43,
    visited: false,
    dream: true,
  },
];
