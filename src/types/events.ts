export enum EventType {
  EMAIL_SEND = "EMAIL_SEND",
  EMAIL_DELIVERED = "EMAIL_DELIVERED",
  EMAIL_FAILED = "EMAIL_FAILED",
}

export enum EmailTemplate {
  PRELIM_KYC_WELCOME_EMAIL = "PRELIM_KYC_WELCOME_EMAIL",
  PRELIM_KYC_SUBMITTED = "PRELIM_KYC_SUBMITTED",
  ONBOARDING_NOTSTARTED = "ONBOARDING_NOTSTARTED",
  ONBOARDING_SUBMITTED = "ONBOARDING_SUBMITTED",
  SEND_OTP = "SEND_OTP",
  PRELIM_KYC_SUBMITTED_INTERNAL_AGENT = "PRELIM_KYC_SUBMITTED_INTERNAL_AGENT",
  ONBOARDING_SUBMITTED_INTERNAL_AGENT = "ONBOARDING_SUBMITTED_INTERNAL_AGENT",
  PRELIM_KYC_CLARIFICATIONS = "PRELIM_KYC_CLARIFICATIONS",
  ONBOARDING_CLARIFICATIONS = "ONBOARDING_CLARIFICATIONS",
  FOLLOWUP = "FOLLOWUP",
  BLUEMEG_FILE_PROCESSING_REPORT = "BLUEMEG_FILE_PROCESSING_REPORT",
  PRELIM_KYC_SUCCESS_INTERNAL_AGENT = "PRELIM_KYC_SUCCESS_INTERNAL_AGENT",
  PRELIM_KYC_FAILURE_INTERNAL_AGENT = "PRELIM_KYC_FAILURE_INTERNAL_AGENT",
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
