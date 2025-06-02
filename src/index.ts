

// Now import logger and other modules
import { logger } from "./utils/logger";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Log startup information
logger.info("🚀 Starting Email Service...", {
  nodeVersion: process.version,
  environment: process.env.NODE_ENV || "development",
  timestamp: new Date().toISOString(),
});

// Validate required environment variables
const requiredEnvVars = ["AZURE_COMMUNICATION_CONNECTION_STRING", "API_KEY"];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  logger.error("❌ Missing required environment variables:", missingEnvVars);
  logger.error(
    "Please check your .env file and ensure all required variables are set"
  );
  process.exit(1);
}

logger.info("✅ Environment variables validated successfully");

// Now safely import the app (which imports other modules)
import app from "./app";

// Configuration
const PORT = process.env.PORT || 3002;

// Start server
const server = app.listen(PORT, () => {
  // Log some helpful information
  logger.info("📋 Service is ready to accept requests");
});

// Graceful shutdown handling
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}, starting graceful shutdown...`);

  server.close((err) => {
    if (err) {
      logger.error("Error during server shutdown:", err);
      process.exit(1);
    }

    logger.info("Server closed successfully");
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 30000);
};

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions and rejections
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

export default server;
