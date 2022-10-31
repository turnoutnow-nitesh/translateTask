const { startTranslation, uploadS3Object } = require("../../data/translate");
const fs = require("fs"); 

exports.handler = async () => {

    // Upload a new file onto S3 bucket
    (async () => {
        const bucketName = "turnoutnow-onboarding";
        const fileContent = fs.readFileSync("../../file/sentanceText.txt");
        const objectKey = `Nitesh/translateInput/sentance.txt`;
        const ContentType = "text/plain";
        await uploadS3Object(bucketName, fileContent, objectKey, ContentType);
    })();

    // Starting the translation job

    const region = "us-east-1";
    const params = {
        JobName: "translate1",
        DataAccessRoleArn: "arn:aws:iam::711974519606:role/translate-batch-role",
        InputDataConfig: {
            ContentType: "text/plain",
            S3Uri: "s3://turnoutnow-onboarding/Nitesh/translateInput"
        },
        OutputDataConfig: {
            S3Uri: "s3://turnoutnow-onboarding/Nitesh/output"
        },
        SourceLanguageCode: "en",
        TargetLanguageCodes: ["fr"],
    };
    try {
        const translateResponse = await startTranslation(region, params);
        return translateResponse;
    } catch (err) {
        console.log(err);
    }
}

