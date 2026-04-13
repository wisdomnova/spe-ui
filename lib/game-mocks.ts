/* ── Playful taunts for the games ── */

/** When a player quits mid-game */
export const QUIT_MOCKS = [
  "Already? The emojis weren't even that hard yet.",
  "Your keyboard must be tired. Take a break.",
  "Brave of you to walk away with that score.",
  "The leaderboard isn't going to miss you. Just saying.",
  "Quitting is a valid strategy. Not a winning one, but valid.",
  "You know what they say: winners never quit. But also, here we are.",
  "That's okay. Not everyone can handle the pressure.",
  "Wow, that was quick. Even the timer is confused.",
  "Fun fact: the game was about to get easier. Just kidding.",
  "Understandable. Those emojis were looking at you funny.",
  "The quit button appreciates being noticed for once.",
  "Solid exit. Very graceful. 10/10 quitting form.",
  "Your future self is watching this moment and sighing.",
  "Plot twist: the next answer was going to be really obvious.",
  "Well, at least you showed up. Participation points.",
];

/** When a player gives a wrong answer */
export const WRONG_MOCKS = [
  "Nope. Not even close.",
  "Interesting guess. Wrong, but interesting.",
  "The emojis are literally right there.",
  "Your autocorrect could've done better.",
  "Are you even looking at the screen?",
  "That answer has never been right. Anywhere. Ever.",
  "Bold guess. Wrong, but bold.",
  "The emojis just flinched reading that answer.",
  "You just made a random combination of letters, didn't you?",
  "Try using your eyes this time.",
  "That's what we call a confident wrong answer.",
  "Close! Just kidding. Not close at all.",
  "Even a coin flip has better odds than that.",
  "The hint button is right there. Just saying.",
  "Somewhere, a teacher is very disappointed.",
];

/** When time runs out */
export const TIMEOUT_MOCKS = [
  "Time's up. The clock has no mercy.",
  "And just like that, it's over. Dramatic, isn't it?",
  "60 seconds felt like 10, huh?",
  "The timer waits for no one. Especially not you.",
  "Well, that went by fast. Unlike your answers.",
  "Game over. The emojis have been liberated.",
  "Time flies when you're struggling.",
  "If only you were as fast as the timer.",
  "The clock didn't even break a sweat.",
  "That was 60 seconds of pure entertainment. For the emojis.",
  "And the timer wins again. Undefeated champion.",
  "Tick tock. Tick tock. Gone.",
  "Your reflexes said 'maybe next time.'",
  "60 seconds of glory. Or whatever that was.",
  "The countdown has spoken. Better luck next round.",
];

/** When a player quits reaction test mid-round */
export const REACTION_QUIT_MOCKS = [
  "Leaving? Your reflexes must be on vacation.",
  "Quitting before all 5 rounds? Bold strategy.",
  "The green screen is going to miss you.",
  "Your fingers called in sick, huh?",
  "That's okay. Speed isn't for everyone.",
  "Even the loading spinner is faster at this point.",
  "Understandable. Blinking takes effort too.",
  "The start button is still warm. Come back.",
  "Your reaction time to the quit button was impressive, though.",
  "Fun fact: turtles also take breaks.",
  "Well, at least your quit-button reflexes are fast.",
  "Not everyone is built for this. And that's fine. Sort of.",
  "The leaderboard will remember this. Actually no, it won't.",
  "Your cat could still beat that time. No offense.",
  "Taking a tactical retreat. Respect.",
];

/** When a player's barrel stack collapses */
export const STACKER_COLLAPSE_MOCKS = [
  "That stack had so much potential. And then you happened.",
  "Gravity: 1. You: 0.",
  "The barrels are filing a complaint.",
  "That was almost impressive. Almost.",
  "Your stacking career just peaked. Downhill from here.",
  "Even Jenga players are laughing right now.",
  "The barrel industry is in mourning.",
  "Bold of you to think that would land.",
  "Physics called. It wants its dignity back.",
  "That tower had dreams. You crushed them.",
  "Somewhere, a petroleum engineer just cringed.",
  "Stack overflow. Literally.",
  "The floor is lava. And your barrels just found out.",
  "Your timing is... unique. Let's go with unique.",
  "Plot twist: the barrel was never going to fit there.",
];

/** When a player quits barrel stacker mid-game */
export const STACKER_QUIT_MOCKS = [
  "Quitting? The barrels were just warming up.",
  "Your tower was one barrel away from greatness. Probably.",
  "Walking away from a stack that small? Bold.",
  "The barrels will remember this betrayal.",
  "That's fine. Not everyone can handle the pressure of stacking.",
  "Even a toddler with blocks lasted longer.",
  "The leaderboard just breathed a sigh of relief.",
  "Tactical retreat? More like tactical defeat.",
  "Your barrel stacking privileges have been noted.",
  "The oil industry thanks you for your brief service.",
  "Understandable. Those barrels were intimidating.",
  "Quitting is free. And so was that performance.",
  "Come back when your timing is less... you.",
  "The stack was unstable anyway. Like your commitment.",
  "Speed round champion of quitting.",
];

/** Pick a random mock from any array */
export function getRandomMock(mocks: string[]): string {
  return mocks[Math.floor(Math.random() * mocks.length)];
}
