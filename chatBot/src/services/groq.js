export const generateGroqResponse = async (prompt, history = [], modelName = 'llama-3.3-70b-versatile') => {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!API_KEY) {
    throw new Error('Groq API key is not configured. Please add VITE_GROQ_API_KEY to your .env file.');
  }

  try {
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'ai' ? 'assistant' : msg.role,
      content: msg.content,
    }));

    const messages = [
      { role: 'system', content: 'You are NexAI, a helpful, futuristic, and intelligent assistant.' },
      ...formattedHistory,
      { role: 'user', content: prompt }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch from Groq API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in Groq API:', error);
    throw new Error(error.message || 'Failed to generate response. Please try again later.');
  }
};
