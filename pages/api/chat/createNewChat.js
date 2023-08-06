import clientPromise from "@/lib/mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    try {
        const { user } = await getSession(req, res);
        const { message } = req.body;
        const newUserMessage = {
            role: 'user',
            contet: message,
        }
        const client = await clientPromise 
    }
    catch (err) {
        console.log('An error occurred in create new chat ', err);
    }
}