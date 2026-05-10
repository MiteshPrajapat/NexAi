export const generateOpenRouterResponse = async (prompt, history = [], modelName = 'deepseek/deepseek-chat') => {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!API_KEY) {
    throw new Error('OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.');
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

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin, // Required by OpenRouter
        'X-Title': 'NexAI Chatbot', // Optional but recommended
      },
      body: JSON.stringify({
        model: modelName,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch from OpenRouter API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in OpenRouter API:', error);
    throw new Error(error.message || 'Failed to generate response. Please try again later.');
  }
};
