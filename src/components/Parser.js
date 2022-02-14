import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const removeStopWords = (words, stopWords) => {
  let newArray = [];
  words.forEach((word) => {
    if (!stopWords.includes(word)) {
      newArray.push(word);
    }
  });
  return newArray;
};

const findWord = (wordToFind, synonyms) => {
  for (var i = 0; i < synonyms.length; i++) {
    let words = synonyms[i].words.split(" ");

    for (var j = 0; j < words.length; j++) {
      if (wordToFind === words[j]) {
        return { status: true, type: synonyms[i].type, word: words[0] }; // return first word
      }
    }
  }

  return { status: false, type: "", word: "" };
};

const Parser = ({ prompt }) => {
  const { tell, commandHistory, performAction, synonyms, stopWords } =
    useGlobalContext();

  const processCommand = () => {
    const command = commandHistory[commandHistory.length - 1];
    tell(prompt + command);

    let tempPayload = {
      success: false,
      message: "",
      pAction: "",
      pObject: "",
      pIndirectObject: "",
    };

    // check for no commands first, exit early
    if (command.length === 0 || command.replace(/\s+/g, "").length === 0) {
      tell("I beg your pardon?");
      return false;
      //return { ...tempPayload, success: false, message: "I beg your pardon?" };
    }

    // step 1 - slit command into separate words and remove any "stop words" (a the an, etc...)
    const cleanedCommands = removeStopWords(command.split(" "), stopWords);
    // classify all words (verb, object, indirect Object) - fail for any unknown words: I don't know the word "<unknown_word>".
    let verbs = [];
    let nouns = [];
    let preps = [];
    let directions = [];
    let failureMessage = "";
    let tokenizedCommands = [];

    const success = cleanedCommands.every((word) => {
      const wordFound = findWord(word, synonyms);
      console.log("wordFound", wordFound);
      if (!wordFound.status) {
        failureMessage = `I don't know the word "${word}".`;
        return false;
      } else {
        if (wordFound.type === "VERB") {
          verbs.push(wordFound.word);
          tokenizedCommands.push(wordFound.word);
        }
        if (wordFound.type === "NOUN") {
          nouns.push(wordFound.word);
          tokenizedCommands.push("OBJECT");
        }
        if (wordFound.type === "DIRECTION") {
          directions.push(wordFound.word);
          tokenizedCommands.push(wordFound.word);
        }
        if (wordFound.type === "PREP") {
          preps.push(wordFound.word);
          tokenizedCommands.push(wordFound.word);
        }
      }
      return true;
    });

    if (success) {
      if (cleanedCommands.length === 1 && directions.length === 1) {
        return {
          ...tempPayload,
          success: true,
          pAction: "WALK",
          pObject: directions[0],
        };
      }
      if (directions.length > 1) {
        return {
          ...tempPayload,
          message: `You used the word "${directions[0]}" in a way that I don't understand.`,
        };
      }
      if (verbs.length === 0) {
        return {
          ...tempPayload,
          message: "There was no verb in that sentense!",
        };
      }

      if (verbs.length === 1 && cleanedCommands.length === 1) {
        return { ...tempPayload, success: true, pAction: verbs[0] };
      }

      // if (verbs.length === 1){
      //   const tempcommand = gameAssets.syntax.filter(
      //     (syntax) => syntax.phrase === verbs[0]
      //   );

      //   if (tempcommand.length > 0) {
      //     return {
      //       ...tempPayload,
      //       success: true,
      //       pAction: tempcommand[0].fnc,
      //     };
      //   } else {
      //     return { ...tempPayload, message: "No action was taken." };
      //   }
      // }
    }

    return { ...tempPayload, message: failureMessage };
  };

  useEffect(() => {
    if (commandHistory.length > 0) {
      const { success, message, pAction, pObject, pIndirectObject } =
        processCommand();
      if (success) {
        performAction(pAction, pObject, pIndirectObject);
      } else {
        tell(message, true);
      }
    }
  }, [commandHistory]);

  return <></>;
};

export default Parser;
