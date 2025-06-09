const express = require('express');
const cors = require('cors');
const Pute = require('puter-js');

const app = express();
const puter = Pute();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('puter.js AI API server is running 🚀');
});

app.post('/v1/chat/completions', async (req, res) => {
  try {
    const { model = 'gpt-4o', messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const prompt = messages[messages.length - 1].content;
    const response = await puter.ai.chat(prompt, { model });

    res.json({
      id: 'puterjs-chatcmpl',
      object: 'chat.completion',
      choices: [{
        message: { role: 'assistant', content: typeof response === 'string' ? response : response.choices?.[0]?.message?.content },
        finish_reason: 'stop',
        index: 0
      }]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`puter.js API server listening on port ${PORT}`);
});
