import clientPromise from "@/lib/mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    try {
        const { user } = await getSession(req, res);
        const { message } = req.body;
        console.log(message);
        const newUserMessage = {
            role: 'user',
            content: message,
        }
        const client = await clientPromise
        const db = client.db("BotDatabase")
        const chat = db.collection('chats').insertOne({
            userId: user.sub,
            messages: [newUserMessage],
            title: message
        })
        res.status(200).json({
            _id: chat.insertedId.toString(),
            messages: [newUserMessage],
            title: message
        })
    }
    catch (err) {
        res.status(500).json({message: "An error occurred white creating newe chat"})
        console.log('An error occurred in create new chat ', err);
    }
}