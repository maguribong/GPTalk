// chatgpt-server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

const OPENAI_API_KEY = 'your_openai_api_key';

app.use(bodyParser.json());

app.post('/api/user-input', async (req, res) => {
    const userInput = req.body.userInput;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: userInput,
                max_tokens: 50,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            },
        );

        const chatGPTResponse = response.data.choices[0].text.trim();
        res.json({ message: chatGPTResponse });
    } catch (error) {
        console.error('Error processing the ChatGPT API request:', error);
        res.status(500).json({ message: 'Error processing the ChatGPT API request.' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the GPTalk server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
