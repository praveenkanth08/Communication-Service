// src/routes/emailRoutes.ts - Express wrapper
import {
  EmailController,
  RequestContext,
  HandlerResponse,
} from "@/controller/emailController";
import { Router, Request, Response } from "express";

const router = Router();
const emailController = new EmailController();

// Helper to convert Express req/res to our common format
const createExpressContext = (req: Request): RequestContext => ({
  body: req.body,
  headers: Object.keys(req.headers).reduce((acc, key) => {
    acc[key] = req.headers[key] as string;
    return acc;
  }, {} as Record<string, string>),
  clientId: req.ip || "unknown",
});

const sendExpressResponse = (
  res: Response,
  handlerResponse: HandlerResponse
) => {
  res.status(handlerResponse.statusCode).json(handlerResponse.body);
};

// Email send endpoint
router.post("/send", async (req: Request, res: Response) => {
  const context = createExpressContext(req);
  const response = await emailController.handleEmailSend(context);
  sendExpressResponse(res, response);
});

// Bulk email send endpoint
router.post("/send/bulk", async (req: Request, res: Response) => {
  const context = createExpressContext(req);
  const response = await emailController.handleBulkEmailSend(context);
  sendExpressResponse(res, response);
});

export default router;
