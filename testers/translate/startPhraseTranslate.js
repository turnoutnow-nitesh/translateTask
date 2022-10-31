const { handler } = require("../../handlers/translate/startPhraseTranslate");

(async () => {
    const response = await handler();
    console.log("Translation job created, the details:");
    console.log(response);
})();