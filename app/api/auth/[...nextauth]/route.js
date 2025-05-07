import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/user";
import { connectTODB } from "@utils/database";

console.log("Auth route loading");

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    
    callbacks: {
        async session({ session }) {
            console.log("Session callback called", session?.user?.email);
            try {
                await connectTODB();
                const sessionUser = await User.findOne({ email: session.user.email });
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                    console.log("User found in database");
                } else {
                    console.log("User not found in database");
                }
                return session;
            } catch (error) {
                console.log("Session error:", error);
                return session;
            }
        },
        
        async signIn({ profile }) {
            console.log("SignIn callback called", profile?.email);
            try {
                await connectTODB();
                
                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
                
                if (userExists) {
                    console.log("User exists in database");
                    return true;
                }
                
                // if not, create a new user
                console.log("Creating new user");
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(/\s+/g, "").toLowerCase(),
                    image: profile.picture || ''
                });
                
                return true;
            } catch (error) {
                console.log("SignIn error:", error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };