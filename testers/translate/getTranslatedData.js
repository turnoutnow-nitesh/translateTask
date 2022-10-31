const { handler } = require("../../handlers/translate/getTranslatedData");
const fs = require("fs");

(async () => {
    const bucketName = "turnoutnow-onboarding";
    const fileContent = await handler(bucketName, "Nitesh/output/711974519606-TranslateText-55b4944f753c0d94a68bc6a1b1d48ec0/fr.sentance.txt");
    console.log(fileContent);
    // writeJSON("../../responses/spanish.txt", fileContent);
    fs.writeFileSync("../../responses/frenchSentance.txt", fileContent);
})();