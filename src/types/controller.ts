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
