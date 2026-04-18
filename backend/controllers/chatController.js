const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    const formattedHistory = (history || []).map(msg => ({
      role: msg.role === 'bot' ? 'assistant' : 'user',
      content: msg.text
    }));

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are TechBuddy, a friendly and patient assistant helping senior citizens understand technology.
          Always use very simple language, avoid technical jargon, and be encouraging.
          Use short sentences and simple words.
          If explaining steps, number them clearly.
          Always be warm, patient and supportive.`
        },
        ...formattedHistory,
        {
          role: 'user',
          content: message,
        }
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const text = chatCompletion.choices[0]?.message?.content || '';

    res.json({ reply: text });
  } catch (error) {
    console.log('GROQ ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { chat };