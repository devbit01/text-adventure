// *************************************************************
// ROOMS
// *************************************************************

export const rooms = [
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
// *************************************************************
// OBJECTS
// *************************************************************
export const objects = [
  { name: "NOT-HERE-OBJECT", desc: "such thing", synonyms: "", action: "" },
  {
    name: "STAIRS",
    desc: "stairs",
    synonyms: "STAIRS STEPS STAIRCASE STAIRWAY",
    action: "",
  },
  { name: "ME", synonyms: "ME MYSELF SELF" },
];

// *************************************************************
// VERBS
// *************************************************************
const V_LOOK = () => {
  // let's describe the room and the objects
  return DESCRIBE_ROOM() && DESCRIBE_OBJECTS();
};

const V_WALK = () => {
  //return this.gameEngine.tell("Walking..");
};

const DESCRIBE_ROOM = () => {
  //this.gameEngine.tell(this.gameEngine.here().desc);
  return true;
};

const DESCRIBE_OBJECTS = () => {
  return true;
};

// *************************************************************
// SYNTAX
// *************************************************************

export const syntax = [
  {
    phrase: "CLEAR",
    action: "V-CLEAR-SCREEN",
    fnc: () => {
      //this.gameEngine.clear();
      return true;
    },
  },
  {
    phrase: "HELLO",
    action: "V-HELLO",
    fnc: () => {
      this.gameEngine.tell(
        this.gameEngine.chooseOne([
          "Hi!",
          "Hey there!",
          "Good day to you!",
          "Hello!",
          "You whistle...what a great day!",
        ])
      );
      return true;
    },
  },
  { phrase: "WALK", action: "V-WALK", fnc: V_WALK },
  {
    phrase: "LOOK",
    action: "V-LOOK",
    fnc: () => {
      V_LOOK();
      return false;
    },
  },
];
