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

        const response = await fetch(`${req.headers.get("origin")}/api/chat/createNewChat`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                cookie: req.headers.get('cookie')
            },
            body: JSON.stringify({
                message
            })
        })
        const json = await response.json()
        const chatId = json._id
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
            }, {
            onBeforeStream: ({ emit }) => {
                emit(chatId, 'NewChatId')
            },
            onAfterStream: async ({ fullContent }) => {
                await fetch(`${req.headers.get("origin")}/api/chat/addMessageToChat`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                        cookie: req.headers.get('cookie'),
                    },
                    body: JSON.stringify({
                        chatId,
                        role: 'assistant',
                        content: fullContent
                    })
                })
            }
        })
        return new Response(stream)
    }
    catch (e) {
        console.log('An error occurred while processing', e);
    }
}
