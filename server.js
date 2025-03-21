const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.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, // API Key stored securely
}));

app.post("/api/chatbot", async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: userMessage,
            max_tokens: 50,
        });

        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: "Error processing request" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
