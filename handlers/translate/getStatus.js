const { getStatus } = require("../../data/translate");

exports.handler = async () => {
    const region = "us-east-1";
    const params = {
        JobId: "4483365edfdf6d5dc0b9f7633d65a198",
    };
    try {
        const translateResponse = await getStatus(region, params);
        return translateResponse.TextTranslationJobProperties;
    } catch (err) {
        console.log(err);
    }
}
