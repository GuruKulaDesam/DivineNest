import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

let openai: OpenAI | null = null;

if (apiKey && apiKey !== 'your_openai_api_key_here') {
	openai = new OpenAI({
		apiKey: apiKey,
		dangerouslyAllowBrowser: true // Only for demo, in production use server-side
	});
}

export async function getVoiceResponse(prompt: string): Promise<string> {
	if (!openai) {
		console.warn('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your .env file.');
		return 'Voice assistant is not configured. Please set your OpenAI API key.';
	}

	try {
		const completion = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{ role: 'system', content: 'You are a helpful voice assistant for the Divine Nest home management app. Provide concise, family-friendly responses.' },
				{ role: 'user', content: prompt }
			],
			max_tokens: 150
		});
		return completion.choices[0]?.message?.content || 'Sorry, I could not understand.';
	} catch (error) {
		console.error('OpenAI error:', error);
		return 'Sorry, there was an error processing your request.';
	}
}