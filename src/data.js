// export const syntax = [
//   {
//     phrase: "CLEAR",
//     action: "V-CLEAR-SCREEN",
//     runner: () => {
//       console.log("v-clear-screen runner");
//     },
//   },
//   {
//     phrase: "HELLO",
//     action: "V-HELLO",
//     runner: () => {
//       console.log("v-hello runner");
//     },
//   },
// ];

export const synonyms = [
  { type: "VERB", words: "CLEAR CLR WIPE" },
  { type: "VERB", words: "HELLO HI YO HOWDY" },
  { type: "VERB", words: "YELL SHOUT" },
  { type: "VERB", words: "LOOK L" },
  { type: "NOUN", words: "LAMP LIGHT LANTERN" },
  { type: "PREP", words: "AT TO" },
  { type: "PREP", words: "ON ONTO" },
  { type: "PREP", words: "IN INTO INSIDE" },
  { type: "PREP", words: "WITH USING" },
  { type: "PREP", words: "UNDER BELOW BENEATH UNDERNEATH" },
  { type: "DIRECTION", words: "NORTH N" },
  { type: "DIRECTION", words: "SOUTH S" },
  { type: "DIRECTION", words: "EAST E" },
  { type: "DIRECTION", words: "WEST W" },
  { type: "DIRECTION", words: "NORTHWEST NW" },
  { type: "DIRECTION", words: "NORTHEAST NE" },
  { type: "DIRECTION", words: "SOUTWEST SW" },
  { type: "DIRECTION", words: "SOUTHEAST E" },
  { type: "DIRECTION", words: "UP U" },
  { type: "DIRECTION", words: "DOWN D" },
];

export const synonmys_map = () => {
  let wordMap = new Map();

  for (let obj of synonyms) {
    const wordType = obj.type;
    const words = obj.words.split(" ");
    const keyWord = words[0];
    for (let word of words) {
      wordMap.set(word, { type: wordType, keyWord: keyWord });
    }
  }
  return wordMap;
};

export const stopWords = ["THE", "A", "AN"];

const WEST_OF_HOUSE = {
  name: "WEST-OF-HOUSE",
  in: "ROOMS",
  desc: "West of House",
  exits: [
    { dir: "NORTH", type: "UEXIT", to: "NORTH-OF-HOUSE" },
    { dir: "SOUTH", type: "UEXIT", to: "SOUTH-OF-HOUSE" },
  ],
  action: "",
};

const rooms = [
  {
    name: "WEST-OF-HOUSE",
    in: "ROOMS",
    desc: "West of House",
    exits: [
      { dir: "NORTH", type: "UEXIT", to: "NORTH-OF-HOUSE" },
      { dir: "SOUTH", type: "UEXIT", to: "SOUTH-OF-HOUSE" },
    ],
    action: "",
  },
  {
    name: "NORTH-OF-HOUSE",
    in: "ROOMS",
    desc: "North of House",
    exit: [
      { dir: "WEST", type: "UEXIT", to: "WEST-OF-HOUSE" },
      { dir: "EAST", type: "UEXIT", to: "EAST-OF-HOUSE" },
    ],
    action: "",
  },
  {
    name: "EAST-OF-HOUSE",
    in: "ROOMS",
    desc: "East of House",
    exits: [
      { dir: "NORTH", type: "UEXIT", to: "NORTH-OF-HOUSE" },
      { dir: "SOUTH", type: "UEXIT", to: "SOUTH-OF-HOUSE" },
    ],
    action: "",
  },
  {
    name: "SOUTH-OF-HOUSE",
    in: "ROOMS",
    desc: "South of House",
    exit: [
      { dir: "WEST", type: "UEXIT", to: "WEST-OF-HOUSE" },
      { dir: "EAST", type: "UEXIT", to: "EAST-OF-HOUSE" },
    ],
    action: "",
  },
];

const objects = [
  { name: "NOT-HERE-OBJECT", desc: "such thing", synonyms: "", action: "" },
  {
    name: "STAIRS",
    desc: "stairs",
    synonyms: "STAIRS STEPS STAIRCASE STAIRWAY",
    action: "",
  },
  { name: "ME", synonyms: "ME MYSELF SELF" },
];

const routines = [{ name: "V-HELLO", action: "SAY" }];
