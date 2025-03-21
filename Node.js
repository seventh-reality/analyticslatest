const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Load API key from .env file

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/chatbot", async (req, res) => {
    const userMessage = req.body.message;
    
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 50
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        res.json({ reply: response.data.choices[0].message.content.trim() });
    } catch (error) {
        res.status(500).json({ reply: "Error connecting to AI" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
