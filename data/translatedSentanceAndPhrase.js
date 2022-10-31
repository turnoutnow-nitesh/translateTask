const fs = require("fs");
const writeJSON = (filename, data) => fs.writeFileSync(filename, JSON.stringify(data));
const { getSentances, getPhrases } = require("../handlers/translate/createSentanceAndPhrases");
let translatedDataP = fs.readFileSync("../responses/frenchPhrase.txt", "utf-8");
let translatedDataS = fs.readFileSync("../responses/frenchSentance.txt", "utf-8");
const sentance = getSentances();
const phrase = getPhrases();

const regex = /[\[|\]|\}]+/;
const translatedSentance = () => {
    const translatedArr = translatedDataS.split(regex);
    for (let i = 0; i < translatedArr.length; i++) {
        if (translatedArr[i] == '' || translatedArr[i] === ' ' || translatedArr[i] === '. ' || translatedArr[i] === '.') {
            translatedArr.splice(i, 1);
        }
    }

    for (let i = 0; i < translatedArr.length; i++) {
        sentance[i].sentance = translatedArr[i];
    }
}

const translatedPhrase = () => {
    const translatedArr = translatedDataP.split(regex);
    for (let i = 0; i < translatedArr.length; i++) {
        if (translatedArr[i] == '' || translatedArr[i] === ' ' || translatedArr[i] === '. ' || translatedArr[i] === '.') {
            translatedArr.splice(i, 1);
        }
    }

    for (let i = 0; i < translatedArr.length; i++) {
        phrase[i].phrase = translatedArr[i];
    }
}

translatedPhrase();
translatedSentance();

writeJSON("../responses/phrase.json",phrase);
writeJSON("../responses/sentance.json",sentance);



