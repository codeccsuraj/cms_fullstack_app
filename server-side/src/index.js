import express from "express";
import http from "http";
import { getSqlConnection } from "./connections/sql.connection.js";
import { syncDataBaseModels } from "./models/sync.model.js";
import authRoutes from "./routes/auth/auth.routes.js";
import CorsConfig from "./config/cors.config.js";
import getMongoConnection from "./connections/mongo.connection.js";
import userRoutes from "./routes/user/user.routes.js";

const initializeApp = async () => {
  try {
    const app = express();

    // Instantiate CorsConfig with only localhost:5173
    const corsConfig = new CorsConfig({
      allowedOrigins: ["http://localhost:5173"], // Only allow this origin
      credentials: true,                          // Allow cookies (httpOnly refresh token)
      debug: true                                 // Logs allowed/blocked origins
    });

    corsConfig.attachTo(app);

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Connect to SQL (PostgreSQL)
    await getSqlConnection();
    await syncDataBaseModels();
    await getMongoConnection();
    console.log("✅ Database connected");

    // Create server
    const server = http.createServer(app);

    const PORT = 5000;

    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/user', userRoutes);


    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to initialize application:", error.message);
    process.exit(1); // shut down gracefully on failure
  }
};

initializeApp();
