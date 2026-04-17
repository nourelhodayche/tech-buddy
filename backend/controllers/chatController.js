const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are TechBuddy, a friendly and patient assistant helping senior citizens understand technology. 
      Always use very simple language, avoid technical jargon, and be encouraging. 
      Use short sentences and simple words. 
      If explaining steps, number them clearly.
      Always be warm, patient and supportive.`,
      messages: [
        { role: 'user', content: message }
      ]
    });

    res.json({ reply: response.content[0].text });
  } catch (error) {
    res.status(500).json({ message: 'Error communicating with AI' });
  }
};

module.exports = { chat };