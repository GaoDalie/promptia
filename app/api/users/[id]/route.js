// app/api/prompt/[id]/route.js
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read one prompt)
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (request, context) => {
  try {
    await connectToDB();
    
    const userId = context.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return new Response("Failed to fetch user", { status: 500 });
  }
};
// PATCH (update)
export const PATCH = async (request, context) => {
    const { prompt, tag } = await request.json();
    
    try {
        await connectToDB();
        
        const promptId = context.params.id;
        const existingPrompt = await Prompt.findById(promptId);
        
        if(!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        
        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        
        await existingPrompt.save();
        
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.error("Failed to update prompt:", error);
        return new Response("Failed to update prompt", { status: 500 });
    }
};

// DELETE (delete)
export const DELETE = async (request, context) => {
    try {
        await connectToDB();
        
        const promptId = context.params.id;
        await Prompt.findByIdAndDelete(promptId);
        
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Failed to delete prompt:", error);
        return new Response("Failed to delete prompt", { status: 500 });
    }
};