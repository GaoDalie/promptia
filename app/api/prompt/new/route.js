import Prompt from "@models/prompt";
// Fix the import to use connectToDB instead of connectTODB
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        // Use the correct function name
        await connectToDB();
        
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.error("Failed to create a new prompt:", error);
        return new Response("Failed to create a new prompt: " + error.message, { status: 500 });
    }
};