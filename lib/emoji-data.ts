export interface EmojiPuzzle {
  id: number;
  emojis: string;
  answer: string;
  category: string;
  /** Alternate acceptable answers */
  alternates?: string[];
}

export const CATEGORIES = [
  "Movies",
  "TV Shows",
  "Songs",
  "Countries",
  "Foods",
  "Phrases",
  "Nigerian Culture",
  "Sports",
  "Animals",
  "Books",
  "Occupations",
  "Landmarks",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const EMOJI_PUZZLES: EmojiPuzzle[] = [
  // ── Movies ──────────────────────────────────────────────
  { id: 1, emojis: "🦁👑", answer: "The Lion King", category: "Movies", alternates: ["lion king"] },
  { id: 2, emojis: "🕷️🧑", answer: "Spider-Man", category: "Movies", alternates: ["spiderman", "spider man"] },
  { id: 3, emojis: "🧊🚢💔", answer: "Titanic", category: "Movies" },
  { id: 4, emojis: "👻👻🔫", answer: "Ghostbusters", category: "Movies" },
  { id: 5, emojis: "🌍🦍", answer: "King Kong", category: "Movies" },
  { id: 6, emojis: "🧙‍♂️💍🌋", answer: "Lord of the Rings", category: "Movies", alternates: ["lotr"] },
  { id: 7, emojis: "🦈🌊", answer: "Jaws", category: "Movies" },
  { id: 8, emojis: "⭐🔫🚀", answer: "Star Wars", category: "Movies" },
  { id: 9, emojis: "🤖👍⏰", answer: "Terminator", category: "Movies", alternates: ["the terminator"] },
  { id: 10, emojis: "🏴‍☠️🚢⚓", answer: "Pirates of the Caribbean", category: "Movies", alternates: ["pirates of the carribean"] },
  { id: 11, emojis: "👨‍🚀🌑🚀", answer: "Interstellar", category: "Movies" },
  { id: 12, emojis: "🥊🏆🇮🇹", answer: "Rocky", category: "Movies" },
  { id: 13, emojis: "🦖🏝️🧬", answer: "Jurassic Park", category: "Movies", alternates: ["jurassic world"] },
  { id: 14, emojis: "🔵👤🌿🏹", answer: "Avatar", category: "Movies" },
  { id: 15, emojis: "🧊❄️👸⛄", answer: "Frozen", category: "Movies" },
  { id: 16, emojis: "🃏😈🦇", answer: "The Dark Knight", category: "Movies", alternates: ["dark knight", "batman"] },
  { id: 17, emojis: "🐀👨‍🍳🇫🇷", answer: "Ratatouille", category: "Movies" },
  { id: 18, emojis: "💀🌹🏴‍☠️", answer: "Black Panther", category: "Movies" },
  { id: 19, emojis: "🧪🔬🦎", answer: "The Amazing Spider-Man", category: "Movies", alternates: ["amazing spiderman", "the lizard"] },
  { id: 20, emojis: "🏠🔑👦🎄", answer: "Home Alone", category: "Movies" },
  { id: 21, emojis: "🐉🗡️🔥👸", answer: "Game of Thrones", category: "TV Shows", alternates: ["got"] },
  { id: 22, emojis: "🤠🏜️💊", answer: "Breaking Bad", category: "TV Shows" },
  { id: 23, emojis: "👽🔦🚲", answer: "Stranger Things", category: "TV Shows" },
  { id: 24, emojis: "🏝️💰🎰", answer: "Squid Game", category: "TV Shows" },
  { id: 25, emojis: "👑💎🇬🇧", answer: "The Crown", category: "TV Shows", alternates: ["crown"] },

  // ── Songs ───────────────────────────────────────────────
  { id: 26, emojis: "🎵👦🔥🌧️", answer: "Let It Rain", category: "Songs" },
  { id: 27, emojis: "💃🌟🎤", answer: "Single Ladies", category: "Songs" },
  { id: 28, emojis: "🎸⚡🤘", answer: "Thunderstruck", category: "Songs" },
  { id: 29, emojis: "🌅🎶🏖️", answer: "Summer of 69", category: "Songs", alternates: ["summer of sixty nine"] },
  { id: 30, emojis: "🎤👩‍🦰🔥🏠", answer: "Girl on Fire", category: "Songs" },
  { id: 31, emojis: "🌍🤝✌️", answer: "We Are the World", category: "Songs" },
  { id: 32, emojis: "💜🌧️🎵🕺", answer: "Purple Rain", category: "Songs" },
  { id: 33, emojis: "🚗💨🏎️", answer: "Fast Car", category: "Songs" },
  { id: 34, emojis: "🕺💃🌙", answer: "Dancing in the Moonlight", category: "Songs", alternates: ["dance in the moonlight"] },
  { id: 35, emojis: "🎵😢💔🌧️", answer: "Crying in the Rain", category: "Songs" },

  // ── Countries ───────────────────────────────────────────
  { id: 36, emojis: "🍕🏛️🎭🇮🇹", answer: "Italy", category: "Countries" },
  { id: 37, emojis: "🗼🥐🍷🇫🇷", answer: "France", category: "Countries" },
  { id: 38, emojis: "🏯🍣🌸🗾", answer: "Japan", category: "Countries" },
  { id: 39, emojis: "🐨🦘🏏", answer: "Australia", category: "Countries" },
  { id: 40, emojis: "🌍🟢⚪🟢", answer: "Nigeria", category: "Countries" },
  { id: 41, emojis: "🗽🦅🏈", answer: "America", category: "Countries", alternates: ["usa", "united states", "us"] },
  { id: 42, emojis: "🐂🏟️💃🌞", answer: "Spain", category: "Countries" },
  { id: 43, emojis: "🍁🏒🦫", answer: "Canada", category: "Countries" },
  { id: 44, emojis: "🏏🍛🕌🐅", answer: "India", category: "Countries" },
  { id: 45, emojis: "🐪🏜️🛢️💰", answer: "Saudi Arabia", category: "Countries", alternates: ["saudi"] },
  { id: 46, emojis: "🎭🐘🌴🥁", answer: "Ghana", category: "Countries" },
  { id: 47, emojis: "🐉🏯🥢🧧", answer: "China", category: "Countries" },
  { id: 48, emojis: "⚽🎉🏖️☕", answer: "Brazil", category: "Countries" },

  // ── Foods ───────────────────────────────────────────────
  { id: 49, emojis: "🍚🍅🥩🔥", answer: "Jollof Rice", category: "Foods", alternates: ["jollof"] },
  { id: 50, emojis: "🌽🫘🥘", answer: "Adalu", category: "Foods", alternates: ["beans and corn"] },
  { id: 51, emojis: "🥟🍲🌿", answer: "Egusi Soup", category: "Foods", alternates: ["egusi"] },
  { id: 52, emojis: "🍜🥩🧅🌶️", answer: "Pepper Soup", category: "Foods" },
  { id: 53, emojis: "🍕🧀🍅", answer: "Pizza", category: "Foods" },
  { id: 54, emojis: "🍔🍟🥤", answer: "Burger", category: "Foods", alternates: ["hamburger"] },
  { id: 55, emojis: "🍣🐟🍚", answer: "Sushi", category: "Foods" },
  { id: 56, emojis: "🫔🌶️🧅🥩", answer: "Suya", category: "Foods" },
  { id: 57, emojis: "🥘🍚🌿🐟", answer: "Fisherman Soup", category: "Foods" },
  { id: 58, emojis: "🫓🥜🍲", answer: "Groundnut Soup", category: "Foods", alternates: ["peanut soup"] },
  { id: 59, emojis: "🥞🍯🧈", answer: "Pancakes", category: "Foods", alternates: ["pancake"] },
  { id: 60, emojis: "🍝🍅🧀🌿", answer: "Spaghetti", category: "Foods" },

  // ── Phrases & Idioms ────────────────────────────────────
  { id: 61, emojis: "🐘🏠", answer: "Elephant in the Room", category: "Phrases" },
  { id: 62, emojis: "☁️9️⃣", answer: "Cloud Nine", category: "Phrases", alternates: ["on cloud nine"] },
  { id: 63, emojis: "💔🧊", answer: "Break the Ice", category: "Phrases" },
  { id: 64, emojis: "🌧️🐱🐶", answer: "Raining Cats and Dogs", category: "Phrases" },
  { id: 65, emojis: "🎯🐂👁️", answer: "Bullseye", category: "Phrases", alternates: ["bulls eye", "bull's eye"] },
  { id: 66, emojis: "⏰💣", answer: "Time Bomb", category: "Phrases", alternates: ["ticking time bomb"] },
  { id: 67, emojis: "🐝🦵", answer: "Bees Knees", category: "Phrases", alternates: ["the bees knees", "bee's knees"] },
  { id: 68, emojis: "🍰🧁🎂", answer: "Piece of Cake", category: "Phrases" },
  { id: 69, emojis: "👀🐑", answer: "Black Sheep", category: "Phrases", alternates: ["the black sheep"] },
  { id: 70, emojis: "🎒🐒", answer: "Monkey on Your Back", category: "Phrases" },
  { id: 71, emojis: "💡💡💡", answer: "Bright Idea", category: "Phrases" },
  { id: 72, emojis: "🐔🥚", answer: "Chicken or the Egg", category: "Phrases", alternates: ["chicken and egg"] },

  // ── Nigerian Culture ────────────────────────────────────
  { id: 73, emojis: "🟢⚪🟢🦅", answer: "Nigerian Flag", category: "Nigerian Culture", alternates: ["nigeria flag"] },
  { id: 74, emojis: "🎵🥁💃🇳🇬", answer: "Afrobeats", category: "Nigerian Culture", alternates: ["afrobeat"] },
  { id: 75, emojis: "🛣️🚗🚕😤", answer: "Lagos Traffic", category: "Nigerian Culture", alternates: ["go slow", "traffic"] },
  { id: 76, emojis: "⚡🔦🕯️😒", answer: "NEPA", category: "Nigerian Culture", alternates: ["phcn", "power outage", "no light"] },
  { id: 77, emojis: "💰📱🏦❌", answer: "Transfer Failed", category: "Nigerian Culture", alternates: ["failed transaction"] },
  { id: 78, emojis: "🎓📚😴💤", answer: "Night Class", category: "Nigerian Culture", alternates: ["reading at night"] },
  { id: 79, emojis: "🚌🏃‍♂️💨🚏", answer: "Danfo", category: "Nigerian Culture", alternates: ["molue", "bus"] },
  { id: 80, emojis: "🍛🏪💵🔥", answer: "Mama Put", category: "Nigerian Culture", alternates: ["buka"] },
  { id: 81, emojis: "📱💬🤳👥", answer: "WhatsApp Group", category: "Nigerian Culture", alternates: ["whatsapp"] },
  { id: 82, emojis: "🎉🥳🎶🌙", answer: "Owambe", category: "Nigerian Culture", alternates: ["party"] },
  { id: 83, emojis: "👨‍🏫📖🏫😰", answer: "JAMB", category: "Nigerian Culture", alternates: ["utme"] },
  { id: 84, emojis: "⛪🕌🙏🌅", answer: "Sunday Service", category: "Nigerian Culture", alternates: ["church"] },

  // ── Sports ──────────────────────────────────────────────
  { id: 85, emojis: "⚽🏟️🏆🌍", answer: "World Cup", category: "Sports", alternates: ["fifa world cup"] },
  { id: 86, emojis: "🏀🏀💨🔥", answer: "Basketball", category: "Sports" },
  { id: 87, emojis: "🏎️🏁💨", answer: "Formula 1", category: "Sports", alternates: ["f1", "formula one"] },
  { id: 88, emojis: "🏊‍♂️🚴‍♂️🏃‍♂️", answer: "Triathlon", category: "Sports" },
  { id: 89, emojis: "🥊🔔🏆", answer: "Boxing", category: "Sports" },
  { id: 90, emojis: "🎾🏟️🍓🥛", answer: "Wimbledon", category: "Sports" },
  { id: 91, emojis: "🏈🏟️🎵🇺🇸", answer: "Super Bowl", category: "Sports", alternates: ["superbowl"] },
  { id: 92, emojis: "⛳🏌️‍♂️🟩🕳️", answer: "Golf", category: "Sports" },

  // ── Animals ─────────────────────────────────────────────
  { id: 93, emojis: "🐢🥷🍕", answer: "Teenage Mutant Ninja Turtles", category: "Animals", alternates: ["ninja turtles", "tmnt"] },
  { id: 94, emojis: "🐧❄️🕺🎵", answer: "Happy Feet", category: "Animals" },
  { id: 95, emojis: "🐠🔍🌊", answer: "Finding Nemo", category: "Animals" },
  { id: 96, emojis: "🐝🍯🧸", answer: "Winnie the Pooh", category: "Animals", alternates: ["winnie the pooh bear"] },
  { id: 97, emojis: "🐺🌕🗡️", answer: "Wolverine", category: "Animals" },
  { id: 98, emojis: "🦇🌙🏰", answer: "Dracula", category: "Animals" },
  { id: 99, emojis: "🐒🍌🌴", answer: "Tarzan", category: "Animals" },
  { id: 100, emojis: "🐁👂🏰✨", answer: "Mickey Mouse", category: "Animals" },

  // ── Books ───────────────────────────────────────────────
  { id: 101, emojis: "🧙‍♂️⚡👓📚", answer: "Harry Potter", category: "Books" },
  { id: 102, emojis: "🕳️🐇🎩☕", answer: "Alice in Wonderland", category: "Books", alternates: ["alice's adventures in wonderland"] },
  { id: 103, emojis: "🫖🍰🎩🐇", answer: "Mad Hatter", category: "Books", alternates: ["the mad hatter"] },
  { id: 104, emojis: "📖🕊️🗡️😇", answer: "The Bible", category: "Books", alternates: ["bible"] },
  { id: 105, emojis: "🧪👨‍🔬🧟‍♂️🌙", answer: "Frankenstein", category: "Books" },
  { id: 106, emojis: "🏝️📕👦🐚", answer: "Lord of the Flies", category: "Books" },
  { id: 107, emojis: "🕵️‍♂️🔍💀🏚️", answer: "Sherlock Holmes", category: "Books", alternates: ["sherlock"] },
  { id: 108, emojis: "🌹👸🐻🏰", answer: "Beauty and the Beast", category: "Books" },

  // ── Occupations ─────────────────────────────────────────
  { id: 109, emojis: "🛢️⛽📊🔧", answer: "Petroleum Engineer", category: "Occupations" },
  { id: 110, emojis: "💉🩺🏥👨‍⚕️", answer: "Doctor", category: "Occupations", alternates: ["physician"] },
  { id: 111, emojis: "✈️🧑‍✈️☁️🌍", answer: "Pilot", category: "Occupations" },
  { id: 112, emojis: "👨‍🍳🔥🍳🧂", answer: "Chef", category: "Occupations", alternates: ["cook"] },
  { id: 113, emojis: "⚖️👨‍💼📜🏛️", answer: "Lawyer", category: "Occupations", alternates: ["attorney"] },
  { id: 114, emojis: "🚀👨‍🚀🌙⭐", answer: "Astronaut", category: "Occupations" },
  { id: 115, emojis: "🎨🖌️🖼️✨", answer: "Artist", category: "Occupations", alternates: ["painter"] },
  { id: 116, emojis: "💻👨‍💻🐛🔧", answer: "Software Engineer", category: "Occupations", alternates: ["programmer", "developer"] },

  // ── Landmarks ───────────────────────────────────────────
  { id: 117, emojis: "🗽🇺🇸🌊", answer: "Statue of Liberty", category: "Landmarks" },
  { id: 118, emojis: "🏛️🇬🇷🏔️", answer: "Parthenon", category: "Landmarks", alternates: ["acropolis"] },
  { id: 119, emojis: "🗼✨🇫🇷🌙", answer: "Eiffel Tower", category: "Landmarks" },
  { id: 120, emojis: "🧱🐉🏔️🇨🇳", answer: "Great Wall of China", category: "Landmarks", alternates: ["great wall"] },
  { id: 121, emojis: "🏰🧜‍♀️🇩🇰", answer: "Little Mermaid Statue", category: "Landmarks", alternates: ["little mermaid"] },
  { id: 122, emojis: "🕌💎🇮🇳🤍", answer: "Taj Mahal", category: "Landmarks" },
  { id: 123, emojis: "🏜️🔺🐫🇪🇬", answer: "Pyramids of Giza", category: "Landmarks", alternates: ["pyramids", "great pyramid"] },
  { id: 124, emojis: "🌉🌫️🔴", answer: "Golden Gate Bridge", category: "Landmarks" },

  // ── More Movies ─────────────────────────────────────────
  { id: 125, emojis: "👩‍🦰🧜‍♀️🌊🐠", answer: "The Little Mermaid", category: "Movies", alternates: ["little mermaid"] },
  { id: 126, emojis: "🤴⚔️🏰🐴", answer: "Braveheart", category: "Movies" },
  { id: 127, emojis: "🎭🎵🌹👻", answer: "Phantom of the Opera", category: "Movies", alternates: ["the phantom of the opera"] },
  { id: 128, emojis: "🧞‍♂️🪄🏜️👸", answer: "Aladdin", category: "Movies" },
  { id: 129, emojis: "🌹🐻🏰☕", answer: "Beauty and the Beast", category: "Movies" },
  { id: 130, emojis: "💀🌮🎸🇲🇽", answer: "Coco", category: "Movies" },

  // ── More Phrases ────────────────────────────────────────
  { id: 131, emojis: "🔥👖", answer: "Liar Liar Pants on Fire", category: "Phrases", alternates: ["liar liar"] },
  { id: 132, emojis: "🐦🪱⏰", answer: "Early Bird Gets the Worm", category: "Phrases", alternates: ["early bird"] },
  { id: 133, emojis: "🏠❤️", answer: "Home Sweet Home", category: "Phrases" },
  { id: 134, emojis: "💡🔚🚇", answer: "Light at the End of the Tunnel", category: "Phrases", alternates: ["light at end of tunnel"] },
  { id: 135, emojis: "🐎💀", answer: "Dead Horse", category: "Phrases", alternates: ["beating a dead horse"] },
  { id: 136, emojis: "🧊🧊👶", answer: "Ice Ice Baby", category: "Phrases" },
  { id: 137, emojis: "💰🗣️", answer: "Money Talks", category: "Phrases" },
  { id: 138, emojis: "👁️👁️🗡️", answer: "Eye for an Eye", category: "Phrases", alternates: ["an eye for an eye"] },
  { id: 139, emojis: "🐍✈️", answer: "Snakes on a Plane", category: "Phrases" },
  { id: 140, emojis: "🌈🦄✨", answer: "Over the Rainbow", category: "Phrases", alternates: ["somewhere over the rainbow"] },
];

/** Shuffle an array (Fisher-Yates) */
export function shufflePuzzles(puzzles: EmojiPuzzle[]): EmojiPuzzle[] {
  const arr = [...puzzles];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Check if an answer is correct (case-insensitive, trimmed) */
export function checkAnswer(puzzle: EmojiPuzzle, input: string): boolean {
  const clean = input.trim().toLowerCase();
  if (clean === puzzle.answer.toLowerCase()) return true;
  if (puzzle.alternates?.some((alt) => clean === alt.toLowerCase())) return true;
  return false;
}

/** Get hint: reveals random letters from the answer */
export function getHint(answer: string, revealCount: number): string {
  const chars = answer.split("");
  const indices: number[] = [];
  chars.forEach((ch, i) => {
    if (ch !== " ") indices.push(i);
  });

  // Deterministic reveal based on count
  const toReveal = indices.slice(0, Math.min(revealCount, indices.length));

  return chars
    .map((ch, i) => {
      if (ch === " ") return "  ";
      if (toReveal.includes(i)) return ch.toUpperCase();
      return "_";
    })
    .join(" ");
}
