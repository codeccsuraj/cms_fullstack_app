import mongoose from "mongoose";
import { config } from "../config/var.config.js";

const getMongoConnection = async () => {
    try {
        const conn = await mongoose.connect(config.MongoDb, {
            dbName: "cms",
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Stop app if DB connection fails
    }
};

export default getMongoConnection;
