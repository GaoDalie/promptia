// app/api/users/[id]/posts/route.js
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, context) => {
    try {
        console.log("Attempting to connect to DB");
        await connectToDB();
        console.log("Connected to DB");
        
        // Correctly access the id from context.params
        const userId = context.params.id;
        console.log("Fetching prompts for user ID:", userId);
        
        const prompts = await Prompt.find({
            creator: userId
        }).populate('creator');
        
        console.log("Prompts found:", prompts.length);
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error("API Error:", error.message);
        return new Response(JSON.stringify("Failed to fetch prompts: " + error.message), { status: 500 });
    }
};