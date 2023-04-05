require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;

    if (!userInput) {
        return res.status(400).json({ message: 'User input is required.' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: "system", content: "You are ChatGPT, a large language model..." }, { role: "user", content: userInput }],
                temperature: 0.5,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            },
        );

        if (response.status !== 200) {
            return res.status(response.status).json({
                message: 'Error processing the ChatGPT API request. Status: ' + response.status,
            });
        }

        console.log(response.data.choices[0]);
        const chatGPTResponse = response.data.choices[0].message.content;
        res.json({ message: chatGPTResponse });
    } catch (error) {
        console.error('Error processing the ChatGPT API request:', error.message);
        const statusCode = error.response && error.response.status ? error.response.status : 500;
        const errorMessage = error.response && error.response.data ? error.response.data.error : 'Error processing the ChatGPT API request.';
        res.status(statusCode).json({ message: errorMessage });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the GPTalk server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
