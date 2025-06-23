import { v4 as uuidv4 } from "uuid";
import { EmailHandler } from "../handlers/emailHandler";
import {
  EmailEvent,
  EventType,
  EmailSendRequest,
  EmailSendResponse,
  EmailAttachment,
} from "../types/events";
import { logger } from "../utils/logger";
import dotenv from "dotenv";
import { getCosmosDocuments } from "@/utils/fetchCosmosDocuments";

// Load environment variables from .env file
dotenv.config();

export class EmailService {
  private emailHandler: EmailHandler;

  constructor() {
    this.emailHandler = new EmailHandler();
  }

  /**
   * Send an email using the email service
   * Supports both template-based and custom content emails
   * @param emailRequest - Email send request parameters
   * @returns Promise with send response
   */
  async sendEmail(emailRequest: EmailSendRequest): Promise<EmailSendResponse> {
    try {
      // Validate email data
      const validationErrors =
        this.emailHandler.validateEmailData(emailRequest);
      if (validationErrors.length > 0) {
        logger.error("Email validation failed:", validationErrors);
        return {
          success: false,
          error: `Validation failed: ${validationErrors.join(", ")}`,
          details: validationErrors,
        };
      }
      let cosmosAttachments: EmailAttachment[] = [];
      if (emailRequest?.templateData?.sendAllCosmosAttachments) {
        cosmosAttachments = await getCosmosDocuments(
          emailRequest?.templateData?.dealId
        );
      }
      // Create email event
      const emailEvent: EmailEvent = {
        id: uuidv4(),
        type: EventType.EMAIL_SEND,
        data: {
          from:
            process.env.AZURE_COMMUNICATION_FROM_EMAIL ||
            "notification@incorp.asia",
          to: emailRequest.to,
          cc: emailRequest.cc,
          bcc: emailRequest.bcc,
          replyTo: emailRequest.replyTo,
          subject: emailRequest.subject,
          content: emailRequest.content,
          templateId: emailRequest.templateId,
          templateData: emailRequest.templateData,
          attachments: [
            ...cosmosAttachments,
            ...(emailRequest.attachments || []),
          ],
        },
        timestamp: new Date(),
        metadata: {
          userAgent: "email-service",
          source: "api",
          emailType: emailRequest.templateId ? "template" : "custom",
        },
      };

      logger.info(`Initiating email send for event: ${emailEvent.id}`, {
        type: emailRequest.templateId ? "template" : "custom",
        templateId: emailRequest.templateId,
        recipientCount: emailRequest.to.length,
      });

      // Handle the email event
      await this.emailHandler.handleEmailEvent(emailEvent);

      return {
        success: true,
        messageId: emailEvent.id,
      };
    } catch (error) {
      logger.error("Failed to send email:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      };
    }
  }

  /**
   * Send bulk emails
   * Supports mixing template-based and custom content emails in the same batch
   * @param emails - Array of email requests
   * @returns Promise with array of responses
   */
  async sendBulkEmails(
    emails: EmailSendRequest[]
  ): Promise<EmailSendResponse[]> {
    const results: EmailSendResponse[] = [];

    logger.info(`Processing bulk email send for ${emails.length} emails`);

    // Track statistics
    let templateEmails = 0;
    let customEmails = 0;

    for (const [index, email] of emails.entries()) {
      try {
        // Track email types
        if (email.templateId) {
          templateEmails++;
        } else {
          customEmails++;
        }

        logger.debug(`Processing bulk email ${index + 1}/${emails.length}`, {
          type: email.templateId ? "template" : "custom",
          templateId: email.templateId,
          to: email.to,
        });

        const result = await this.sendEmail(email);
        results.push(result);

        // Add small delay between emails to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        logger.error(`Failed to send bulk email ${index + 1}:`, error);
        results.push({
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    logger.info(`Bulk email send completed`, {
      total: emails.length,
      successful: successCount,
      failed: emails.length - successCount,
      templateEmails,
      customEmails,
    });

    return results;
  }

  /**
   * Get available email templates with descriptions
   * @returns Array of available template information
   */
  getAvailableTemplates(): string[] {
    return [
      "OTP_VERIFICATION",
      "DOCUMENT_GENERATION",
      "WELCOME",
      "PRELIM_KYC_SUBMITTED",
      "SUBMISSION_SUCCESS",
    ];
  }

  /**
   * Get template schema for a specific template
   * @param templateId - Template identifier
   * @returns Template data schema
   */
  getTemplateSchema(templateId: string): Record<string, any> | null {
    const schemas: Record<string, any> = {
      OTP_VERIFICATION: {
        required: ["otp"],
        optional: [
          "recipientName",
          "expirationMinutes",
          "companyName",
          "supportEmail",
          "purpose",
        ],
        description: "OTP verification email template",
        example: {
          otp: "123456",
          recipientName: "John Doe",
          expirationMinutes: 10,
          companyName: "Your Company",
          supportEmail: "support@company.com",
        },
      },
      DOCUMENT_GENERATION: {
        required: [],
        optional: [
          "recipientName",
          "documentType",
          "documentName",
          "companyName",
          "customMessage",
          "generatedBy",
          "documentId",
        ],
        description: "Document generation notification template",
        example: {
          recipientName: "John Doe",
          documentType: "Invoice",
          documentName: "Invoice_2024_001.pdf",
          customMessage: "Your document is ready for download.",
        },
      },
      WELCOME: {
        required: ["recipientName"],
        optional: ["companyName", "loginUrl", "supportEmail"],
        description: "Welcome email template for new users",
        example: {
          recipientName: "John Doe",
          companyName: "Your Company",
          loginUrl: "https://app.company.com/login",
          supportEmail: "support@company.com",
        },
      },
    };

    return schemas[templateId] || null;
  }

  /**
   * Health check for email service
   * @returns Health status
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    message: string;
    details?: any;
  }> {
    try {
      const emailHealthCheck = await this.emailHandler.healthCheck();
      const templates = this.getAvailableTemplates();

      return {
        healthy: emailHealthCheck.healthy,
        message: emailHealthCheck.message,
        details: {
          templatesAvailable: templates.length,
          templates: templates,
          azureClientReady: emailHealthCheck.healthy,
        },
      };
    } catch (error) {
      return {
        healthy: false,
        message: error instanceof Error ? error.message : "Health check failed",
        details: { error: error },
      };
    }
  }
}
