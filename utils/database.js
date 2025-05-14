import mongoose from "mongoose";

let isConnected = false;

// Fix the function name from connectTODB to connectToDB
export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt"
        })
        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        // Re-throw the error so the API knows the connection failed
        throw error;
    }
}