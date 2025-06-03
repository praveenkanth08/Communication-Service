// src/core/emailController.ts - Core business logic (framework-agnostic)
import Joi from "joi";
import { EmailService } from "../services/emailService";
import { logger } from "../utils/logger";
import { checkHMACDecryption } from "../utils/decryption";

// Types
export interface EmailRequest {
  from?: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  subject?: string;
  content?: string;
  templateId?: string;
  templateData?: Record<string, any>;
  attachments?: Array<{
    name: string;
    contentType: string;
    contentInBase64: string;
  }>;
}

export interface BulkEmailRequest {
  emails: EmailRequest[];
}

export interface RequestContext {
  body: any;
  headers: Record<string, string>;
  clientId: string;
}

export interface HandlerResponse {
  statusCode: number;
  body: any;
}

// Validation schemas
const emailSchema = Joi.string().email().required();
const emailArraySchema = Joi.array().items(emailSchema).min(1).required();
const optionalEmailArraySchema = Joi.array().items(emailSchema).optional();

const attachmentSchema = Joi.object({
  name: Joi.string().required(),
  contentType: Joi.string().required(),
  contentInBase64: Joi.string().base64().required(),
});

const templateDataSchema = Joi.object().pattern(
  Joi.string(),
 
  Joi.alternatives().try(
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
    Joi.array(),
    Joi.object()
  )
);

const emailSendSchema = Joi.object({
  from: Joi.string().email().optional(),
  to: emailArraySchema,
  cc: optionalEmailArraySchema,
  bcc: optionalEmailArraySchema,
  replyTo: Joi.string().email().optional(),
  subject: Joi.string().when("templateId", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  content: Joi.string().when("templateId", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  templateId: Joi.string().optional(),
  templateData: Joi.when("templateId", {
    is: Joi.exist(),
    then: templateDataSchema.required(),
    otherwise: Joi.optional(),
  }),
  attachments: Joi.array().items(attachmentSchema).optional(),
}).or("templateId", "content");

const bulkEmailSendSchema = Joi.object({
  emails: Joi.array().items(emailSendSchema).min(1).max(100).required(),
});

// Rate limiting storage - Use Redis or Azure Cache in production
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Core controller class
export class EmailController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  // Validation helper
  private validateRequest(
    schema: Joi.ObjectSchema,
    body: any
  ): { isValid: boolean; error?: any; value?: any } {
    const { error, value } = schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
        value: detail.context?.value,
      }));
      return { isValid: false, error: errorDetails };
    }

    return { isValid: true, value };
  }

  // Rate limiting helper
  private checkRateLimit(
    clientId: string,
    maxRequests: number = 100,
    windowMs: number = 60000
  ): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const clientData = requestCounts.get(clientId);

    if (!clientData || now > clientData.resetTime) {
      requestCounts.set(clientId, {
        count: 1,
        resetTime: now + windowMs,
      });
      return { allowed: true };
    }

    if (clientData.count >= maxRequests) {
      return {
        allowed: false,
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
      };
    }

    clientData.count++;
    return { allowed: true };
  }

  // Authentication helper
  private async authenticateRequest(
    headers: Record<string, string>,
    body: any
  ): Promise<{ authenticated: boolean; error?: string }> {
    try {
      const apiKey = headers["x-api-key"];
      if (!apiKey) {
        return { authenticated: false, error: "Unauthorized user" };
      }
      if (apiKey !== process.env.API_KEY) {
        logger.warn("Invalid API key provided");
        return { authenticated: false, error: "Forbidden: Invalid API key" };
      }

      const signature = headers["x-signature"];
      const timestamp = headers["x-timestamp"];
      const nonce = headers["x-nonce"];

      if (!signature || !timestamp || !nonce) {
        return {
          authenticated: false,
          error: "Missing required headers for HMAC validation",
        };
      }

      const isValidHMAC = await checkHMACDecryption(
        body,
        signature,
        parseInt(timestamp),
        nonce
      );

      if (!isValidHMAC) {
        logger.warn("Invalid HMAC signature or decryption failed");
        return {
          authenticated: false,
          error: "Forbidden: Invalid HMAC signature",
        };
      }

      return { authenticated: true };
    } catch (error) {
      logger.error("Error in authentication:", error);
      return { authenticated: false, error: "Internal server error" };
    }
  }

  // Main email send handler
  async handleEmailSend(context: RequestContext): Promise<HandlerResponse> {
    try {
      // Rate limiting
      const rateLimitResult = this.checkRateLimit(context.clientId);
      if (!rateLimitResult.allowed) {
        return {
          statusCode: 429,
          body: {
            success: false,
            error: "Rate limit exceeded",
            retryAfter: rateLimitResult.retryAfter,
          },
        };
      }

    //  Authentication
    //   const authResult = await this.authenticateRequest(
    //     context.headers,
    //     context.body
    //   );
    //   if (!authResult.authenticated) {
    //     const statusCode =
    //       authResult.error === "Unauthorized user"
    //         ? 401
    //         : authResult.error?.includes("Forbidden")
    //         ? 403
    //         : 500;
    //     return {
    //       statusCode,
    //       body: {
    //         success: false,
    //         error: authResult.error,
    //       },
    //     };
    //   }

      // Validation
      const validationResult = this.validateRequest(
        emailSendSchema,
        context.body
      );
      //   if (!validationResult.isValid) {
      //     logger.warn("Request validation failed:", validationResult.error);
      //     return {
      //       statusCode: 400,
      //       body: {
      //         success: false,
      //         error: "Validation failed",
      //         details: validationResult.error,
      //       },
      //     };
      //   }

      // Send email
      logger.info("Email send request received", {
        to: validationResult.value.to,
        templateId: validationResult.value.templateId,
        hasCustomContent: !!validationResult.value.content,
      });

      const result = await this.emailService.sendEmail(validationResult.value);

      if (result.success) {
        logger.info("Email sent successfully", { messageId: result.messageId });
        return {
          statusCode: 200,
          body: result,
        };
      } else {
        logger.error("Email send failed", { error: result.error });
        return {
          statusCode: 400,
          body: result,
        };
      }
    } catch (error) {
      logger.error("Email send handler error:", error);
      return {
        statusCode: 500,
        body: {
          success: false,
          error: "Internal server error",
        },
      };
    }
  }

  // Bulk email send handler
  async handleBulkEmailSend(context: RequestContext): Promise<HandlerResponse> {
    try {
      // Rate limiting (stricter for bulk operations)
      const rateLimitResult = this.checkRateLimit(context.clientId, 10, 60000);
      if (!rateLimitResult.allowed) {
        return {
          statusCode: 429,
          body: {
            success: false,
            error: "Rate limit exceeded",
            retryAfter: rateLimitResult.retryAfter,
          },
        };
      }

      // Authentication
      const authResult = await this.authenticateRequest(
        context.headers,
        context.body
      );
      if (!authResult.authenticated) {
        const statusCode =
          authResult.error === "Unauthorized user"
            ? 401
            : authResult.error?.includes("Forbidden")
            ? 403
            : 500;
        return {
          statusCode,
          body: {
            success: false,
            error: authResult.error,
          },
        };
      }

      // Validation
      const validationResult = this.validateRequest(
        bulkEmailSendSchema,
        context.body
      );
      if (!validationResult.isValid) {
        logger.warn("Bulk request validation failed:", validationResult.error);
        return {
          statusCode: 400,
          body: {
            success: false,
            error: "Validation failed",
            details: validationResult.error,
          },
        };
      }

      // Send bulk emails
      logger.info("Bulk email send request received", {
        emailCount: validationResult.value.emails.length,
      });

      const results = await this.emailService.sendBulkEmails(
        validationResult.value.emails
      );
      const successCount = results.filter((r) => r.success).length;

      logger.info("Bulk email send completed", {
        total: results.length,
        successful: successCount,
        failed: results.length - successCount,
      });

      return {
        statusCode: 200,
        body: {
          success: true,
          results,
          summary: {
            total: results.length,
            successful: successCount,
            failed: results.length - successCount,
          },
        },
      };
    } catch (error) {
      logger.error("Bulk email send handler error:", error);
      return {
        statusCode: 500,
        body: {
          success: false,
          error: "Internal server error",
        },
      };
    }
  }
}
