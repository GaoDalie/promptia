import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"; // Corrected function name
// Remove unused import: import { connect } from "mongoose";

export const GET = async (request) => {
    try {
        await connectToDB(); // Using corrected function name
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error("Failed to fetch all prompts:", error);
        return new Response(JSON.stringify("Failed to fetch all prompts: " + error.message), { status: 500 });
    }
};