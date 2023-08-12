import clientPromise from "@/lib/mongodb"
import { getSession } from "@auth0/nextjs-auth0"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
    try {
        const { user } = await getSession(req, res)
        const client = await clientPromise
        const db = client.db('Hii')
        const {chatId, role, content} = req.body
        const chat = await db.collection('hithere').findOneAndUpdate({
            _id: new ObjectId(chatId),
            userId: user.sub
        }, {
            $push: {
                messages: {
                    role,
                    content
                }
            }
        }, {
            returnDoocument: "after"
        })

        res.status(200).json({
            chat: {
                ...chat.value,
                _id: chat.value._id.toString()
            }
        })
    }
    catch (e) {
        res.status(500).json({ message: "An error occured when adding a message to a chat" })
    }
}