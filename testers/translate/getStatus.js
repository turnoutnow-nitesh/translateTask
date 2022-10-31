const { handler } = require("../../handlers/translate/getStatus");

// Get the Transcription Status
(async () => {
    const response = await handler();
    console.log("Translation job status is", response.JobStatus);
})();