export enum EventType {
  EMAIL_SEND = "EMAIL_SEND",
  EMAIL_DELIVERED = "EMAIL_DELIVERED",
  EMAIL_FAILED = "EMAIL_FAILED",
}

export enum EmailTemplate {
  OTP_VERIFICATION = "OTP_VERIFICATION",
  DOCUMENT_GENERATION = "DOCUMENT_GENERATION",
  WELCOME = "WELCOME",
  PRELIM_KYC_SUBMITTED = "PRELIM_KYC_SUBMITTED",
  PRELIM_KYC_VERIFIED = "PRELIM_KYC_VERIFIED",
  SUBMISSION_SUCCESS = "SUBMISSION_SUCCESS",
}

export interface EmailAttachment {
  name: string;
  contentType: string;
  contentInBase64: string;
}

export interface EmailEventData {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  subject?: string;
  content?: string;
  templateId?: EmailTemplate;
  templateData?: Record<string, any>;
  attachments?: EmailAttachment[];
}

export interface EmailEvent {
  id: string;
  type: EventType;
  data: EmailEventData;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface EmailSendRequest {
  from?: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  subject?: string;
  content?: string;
  templateId?: EmailTemplate;
  templateData?: Record<string, any>;
  attachments?: EmailAttachment[];
}

export interface EmailSendResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  details?: any;
}
