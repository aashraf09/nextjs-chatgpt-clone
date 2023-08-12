import clientPromise from "@/lib/mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    try {
        const { user } = await getSession(req, res)
        const client = await clientPromise
        const db = client.db('Hii')
        const chats = await db.collection('hithere').find({
            userId: user.sub
        }, {
            projection: {
                userId: 0,
                messages: 0
            }
        }).sort({
            _id: -1
        }).toArray();
        res.status(200).json({ chats })
    }
    catch (e) {
        res.status(500).json({ message: 'An error occurred when getting the chat list' })
    }
}