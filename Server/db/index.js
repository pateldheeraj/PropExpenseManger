import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // Insert DB name before any query params (e.g. ?appName=...)
        const baseUri = process.env.MONGODB_URI;
        const [uriBase, queryParams] = baseUri.split("?");
        const cleanBase = uriBase.replace(/\/$/, ""); // strip trailing slash
        const uri = queryParams
            ? `${cleanBase}/${DB_NAME}?${queryParams}`
            : `${cleanBase}/${DB_NAME}`;

        const connectionInstance = await mongoose.connect(uri);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1);
    }
};

export { connectDB };
