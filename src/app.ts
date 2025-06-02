// src/app.ts - Express application setup (updated for your existing structure)
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { logger } from "./utils/logger";
import emailRoutes from "./routes/emailRoutes";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });
  next();
});

// Routes
app.use("/api/email", emailRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "email-service",
    version: process.env.npm_package_version || "1.0.0",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Email Service API",
    version: process.env.npm_package_version || "1.0.0",
    endpoints: {
      health: "/health",
      sendEmail: "/api/email/send",
      sendBulkEmail: "/api/email/send/bulk",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.path,
  });
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
);

export default app;
