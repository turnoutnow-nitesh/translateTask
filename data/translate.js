const fs = require("fs");
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { TranslateClient, StartTextTranslationJobCommand, DescribeTextTranslationJobCommand } = require("@aws-sdk/client-translate");
const { getsentanceText, getPhraseText } = require("../handlers/translate/createSentanceAndPhrases");
const sentanceText = getsentanceText();
const phraseText = getPhraseText()
fs.writeFileSync("../../file/sentanceText.txt", sentanceText);
fs.writeFileSync("../../file/phraseText.txt", phraseText);

exports.writeJSON = (filename, data) => fs.writeFileSync(filename, JSON.stringify(data));

exports.uploadS3Object = async (bucketName, fileContent, objectKey, ContentType) => {
    const input = {
        Bucket: bucketName,
        Key: objectKey,
        Body: fileContent,
        ContentType: ContentType
    };

    const s3Client = new S3Client();
    try {
        const s3Response = await s3Client.send(new PutObjectCommand(input));
        return s3Response;
    } catch (error) {
        console.log(`Error while uploading file to S3 for ${objectKey}`, error);
    }
};


exports.getFileObjectFromS3 = async (bucket, key) => {
    const params = {
        Bucket: bucket,
        Key: key
    };

    const getObjectCommand = new GetObjectCommand(params);
    const s3Client = new S3Client();
    try {
        const s3Response = await s3Client.send(getObjectCommand);
        return s3Response;
    } catch (error) {
        console.log(`Error while fetching Operation JSON from S3 for ${key}`, error);
    }
};

exports.streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });



exports.startTranslation = async (region, params) => {
    const translateConfig = {
        region,
    };
    const translateClient = new TranslateClient(translateConfig);
    const translateCommand = new StartTextTranslationJobCommand(params);
    try {
        const translateResponse = await translateClient.send(translateCommand);
        return translateResponse;
    } catch (err) {
        console.log(err);
    }
}


exports.getStatus = async (region, params) => {
    const translateConfig = {
        region,
    };
    const translateClient = new TranslateClient(translateConfig);
    const translateCommand = new DescribeTextTranslationJobCommand(params);
    try {
        const translateResponse = await translateClient.send(translateCommand);
        return translateResponse;
    } catch (err) {
        console.log(err);
    }
}
