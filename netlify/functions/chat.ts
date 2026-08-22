import type { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const message = body.message || '';
    const history = Array.isArray(body.history) ? body.history : [];

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!endpoint || !apiKey || !deployment) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply:
            'Demo mode: ask for a content hook, a 3-post plan, or a hashtag strategy for a social campaign.',
        }),
      };
    }

    const messages = [
      {
        role: 'system',
        content:
          'You are a social media strategy assistant. Help with content ideas, captions, hooks, hashtag strategy, posting cadence, platform best practices, and basic engagement metrics. Redirect off-topic questions back to social strategy and flag when legal or policy review is needed.',
      },
      ...history.map((item: any) => ({
        role: item.role === 'user' ? 'user' : 'assistant',
        content: String(item.content || ''),
      })),
      { role: 'user', content: String(message) },
    ];

    const response = await fetch(`${endpoint.replace(/\/$/, '')}/openai/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: deployment, messages }),
    });

    if (!response.ok) {
      throw new Error(`Azure request failed with status ${response.status}`);
    }

    const completion = await response.json();
    const reply = completion.choices?.[0]?.message?.content || 'I can help with a content plan, hook, or posting cadence idea.';

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error('Netlify chat function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: 'I am having trouble reaching the assistant right now. Please try again in a moment.' }),
    };
  }
};

export { handler };
