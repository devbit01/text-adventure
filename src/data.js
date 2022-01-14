export const syntax = [
  { verb: "CLEAR", action: "V-CLEAR-SCREEN" },
  { verb: "HELLO", action: "V-HELLO" },
];

export const synonyms = [
  { type: "VERB", words: ["CLEAR", "CLR", "WIPE"] },
  { type: "VERB", words: ["HELLO", "HI", "YO", "HOWDY"] },
  { type: "VERB", words: ["YELL", "SHOUT"] },
  { type: "NOUN", words: ["LAMP", "LIGHT", "LANTERN"] },
  { type: "PREP", words: ["AT"] },
  { type: "PREP", words: ["ON", "ONTO"] },
  { type: "PREP", words: ["IN", "INTO", "INSIDE"] },
  { type: "PREP", words: ["WITH", "USING"] },
  { type: "PREP", words: ["UNDER", "BELOW", "BENEATH", "UNDERNEATH"] },
  { type: "DIRECTION", words: ["NORTH", "N"] },
  { type: "DIRECTION", words: ["SOUTH", "S"] },
  { type: "DIRECTION", words: ["EAST", "E"] },
  { type: "DIRECTION", words: ["WEST", "W"] },
  { type: "DIRECTION", words: ["NORTHWEST", "NW"] },
  { type: "DIRECTION", words: ["NORTHEAST", "NE"] },
  { type: "DIRECTION", words: ["SOUTWEST", "SW"] },
  { type: "DIRECTION", words: ["SOUTHEAST", "E"] },
  { type: "DIRECTION", words: ["UP", "U"] },
  { type: "DIRECTION", words: ["DOWN", "D"] },
];

export const stopWords = ["THE", "A", "AN"];

const rooms = [{ name: "room1" }];
const objects = [{ name: "object1" }];
const routines = [{ name: "V-HELLO", action: "SAY" }];
