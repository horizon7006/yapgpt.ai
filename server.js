const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/yap', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are yapgpt, an AI that never stops talking and gives overly long, exaggerated responses no matter what the user says.' },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
    });

    res.json({ response: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'yapgpt broke itself 😭' });
  }
});

app.listen(port, () => {
  console.log(`yapgpt backend listening on http://localhost:${port}`);
});
