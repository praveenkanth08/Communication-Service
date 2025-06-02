import { EmailTemplate } from "@/types/events";

export class EmailTemplateService {
  private templates: Map<
    EmailTemplate,
    (data: any) => { subject: string; html: string; plainText: string }
  >;

  constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  private initializeTemplates() {
    // OTP Verification Template
    this.templates.set(
      EmailTemplate.OTP_VERIFICATION,
      (data: {
        recipientName?: string;
        logoUrl?: string;
        otp: string;
        companyAddress?: string;
        expirationMinutes: number;
        companyName?: string;
        supportEmail?: string;
        purpose?: string;
      }) => ({
        subject: `Your One-Time Password (OTP) to Continue`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP for KYC Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Logo Header - Centered and Compact -->
        <div style="padding: 15px 30px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #eeeeee;">
            ${
              data?.logoUrl
                ? `<img src="${data.logoUrl}" alt="${
                    data?.companyName || "Company"
                  } Logo" style="height: 32px; max-width: 200px;">`
                : `<div style="color: #2f465a; font-size: 16px; font-weight: 600;">${
                    data?.companyName || "InCorp"
                  }</div>`
            }
        </div>
        
        <!-- Main Blue Header -->
        <div style="background-color: #2f465a; color: #ffffff; padding: 40px 30px;">
            <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">
                Welcome, ${data?.recipientName || "User"}!
            </h1>
            
            <p style="margin: 0 0 24px 0; font-size: 13px; line-height: 1.5;">
                Here’s your One-Time Password (OTP) to proceed with your next step, this code expires within ${
                  data?.expirationMinutes
                } minutes.
            </p>
            
            <!-- Large OTP Display -->
            <div style="font-size: 50px; font-weight: bold; font-family: 'Courier New', monospace;">
                ${data?.otp}
            </div>
            
        </div>
        
        <!-- Footer Content -->
        <div style="padding: 40px 30px; text-align: center; background-color: #ffffff;">
            <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #666666; font-weight: 600;">
                    Do Not Share This Email
                </h3>
                <p style="margin: 0; font-size: 14px; color: #888888; line-height: 1.5;">
                    This email contains a secure code for ${
                      data?.companyName || "InCorp"
                    }. Please do not share this email, link, or access code with others.
                </p>
            </div>
        </div>
        
        <!-- Email Footer -->
        <div style="font-size: 12px; text-align: center; color: #888888; padding: 20px 30px; border-top: 1px solid #eeeeee; background-color: #f9f9f9;">
            <p style="margin: 0 0 10px 0;">This is an automated message regarding your KYC verification. Please do not reply to this email.</p>
            <p style="margin: 0 0 10px 0;">&copy; 2025 ${
              data?.companyName || "InCorp"
            }. All rights reserved.</p>
            <p style="margin: 0;">36 Robinson Rd, #20-01 City House, Singapore 068877</p>
        </div>
    </div>
</body>
</html>`,
        plainText: `
VERIFICATION CODE REQUIRED

Hello ${data.recipientName || "User"},

Your verification code: ${data.otp}

This code will expire in ${data.expirationMinutes || 10} minutes.

SECURITY NOTICE:
- Do not share this code with anyone
- This code is for one-time use only
- If you didn't request this, please ignore this email

For support: ${data.supportEmail || "notifications@incorp.asia"}


Best regards,
${data.companyName || "InCorp"} Team
      `,
      })
    );
    
    // Document Generation Template
    this.templates.set(
      EmailTemplate.DOCUMENT_GENERATION,
      (data: {
        recipientName?: string;
        documentType?: string;
        documentName?: string;
        companyName?: string;
        customMessage?: string;
        generatedBy?: string;
        documentId?: string;
      }) => ({
        subject: `Document Ready: ${
          data.documentName || data.documentType || "Your Document"
        }`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document Generated</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f5f5f5; }
            .container { background: white; margin: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .document-card { background: linear-gradient(135deg, #f8fff9 0%, #e8f5e8 100%); border: 1px solid #28a745; border-radius: 12px; padding: 25px; margin: 25px 0; }
            .document-icon { font-size: 48px; text-align: center; margin-bottom: 15px; }
            .document-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: 600; color: #555; }
            .detail-value { color: #333; }
            .download-notice { background: #e7f3ff; border: 1px solid #b3d9ff; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
            @media (max-width: 600px) {
              .container { margin: 10px; }
              .content, .header { padding: 20px; }
              .detail-row { flex-direction: column; }
              .detail-label { margin-bottom: 5px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📄 Document Ready</h1>
              <p>Your document has been successfully generated</p>
            </div>
            <div class="content">
              <p><strong>Hello ${data.recipientName || "User"},</strong></p>
              <p>Great news! Your requested document has been successfully generated and is ready for download.</p>
              
              <div class="document-card">
                <div class="document-icon">📋</div>
                <h3 style="text-align: center; margin: 0 0 20px 0; color: #28a745;">
                  ${
                    data.documentName ||
                    data.documentType ||
                    "Generated Document"
                  }
                </h3>
                
                <div class="document-details">
                  <div class="detail-row">
                    <span class="detail-label">Document Type:</span>
                    <span class="detail-value">${
                      data.documentType || "CDD Document"
                    }</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Generated:</span>
                    <span class="detail-value">${new Date().toLocaleString()}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Format:</span>
                    <span class="detail-value">Microsoft Word (.docx)</span>
                  </div>
                  ${
                    data.generatedBy
                      ? `
                  <div class="detail-row">
                    <span class="detail-label">Generated By:</span>
                    <span class="detail-value">${data.generatedBy}</span>
                  </div>
                  `
                      : ""
                  }
                  ${
                    data.documentId
                      ? `
                  <div class="detail-row">
                    <span class="detail-label">Document ID:</span>
                    <span class="detail-value">${data.documentId}</span>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
              
              <div class="download-notice">
                <p><strong>📎 Document Attached</strong></p>
                <p>The document is attached to this email. Click on the attachment to download and open it.</p>
              </div>
              
              ${
                data.customMessage
                  ? `
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Additional Information:</strong></p>
                <p style="margin: 10px 0 0 0;">${data.customMessage}</p>
              </div>
              `
                  : ""
              }
              
              <p>If you have any questions about this document or need assistance, please don't hesitate to contact our support team.</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>${data.companyName || "Your Company"} Team</strong>
              </p>
            </div>
            <div class="footer">
              <p>This document was generated automatically. Please keep this email for your records.</p>
              <p>&copy; ${new Date().getFullYear()} ${
          data.companyName || "Your Company"
        }. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
        plainText: `
DOCUMENT GENERATED SUCCESSFULLY

Hello ${data.recipientName || "User"},

Your requested document has been successfully generated and is attached to this email.

DOCUMENT DETAILS:
- Type: ${data.documentType || "CDD Document"}
- Name: ${data.documentName || "Generated Document"}
- Generated: ${new Date().toLocaleString()}
- Format: Microsoft Word Document (.docx)
${data.generatedBy ? `- Generated By: ${data.generatedBy}` : ""}
${data.documentId ? `- Document ID: ${data.documentId}` : ""}

${
  data.customMessage ? `\nADDITIONAL INFORMATION:\n${data.customMessage}\n` : ""
}

The document is attached to this email. Please download and save it for your records.

If you have any questions, please contact our support team.

Best regards,
${data.companyName || "Your Company"} Team
      `,
      })
    );

    // Welcome Email Template
    this.templates.set(
      EmailTemplate.WELCOME,
      (
        data: {
          recipientName?: string;
          companyName?: string;
          logoUrl?: string;
          url?: string;
          supportEmail?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `Welcome! Let’s Get Started with Your KYC`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - KYC Process</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 2px solid #bb2121;">
            ${
              data?.logoUrl
                ? `<img src="${data.logoUrl ? data.logoUrl : ""}" alt="${
                    data?.companyName || "InCorp"
                  } Logo" style="max-height: 60px; margin-bottom: 15px;">`
                : ""
            }
            <h1 style="color: #2f465a; margin: 0; font-size: 24px; font-weight: normal;">Welcome Aboard! 🎉</h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Hi <strong>${
                  data?.recipientName ? data?.recipientName : "User"
                }</strong>, 👋
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Welcome aboard! We're excited to have you with us. ✨
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                To get things started, we'll need a few quick details from you. As part of our standard <strong>Prelim KYC (Know Your Customer)</strong> process, you'll be prompted to share some basic information. This helps our agents verify your identity and ensure a secure experience. 🔐
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 25px 0; line-height: 1.6;">
                It's simple and won't take long. ⏱️
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  data.url
                }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600;">
                    👉 Submit KYC Details
                </a>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                If you have any questions, feel free to reach out—we're here to help. 💬
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Warm regards, 🌟
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0; font-weight: 600; text-align: left;">
                ${data?.companyName || "InCorp"} Team
            </p>
        </div>
        
        <div style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px;">
            <p style="margin: 0 0 15px 0;">This is an automated message regarding your KYC submission. Please do not reply to this email.</p>
            <div style="margin-top: 15px;">
                <p style="margin: 0 0 10px 0;">&copy; 2025 ${
                  data?.companyName || "InCorp"
                }. All rights reserved.</p>
                <p style="margin: 0;">36 Robinson Rd, #20-01 City House, Singapore 068877</p>
            </div>
        </div>
    </div>
</body>
</html>`,
        plainText: `
Welcome to ${data.companyName || "InCorp"}!

${data.recipientName ? `Dear ${data.recipientName},` : ""}

Thank you for choosing ${
          data.companyName || "InCorp"
        } for your business inorporation needs. We're excited to help you start your entrepreneurial journey!

To begin your incorporation process, please visit the link below to start the onboarding flow. The process is simple and should take just a few minutes to complete.

${data.url ? `Start your incorporation: ${data.url}` : ""}

If you have any questions, please don't hesitate to contact our support team at ${
          data.supportEmail || "notifications@incorp.asia"
        }.

Best regards,
${data.companyName || "InCorp"} Team

© ${new Date().getFullYear()} ${
          data.companyName || "InCorp"
        }. All rights reserved.
${data.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
      `,
      })
    );
    // prelim KYC Submitted Template
    this.templates.set(
      EmailTemplate.PRELIM_KYC_SUBMITTED,
      (
        data: {
          recipientName?: string;
          companyName?: string;
          logoUrl?: string;
          url?: string;
          supportEmail?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `Confirmation of Preliminary KYC Submission`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KYC Submission Received - ${data.companyName || "InCorp"}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
    <div style="text-align: center; margin-bottom: 20px;">
      ${
        data.logoUrl
          ? `<img src="${data.logoUrl}" alt="${
              data.companyName || "InCorp"
            } - An ascentium Company" style="max-width: 150px; height: auto;" />`
          : `<h2 style="margin: 0;">${data.companyName || "InCorp"}</h2>`
      }
    </div>

    ${
      data.recipientName
        ? `<p>Hi ${data.recipientName},</p>`
        : "<p>Hi there,</p>"
    }
    
    <p>
      🎉 <strong>Great news!</strong> We've received your KYC details successfully.
    </p>
    
    <p>
      <strong>What happens next?</strong><br>
      Our team is now reviewing your information to ensure everything looks good. This quick review helps us maintain security and compliance standards.
    </p>
    
    <p>
      📧 <strong>We'll keep you updated!</strong><br>
      Once our review is complete, you'll hear from us with the next steps.
    </p>
    
    <p>
      <strong>Questions?</strong> We're just a message away and happy to help! 😊
    </p>

    <!-- Thank You -->
    <div style="text-align: left; margin: 30px 0;">
        <p style="margin: 0; color: #333; font-size: 16px;">
            Best regards,
        </p>
        <p style="margin: 5px 0 0 0; color: #bb2121; font-size: 16px; font-weight: bold;">
            ${data.companyName || "InCorp"} Team
        </p>
    </div>

    <div style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px;">
      <p>This is an automated message regarding your KYC submission. Please do not reply to this email.</p>
      <div style="margin-top: 15px;">
        <p>&copy; ${new Date().getFullYear()} ${
          data.companyName || "InCorp"
        }. All rights reserved.</p>
        ${
          data.companyAddress
            ? `<p>${data.companyAddress}</p>`
            : "<p>36 Robinson Rd, #20-01 City House, Singapore 068877</p>"
        }
      </div>
    </div>
  </div>
</body>
</html>`,
        plainText: `
Welcome to ${data.companyName || "InCorp"}!

${data.recipientName ? `Dear ${data.recipientName},` : ""}

Thank you for choosing ${
          data.companyName || "InCorp"
        } for your business inorporation needs. We're excited to help you start your entrepreneurial journey!

To begin your incorporation process, please visit the link below to start the onboarding flow. The process is simple and should take just a few minutes to complete.

${data.url ? `Start your incorporation: ${data.url}` : ""}

If you have any questions, please don't hesitate to contact our support team at ${
          data.supportEmail || "notifications@incorp.asia"
        }.

Best regards,
${data.companyName || "InCorp"} Team

© ${new Date().getFullYear()} ${
          data.companyName || "InCorp"
        }. All rights reserved.
${data.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
      `,
      })
    );
    // prelim KYC Verified and start of second stage Template
    this.templates.set(
      EmailTemplate.PRELIM_KYC_VERIFIED,
      (
        data: {
          recipientName?: string;
          companyName?: string;
          logoUrl?: string;
          url?: string;
          supportEmail?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `Your Preliminary KYC is Complete – Proceed to the Next Step`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Complete</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 2px solid #bb2121;">
            <img src="YOUR_LOGO_URL_HERE" alt="Company Logo" style="max-height: 60px; margin-bottom: 15px;">
            <h1 style="color: #2f465a; margin: 0; font-size: 22px; font-weight: normal;">KYC Verified Successfully! 🎉</h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Hi <strong>${data.recipientName}</strong>, 👋
            </p>
            
            <div style="background-color: #d4edda; color: #155724; padding: 15px 20px; border-radius: 8px; font-size: 16px; font-weight: 600; margin: 25px 0; border: 1px solid #c3e6cb;">
                🎉 Great news – your preliminary KYC verification has been successfully completed!
            </div>            
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                🚀 <strong>Ready for the next step?</strong> You can now proceed to fill in your company and shareholder information as part of the incorporation process.
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 25px 0; line-height: 1.6;">
                To proceed, simply click the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  data.url
                }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600;">
                    👉 Complete Next Step
                </a>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                If you have any questions or need assistance, please don't hesitate to contact our support team. 💬
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Best regards, 🌟
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0; font-weight: 600; text-align: left;">
                ${data.companyName || "InCorp"} Team
            </p>
        </div>
        
        <div style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px;">
            <p style="margin: 0 0 15px 0;">This is an automated message regarding your KYC verification. Please do not reply to this email.</p>
            <div style="margin-top: 15px;">
                <p style="margin: 0 0 10px 0;">&copy; 2025 ${
                  data.companyName || "InCorp"
                }. All rights reserved.</p>
                <p style="margin: 0;">36 Robinson Rd, #20-01 City House, Singapore 068877</p>
            </div>
        </div>
    </div>
</body>
</html>`,
        plainText: `
Welcome to ${data.companyName || "InCorp"}!

${data.recipientName ? `Dear ${data.recipientName},` : ""}

Thank you for choosing ${
          data.companyName || "InCorp"
        } for your business inorporation needs. We're excited to help you start your entrepreneurial journey!

To begin your incorporation process, please visit the link below to start the onboarding flow. The process is simple and should take just a few minutes to complete.

${data.url ? `Start your incorporation: ${data.url}` : ""}

If you have any questions, please don't hesitate to contact our support team at ${
          data.supportEmail || "notifications@incorp.asia"
        }.

Best regards,
${data.companyName || "InCorp"} Team

© ${new Date().getFullYear()} ${
          data.companyName || "InCorp"
        }. All rights reserved.
${data.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
      `,
      })
    );
    // Submission Success Template
    this.templates.set(
      EmailTemplate.SUBMISSION_SUCCESS,
      (
        data: {
          recipientName?: string;
          companyName?: string;
          logoUrl?: string;
          supportEmail?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `Submission Confirmation `,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Details Under Review</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #ffffff; padding: 30px; text-align: center;>
            <img src="YOUR_LOGO_URL_HERE" alt="Company Logo" style="max-height: 60px; margin-bottom: 15px;">
           
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Hello <strong>${data.recipientName}</strong>! 👋
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Thank you for submitting your company and shareholder details. We've received the information and it's currently under review by our team.
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 25px 0; line-height: 1.6;">
                We'll notify you as soon as the verification is complete or if any additional details are needed.
            </p>
            
            <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; padding: 20px; margin: 25px 0; border-radius: 8px;">
             <h3 style="margin: 0 0 15px 0; color: #2f465a; font-size: 18px; font-weight: 600;">📋 What Happens Next:</h3>
                <p style="margin: 0 0 10px 0; color: #2f465a; font-size: 15px; line-height: 1.6;">
                   🔍  Our team is carefully reviewing your submitted information.
                </p>
                <p style="margin: 0 0 10px 0; color: #2f465a; font-size: 15px; line-height: 1.6;">
                   📞 If anything’s missing or needs clarification, we’ll get in touch with you directly.
                </p>
                <p style="margin: 0 0 10px 0; color: #2f465a; font-size: 15px; line-height: 1.6;">
                    📧 You’ll receive timely updates on your incorporation progress.
                </p>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                Appreciate your patience and cooperation in the meantime. 🙏
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Best regards, 🌟
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0; font-weight: 600; text-align: left;">
                ${data.companyName || "InCorp"} Team
            </p>
        </div>
        
        <div style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px;">
            <p style="margin: 0 0 15px 0;">This is an automated message regarding your incorporation process. Please do not reply to this email.</p>
            <div style="margin-top: 15px;">
                <p style="margin: 0 0 10px 0;">&copy; 2025 ${
                  data.companyName || "InCorp"
                }. All rights reserved.</p>
                <p style="margin: 0;">36 Robinson Rd, #20-01 City House, Singapore 068877</p>
            </div>
        </div>
    </div>
</body>
</html>`,
        plainText: `
Welcome to ${data.companyName || "InCorp"}!

${data.recipientName ? `Dear ${data.recipientName},` : ""}

Thank you for choosing ${
          data.companyName || "InCorp"
        } for your business inorporation needs. We're excited to help you start your entrepreneurial journey!

To begin your incorporation process, please visit the link below to start the onboarding flow. The process is simple and should take just a few minutes to complete.
If you have any questions, please don't hesitate to contact our support team at ${
          data.supportEmail || "notifications@incorp.asia"
        }.

Best regards,
${data.companyName || "InCorp"} Team

© ${new Date().getFullYear()} ${
          data.companyName || "InCorp"
        }. All rights reserved.
${data.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
      `,
      })
    );
  }

  public generateEmailContent(
    template: EmailTemplate,
    data: any
  ): { subject: string; html: string; plainText: string } {
    const templateFunction = this.templates.get(template);
    if (!templateFunction) {
      throw new Error(`Template ${template} not found`);
    }
    return templateFunction(data);
  }

  public registerCustomTemplate(
    templateName: EmailTemplate,
    templateFunction: (data: any) => {
      subject: string;
      html: string;
      plainText: string;
    }
  ) {
    this.templates.set(templateName, templateFunction);
  }

  public getAvailableTemplates(): EmailTemplate[] {
    return Array.from(this.templates.keys());
  }
}
