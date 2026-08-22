const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const OpenAI = require('openai');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are a social media strategy assistant. Help with content ideas, captions and hooks, hashtag strategy, posting cadence, platform best practices, and basic engagement metric interpretation. Stay focused on social strategy and redirect off-topic questions back to marketing and content work. Do not act as a paid agency or legal advisor. If something requires legal, platform policy, or specialist guidance, flag that clearly.`;

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {};

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

  const hasPlaceholderConfig =
    !endpoint ||
    !apiKey ||
    !deployment ||
    endpoint.includes('your-resource') ||
    apiKey.includes('your-azure-openai-key') ||
    deployment.includes('gpt-4o') && !deployment.includes('gpt-4o');

  if (!endpoint || !apiKey || !deployment) {
    return res.json({
      reply:
        'Demo mode: try asking for a 3-post Instagram plan, a Reels hook, or a simple hashtag strategy for a brand.',
    });
  }

  if (hasPlaceholderConfig) {
    return res.status(500).json({
      reply:
        'Azure AI is not configured yet. Update the values in .env with your real AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, and AZURE_OPENAI_DEPLOYMENT, then restart the backend.',
    });
  }

  try {
    const client = new OpenAI({
      baseURL: `${endpoint.replace(/\/$/, '')}/openai/v1`,
      apiKey,
    });

    const conversation = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.map((item) => ({ role: item.role === 'user' ? 'user' : 'assistant', content: item.content })) : []),
      { role: 'user', content: String(message || '') },
    ];

    const completion = await client.chat.completions.create({
      model: deployment,
      messages: conversation,
    });

    const reply = completion.choices?.[0]?.message?.content || 'I can help with a content plan, a caption hook, or a posting cadence idea.';
    return res.json({ reply });
  } catch (error) {
    console.error('Azure OpenAI error:', error);
    return res.status(500).json({
      reply: 'I am having trouble reaching the strategy assistant right now. Please try again in a moment.',
    });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
