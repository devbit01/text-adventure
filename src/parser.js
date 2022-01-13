/* eslint-disable import/no-anonymous-default-export */

const syntax_list = [
  { verb: "CLEAR", action: "V-CLEAR-SCREEN" },
  { verb: "HELLO", action: "V-HELLO" },
];

const synonyms = [
  { type: "VERB", words: ["CLEAR", "CLR", "WIPE"] },
  { type: "VERB", words: ["HELLO", "HI", "YO", "HOWDY"] },
  { TYPE: "NOUN", words: ["LAMP", "LIGHT", "LANTERN"] },
];
const rooms = [{ name: "room1" }];
const objects = [{ name: "object1" }];
const routines = [{ name: "V-HELLO", action: "SAY" }];

const findWord = (wordToFind) => {
  for (var i = 0; i < synonyms.length; i++) {
    let words = synonyms[i].words;
    for (var j = 0; j < words.length; j++) {
      if (wordToFind === words[j]) {
        return { status: true, type: synonyms[i].type, word: words[0] }; // return first word
      }
    }
  }

  return { status: false, type: "", word: "" };
};

export default (command, state) => {
  let tempPayload = {
    success: false,
    message: "",
    pAction: "",
    pObject: "",
    pIndirectObject: "",
  };

  const components = { HELLO: "HELLO", HI: "HELLO" };

  console.log("testing...", components[command]);

  // check for no commands first, exit early
  if (command.length === 0 || command.replace(/\s+/g, "").length === 0) {
    return { ...tempPayload, success: false, message: "I beg your pardon?" };
  }

  const wordFound = findWord(command);

  if (wordFound.status) {
    const tempcommand = syntax_list.filter(
      (syntax) => syntax.verb === wordFound.word
    );

    return { ...tempPayload, success: true, pAction: tempcommand[0].action };
  }

  return { ...tempPayload, message: `I don't know the word "${command}"` };
};
