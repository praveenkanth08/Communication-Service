import { EmailTemplate } from "@/types/events";
// Then use logoBase64 in your template instead of the hardcoded base64 string

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
           <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="Incorp" style="max-width: 150px; height: auto;" />
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

    // Need clarification Template
    this.templates.set(
      EmailTemplate.NEED_CLARIFICATION,
      (data: {
        recipientName?: string;
        companyName?: string;
        clarificationNotes?: string | string[] | Record<string, string>;
        url?: string;
      }) => ({
        subject: `KYC Clarification Required - ${data.companyName || "InCorp"}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preliminary KYC Form - Clarification Required</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 2px solid #bb2121;">
           <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="Incorp" style="max-width: 150px; height: auto;" />
            <h1 style="color: #2f465a; margin: 0; font-size: 22px; font-weight: normal;">
                Preliminary KYC Review Required 📋
            </h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong>${
                  data.recipientName || "[Customer Name]"
                }</strong>,
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Thank you for submitting your preliminary KYC form. Upon review, our team has identified a few details that require clarification to proceed with your KYC verification.
            </p>

            <!-- Dynamic Clarification Notes Section -->
            <div style="margin: 25px 0;">
                <h3 style="color: #2f465a; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
                    📝 Clarification Notes:
                </h3>
                
                <div style="background-color: #f0f8ff; padding: 18px; border-radius: 6px; border-left: 4px solid #4a90e2;">
                    ${this.renderClarificationNotes(data.clarificationNotes)}
                </div>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 25px 0; line-height: 1.6;">
                To review and update your KYC information, kindly click the button below:
            </p>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  data.url || "#"
                }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    🔗 Review & Update Your KYC
                </a>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 15px 0; line-height: 1.6;">
              To keep the process on track, we encourage you to complete the updates as soon as possible.
            </p>
            <p style="font-size: 16px; color: #2f465a; margin: 15px 0 0 0; line-height: 1.6;">If you require any further clarification, please feel free to contact us</p>
            
        </div>
        
        <!-- Footer -->
        <div style="padding: 0px 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Warm regards,
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0; font-weight: 600; text-align: left;">
                ${data.companyName || "InCorp"} Team
            </p>
        </div>
        
        <!-- Footer Information -->
        <div style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px;">
            <p style="margin: 0 0 15px 0;">This is an automated message regarding your preliminary KYC verification. Please do not reply to this email.</p>
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
KYC CLARIFICATION REQUIRED

Hello ${data.recipientName || "User"},

Thank you for submitting your preliminary KYC form. Upon review, our team has identified a few details that require clarification to proceed with your KYC verification.

CLARIFICATION NOTES:
${
  typeof data.clarificationNotes === "string"
    ? data.clarificationNotes
    : Array.isArray(data.clarificationNotes)
    ? data.clarificationNotes.map((note) => `- ${note}`).join("\n")
    : typeof data.clarificationNotes === "object" &&
      data.clarificationNotes !== null
    ? Object.entries(data.clarificationNotes)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    : "Please review your submitted information."
}

To review and update your KYC information, please visit: ${
          data.url || "your account portal"
        }

To keep the process on track, we encourage you to complete the updates as soon as possible.

If you require any further clarification, please feel free to contact us.

Best regards,
${data.companyName || "InCorp"} Team
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
             <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="Incorp" style="max-width: 150px; height: auto;" /> 
            <h1 style="color: #2f465a; margin: 0; font-size: 24px; font-weight: normal;">Welcome Aboard! 🎉</h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Hi <strong>${
                  data?.recipientName ? data?.recipientName : "User"
                }</strong>, 
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
                     Submit KYC Details
                </a>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                If you have any questions, feel free to reach out—we're here to help. 💬
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Warm regards, 
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
        // templateAttachments: [
        //   {
        //     name: "logo.png",
        //     contentType: "image/png",
        //     contentId: "incorp-logo",
        //     contentInBase64:
        //       "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",
        //   },
        // ],
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Submission Received - ${data?.companyName || "InCorp"}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 2px solid #bb2121;">
              <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="Incorp" style="max-width: 150px; height: auto;" />
            <h1 style="color: #2f465a; margin: 0; font-size: 24px; font-weight: normal;">KYC Submission Received! 🎉</h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                ${data?.recipientName ? `Hi <strong>${data?.recipientName}</strong>,` : "Hi there,"} 
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                🎉 <strong>Great news!</strong> We've received your KYC details successfully. 
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                <strong>What happens next?</strong><br>
                Our team is now reviewing your information to ensure everything looks good. This quick review helps us maintain security and compliance standards. 🔐
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                📧 <strong>We'll keep you updated!</strong><br>
                Once our review is complete, you'll hear from us with the next steps. ⏱️
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                <strong>Questions?</strong> We're just a message away and happy to help! 💬
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Best regards, 
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0; font-weight: 600; text-align: left;">
                ${data?.companyName || "InCorp"} Team
            </p>
        </div>
        
        <div style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px;">
            <p style="margin: 0 0 15px 0;">This is an automated message regarding your KYC submission. Please do not reply to this email.</p>
            <div style="margin-top: 15px;">
                <p style="margin: 0 0 10px 0;">&copy; 2025 ${data?.companyName || "InCorp"}. All rights reserved.</p>
                ${data?.companyAddress ? `<p style="margin: 0;">${data?.companyAddress}</p>` : `<p style="margin: 0;">36 Robinson Rd, #20-01 City House, Singapore 068877</p>`}
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
           <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="Incorp" style="max-width: 150px; height: auto;" />
            <h1 style="color: #2f465a; margin: 0; font-size: 22px; font-weight: normal;">KYC Verified Successfully! 🎉</h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Hi <strong>${data.recipientName}</strong>, 
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
                     Complete Next Step
                </a>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                If you have any questions or need assistance, please don't hesitate to contact our support team. 💬
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Best regards, 
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
        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 2px solid #bb2121;">
              <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="Incorp" style="max-width: 150px; height: auto;" /> 
            <h1 style="color: #2f465a; margin: 0; font-size: 24px; font-weight: normal;">Details Under Review! 📋</h1>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Hello <strong>${
                  data?.recipientName ? data?.recipientName : "User"
                }</strong>! 
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Thank you for submitting your company and shareholder details. We've received the information and it's currently under review by our team. ✨
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 25px 0; line-height: 1.6;">
                We'll notify you as soon as the verification is complete or if any additional details are needed. 🔐
            </p>
            
            <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="margin: 0 0 15px 0; color: #2f465a; font-size: 18px; font-weight: 600;">📋 What Happens Next:</h3>
                <p style="margin: 0 0 10px 0; color: #2f465a; font-size: 15px; line-height: 1.6;">
                   🔍  Our team is carefully reviewing your submitted information.
                </p>
                <p style="margin: 0 0 10px 0; color: #2f465a; font-size: 15px; line-height: 1.6;">
                   📞 If anything's missing or needs clarification, we'll get in touch with you directly.
                </p>
                <p style="margin: 0 0 10px 0; color: #2f465a; font-size: 15px; line-height: 1.6;">
                    📧 You'll receive timely updates on your incorporation progress.
                </p>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                Appreciate your patience and cooperation in the meantime. 🙏
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Best regards, 
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0; font-weight: 600; text-align: left;">
                ${data?.companyName || "InCorp"} Team
            </p>
        </div>
        
        <div style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px;">
            <p style="margin: 0 0 15px 0;">This is an automated message regarding your incorporation process. Please do not reply to this email.</p>
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
  ): {
    subject: string;
    html: string;
    plainText: string;
    templateAttachments?: any[];
  } {
    const templateFunction = this.templates.get(template);
    if (!templateFunction) {
      throw new Error(`Template ${template} not found`);
    }
    return templateFunction(data);
  }

  private renderClarificationNotes(
    notes: string | string[] | Record<string, string> | undefined
  ): string {
    if (!notes) {
      return '<p style="font-size: 15px; color: #2c5282; margin: 0; line-height: 1.6;">Please review your submitted information for any missing or incorrect details.</p>';
    }

    if (typeof notes === "string") {
      return `<p style="font-size: 15px; color: #2c5282; margin: 0; line-height: 1.6;">${notes}</p>`;
    }

    if (Array.isArray(notes)) {
      return `<ul style="margin: 0; padding-left: 18px; color: #2c5282; font-size: 15px; line-height: 1.7;">
      ${notes
        .map((note) => `<li style="margin-bottom: 6px;">${note}</li>`)
        .join("")}
    </ul>`;
    }

    if (typeof notes === "object" && notes !== null) {
      return Object.entries(notes)
        .map(
          ([key, value]) => `
      <div style="margin-bottom: 12px;">
        <strong style="color: #1a365d; font-size: 15px;">${key}:</strong>
        <p style="margin: 4px 0 0 0; color: #2c5282; font-size: 15px; line-height: 1.6;">${value}</p>
      </div>
    `
        )
        .join("");
    }

    return '<p style="font-size: 15px; color: #2c5282; margin: 0; line-height: 1.6;">Please review your submitted information.</p>';
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
