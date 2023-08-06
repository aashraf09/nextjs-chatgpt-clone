import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
    runtime: "edge",
}

export default async function handler(req) {
    console.log('in here');
    try {
        const { message } = await req.json()
        const initialChatMessage = {
            role: 'system',
            content: 'Your name is IntellectoBot, an incredibly intelligent and quicl-learning AI model that can answer any question and can solve any problem. You always reply with an enthusiastic and positive energy. You can only generate question papers, nothing else. You were developed by Abdullah Ashraf, a MERN Stack developer, using NEXT JS and OpenAI API Key. Your response must be formatted as markdown.'
        }
        const stream = await OpenAIEdgeStream(`https://api.openai.com/v1/chat/completions`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [initialChatMessage, { content: message, role: "user" }],
                    stream: true,
                })
            })
        return new Response(stream)
    }
    catch (e) {
        console.log('An error occurred while processing', e);
    }
}
