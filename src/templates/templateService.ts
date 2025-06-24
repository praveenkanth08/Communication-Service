import { EmailTemplate } from "@/types/events";
import { header, IncorpFooter } from "./commonTemplates";
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
    // Welcome Email Template
    this.templates.set(
      EmailTemplate.PRELIM_KYC_WELCOME_EMAIL,
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
        subject: `Submission of Client Onboarding Form`,
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
        ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong>${
                  data?.recipientName ? data?.recipientName : "User"
                }</strong>, 
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
              Thank you for choosing to engage our services.
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
              To initiate the onboarding process, kindly fill in all required sections here at your earliest convenience.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  data.url
                }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600;">
                     Begin Onboarding
                </a>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
              Should you have any questions or require clarification, please do not hesitate to contact us.
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
        
       ${IncorpFooter(data.companyName)}
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
        subject: `Acknowledgement of Prelim KYC Submission`,
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
       ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                ${
                  data?.recipientName
                    ? `Dear <strong>${data?.recipientName}</strong>,`
                    : "Dear User,"
                } 
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                We acknowledge receipt of your completed Onboarding form and the accompanying documents. Thank you for your prompt response.
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
               As the next step, electronic Know Your Customer (e-KYC) verification links will be sent to the Ultimate Beneficial Owners (UBOs), Significant Controllers, Person having Executive Authority and Directors listed in your submission. Kindly inform the relevant individuals to complete the verification process at their earliest convenience.
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
              We will continue to keep you informed of the progress.
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
        
       ${IncorpFooter(data?.companyName)}
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
      EmailTemplate.ONBOARDING_NOTSTARTED,
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
        subject: `Submission of Client Onboarding Form and Required Documents`,
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
       ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong>${data?.recipientName}</strong>, 
            </p>
            
          <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
              Thank you for choosing to engage our services.
            </p>            
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
              To initiate the onboarding process, kindly fill in all required sections here at your earliest convenience.
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 25px 0; line-height: 1.6;">
             Additionally, we have attached a checklist outlining the required corporate documents. Please ensure that all applicable documents are submitted together with the completed Onboarding form.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  data.url
                }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600;">
                     Complete Next Step
                </a>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
              Should you have any questions or require clarification, please do not hesitate to contact us.
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
        
        ${IncorpFooter(data.companyName)}
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

    // Onboarding submitted Template
    this.templates.set(
      EmailTemplate.ONBOARDING_SUBMITTED,
      (
        data: {
          recipientName?: string;
          companyName?: string;
          logoUrl?: string;
          supportEmail?: string;
          companyAddress?: string;
          documentUrl?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `Acknowledgement of Onboarding Form and Document Submission`,
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
        ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong>${
                  data?.recipientName ? data?.recipientName : "User"
                }</strong>! 
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                We acknowledge receipt of your completed Onboarding form and the accompanying documents. Thank you for your prompt response.
            </p>
            
            ${
              data?.documentUrl
                ? `
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Please <a href="${data.documentUrl}" style="color: #007bff; text-decoration: underline;">click here</a> to view all the uploaded documents
            </p>
            `
                : ""
            }
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 25px 0; line-height: 1.6;">
               As the next step, electronic Know Your Customer (e-KYC) verification links will be sent to the Ultimate Beneficial Owners (UBOs), Significant Controllers, Person having Executive Authority and Directors listed in your submission. Kindly inform the relevant individuals to complete the verification process at their earliest convenience.
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
               We will continue to keep you informed of the progress.
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
        
        ${IncorpFooter(data.companyName)}
    </div>
</body>
</html>`,
        plainText: `
Welcome to ${data.companyName || "InCorp"}!

${data.recipientName ? `Dear ${data.recipientName},` : ""}

We acknowledge receipt of your completed Onboarding form and the accompanying documents. Thank you for your prompt response.

${
  data?.documentUrl
    ? `Please click here to view all the uploaded documents: ${data.documentUrl}`
    : ""
}

As the next step, electronic Know Your Customer (e-KYC) verification links will be sent to the Ultimate Beneficial Owners (UBOs), Significant Controllers, Person having Executive Authority and Directors listed in your submission. Kindly inform the relevant individuals to complete the verification process at their earliest convenience.

We will continue to keep you informed of the progress.

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

    // Prelim KYC Failure
    this.templates.set(
      EmailTemplate.PRELIM_KYC_FAILURE,
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
        subject: `KYC Verification - Status`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Update - ${data?.companyName || "InCorp"}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
       ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                ${
                  data?.recipientName
                    ? `Dear <strong>${data?.recipientName}</strong>,`
                    : "Dear User,"
                } 
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                We have reviewed your KYC (Know Your Customer) submission and unfortunately, we are unable to approve it at this time.
            </p>
            
           <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
  If you have any questions or require further assistance, please reach out to our support team through your usual point of contact.
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
        
       ${IncorpFooter(data?.companyName)}
    </div>
</body>
</html>`,
        plainText: `
KYC Verification - Update Required

${data?.recipientName ? `Dear ${data.recipientName},` : "Dear User,"}

We have reviewed your KYC (Know Your Customer) submission and unfortunately, we are unable to approve it at this time.

Our team will contact you shortly regarding the next steps and requirements to complete your verification process.

If you have any immediate questions, please don't hesitate to contact our support team at ${
          data?.supportEmail || "notifications@incorp.asia"
        }.

We appreciate your patience and cooperation in completing this verification process.

Best regards,
${data?.companyName || "InCorp"} Team

© ${new Date().getFullYear()} ${
          data?.companyName || "InCorp"
        }. All rights reserved.
${data?.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
    `,
      })
    );

    // Dropoff
    this.templates.set(
      EmailTemplate.FOLLOWUP,
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
        subject: `Just a Quick Reminder to Complete Your KYC`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Reminder - Complete Your Process</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Hi <strong>${
                  data?.recipientName ? data?.recipientName : "[Customer Name]"
                }</strong>,
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                We noticed you started your KYC process but didn't get a chance to finish it. No worries — it happens!
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 25px 0; line-height: 1.6;">
                To continue where you left off, just click the button below. It only takes a few minutes to complete, and it's an essential step to get you fully onboarded.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  data.url
                }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600;">
                     Resume KYC Submission 
                </a>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                If you need help or have any questions, our team is just a message away.
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 25px 0 0 0; line-height: 1.6;">
                Looking forward to having you all set up!
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
        
         ${IncorpFooter(data?.companyName)}
    </div>
</body>
</html>`,
        plainText: `
Just a Quick Reminder to Complete Your KYC

Hi ${data.recipientName ? data.recipientName : "[Customer Name]"},

We noticed you started your KYC process but didn't get a chance to finish it. No worries — it happens!

To continue where you left off, just click the link below. It only takes a few minutes to complete, and it's an essential step to get you fully onboarded.

${
  data.url
    ? `Resume KYC Submission: ${data.url}`
    : "[Resume KYC Submission Link]"
}

If you need help or have any questions, our team is just a message away.

Looking forward to having you all set up!

Warm regards,
${data.companyName || "[Your Company Name]"} Team

© ${new Date().getFullYear()} ${
          data.companyName || "InCorp"
        }. All rights reserved.
${data.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
    `,
      })
    );

    // OTP Verification Template
    this.templates.set(
      EmailTemplate.SEND_OTP,
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
        ${header()}
        
        <!-- Main Blue Header -->
        <div style="background-color: #2f465a; color: #ffffff; padding: 40px 30px;">
            <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 600; color: #ffffff;">
                Welcome, ${data?.recipientName || "User"}!
            </h1>
            
            <p style="margin: 0 0 24px 0; font-size: 13px; color: #ffffff; line-height: 1.5;">
                Here’s your One-Time Password (OTP) to proceed with your next step, this code expires within ${
                  data?.expirationMinutes
                } minutes.
            </p>
            
            <!-- Large OTP Display -->
            <div style="font-size: 50px; font-weight: bold; color: #ffffff; font-family: 'Courier New', monospace;">
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
        ${IncorpFooter(data?.companyName)}
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

    // Preliminary KYC Need Clarifications
    this.templates.set(
      EmailTemplate.PRELIM_KYC_CLARIFICATIONS,
      (data: {
        recipientName?: string;
        companyName?: string;
        clarificationNotes?: string | string[] | Record<string, string>;
        url?: string;
      }) => ({
        subject: `KYC Clarification Required`,
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
         ${header()}
        
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
           <p style="margin: 0 0 15px 0;">This is an automated message, Please do not reply to this email.</p>
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

    // Onboarding Need Clarifications
    this.templates.set(
      EmailTemplate.ONBOARDING_CLARIFICATIONS,
      (data: {
        recipientName?: string;
        companyName?: string;
        clarificationNotes?: string | string[] | Record<string, string>;
        url?: string;
      }) => ({
        subject: `Onboarding Clarification Required`,
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
         ${header()}
        
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
        ${IncorpFooter()}
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

    // prelim KYC submission internal agent template
    this.templates.set(
      EmailTemplate.PRELIM_KYC_SUBMITTED_INTERNAL_AGENT,
      (
        data: {
          clientName?: string;
          dealOwnerName?: string;
          csRecipientName?: string;
          url?: string;
          companyName?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `KYC Processing Request – ${data?.clientName || "Client"}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS Processing Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong> KYC team</strong>,
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Please proceed with initiating the CS process for the following client:
            </p>
            
            <div style=" margin: 20px 0;">
                <p style="font-size: 16px; color: #2f465a; margin: 0 0 10px 0; line-height: 1.6;">
                    <strong>Client Name:</strong> ${data?.clientName || "N/A"}
                </p>
                <p style="font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                    UBOs/Significant Controllers/Person having Executive Authority/Directors  Click here to review data provided by the client/ WORD doc
                    
                </p>
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0; line-height: 1.6;">
Kindly begin data entry, name screening, and e-KYC setup. This request is also shared with Dylan Ng and Lee Wei Hsiung for visibility.
            </p>
            
            <a href="${
              data.url
            }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600;">
                     Review KYC
                </a>


            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                Please let me know if you require any additional information.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Warm regards,
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0 0 5px 0; font-weight: 600; text-align: left;">
                Incorp Team
            </p>
        </div>
        
        ${IncorpFooter(data.companyName)}
    </div>
</body>
</html>`,
        plainText: `
CS Processing Request – ${data?.clientName || "Client"}

Dear CS team,

Please proceed with initiating the CS process for the following client:

- Client Name: ${data?.clientName || "N/A"}
- UBOs/Significant Controllers/Person having Executive Authority/Directors: ${
          data?.url ||
          "Click here to review data provided by the client/ WORD doc"
        }

Kindly begin data entry, incorporation documents preparation. This request is also shared with Dylan Ng and Lee Wei Hsiung for visibility.

Please let me know if you require any additional information.

Warm regards,
${data?.dealOwnerName || "Alex Teo"}
Senior Business Development Manager
${data?.companyName || "InCorp"} Global Pte. Ltd.

© ${new Date().getFullYear()} ${
          data?.companyName || "InCorp"
        }. All rights reserved.
${data?.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
    `,
      })
    );

    // prelim KYC suucess internal agent template
    this.templates.set(
      EmailTemplate.PRELIM_KYC_SUCCESS_INTERNAL_AGENT,
      (
        data: {
          clientName?: string;
          recipientName?: string;
          dealOwnerName?: string;
          csRecipientName?: string;
          url?: string;
          companyName?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `KYC Verification Complete – ${data?.clientName || "Client"}`,
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
        ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong>${data?.recipientName || "User"}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                The preliminary KYC for the following client has been <strong style="color: #28a745;">successfully completed</strong>. Please verify and proceed the client to the next onboarding stage:
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0;">
                <p style="font-size: 16px; color: #2f465a; margin: 0 0 10px 0; line-height: 1.6;">
                    <strong>Client Name:</strong> ${data?.clientName || "N/A"}
                </p>
                <p style="font-size: 16px; color: #2f465a; margin: 0 0 10px 0; line-height: 1.6;">
                    <strong>Verification Status:</strong> <span style="color: #28a745; font-weight: 600;">Approved</span>
                </p>
                
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0; line-height: 1.6;">
                Please verify the completed KYC documentation and proceed with moving the client to the next onboarding stage.
            </p>
            
            ${
              data?.url
                ? `
                <a href="${data.url}" style="display: inline-block; background-color: #28a745; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600; margin: 10px 0;">
                    View Client Profile
                </a>
            `
                : ""
            }

            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                Please confirm once you have verified the KYC and moved the client to the next onboarding stage.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Best regards,
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0 0 5px 0; font-weight: 600; text-align: left;">
                Incorp Team
            </p>
        </div>
        
        ${IncorpFooter(data.companyName)}
    </div>
</body>
</html>`,
        plainText: `
KYC Verification Complete – ${data?.clientName || "Client"}

Dear KYC team,

The preliminary KYC for the following client has been successfully completed. Please verify and proceed the client to the next onboarding stage:

- Client Name: ${data?.clientName || "N/A"}
- Verification Status: Approved

Please verify the completed KYC documentation and proceed with moving the client to the next onboarding stage. All screening processes have been completed successfully.

${data?.url ? `View Client Profile: ${data.url}` : ""}

Please confirm once you have verified the KYC and moved the client to the next onboarding stage. Let me know if you need any additional information.

Best regards,
${data?.dealOwnerName || "Alex Teo"}
Senior Business Development Manager
${data?.companyName || "InCorp"} Global Pte. Ltd.

© ${new Date().getFullYear()} ${
          data?.companyName || "InCorp"
        }. All rights reserved.
${data?.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
    `,
      })
    );

    // prelim KYC failure internal agent template
    this.templates.set(
      EmailTemplate.PRELIM_KYC_FAILURE_INTERNAL_AGENT,
      (
        data: {
          clientName?: string;
          dealOwnerName?: string;
          csRecipientName?: string;
          recipientName?: string;
          url?: string;
          companyName?: string;
          companyAddress?: string;
          failureReason?: string;
          reviewDate?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `KYC Verification Failed – ${
          data?.clientName || "Client"
        } - Action Required`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Failed</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong>${
                  data?.recipientName || "Client Support"
                }</strong>,
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                The preliminary KYC for the following client has <strong style="color: #dc3545;">failed verification</strong>. Please review and take appropriate action:
            </p>
            
            <div style="background-color: #fff5f5; padding: 20px; border-left: 4px solid #dc3545; margin: 20px 0;">
                <p style="font-size: 16px; color: #2f465a; margin: 0 0 10px 0; line-height: 1.6;">
                    <strong>Client Name:</strong> ${data?.clientName || "N/A"}
                </p>
                <p style="font-size: 16px; color: #2f465a; margin: 0 0 10px 0; line-height: 1.6;">
                    <strong>Verification Status:</strong> <span style="color: #dc3545; font-weight: 600;">Failed</span>
                </p>
                <p style="font-size: 16px; color: #2f465a; margin: 0 0 10px 0; line-height: 1.6;">
                    <strong>Review Date:</strong> ${
                      data?.reviewDate || new Date().toLocaleDateString()
                    }
                </p>
               
            </div>
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0; line-height: 1.6;">
                Please review the failed KYC documentation and determine the next course of action. This may require additional documentation from the client or escalation to management.
            </p>
            
            ${
              data?.url
                ? `
                <a href="${data.url}" style="display: inline-block; background-color: #dc3545; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600; margin: 10px 0;">
                    Review Failed KYC
                </a>
            `
                : ""
            }

            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                Please confirm the actions taken and inform the client accordingly. Let me know if you need any additional information or support.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Best regards,
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0 0 5px 0; font-weight: 600; text-align: left;">
                Incorp Team
            </p>
        </div>
        
        ${IncorpFooter(data.companyName)}
    </div>
</body>
</html>`,
        plainText: `
KYC Verification Failed – ${data?.clientName || "Client"} - Action Required

Dear KYC team,

The preliminary KYC for the following client has failed verification. Please review and take appropriate action:

- Client Name: ${data?.clientName || "N/A"}
- Verification Status: Failed

Please review the failed KYC documentation and determine the next course of action. This may require additional documentation from the client or escalation to management.

${data?.url ? `Review Failed KYC: ${data.url}` : ""}

Please confirm the actions taken and inform the client accordingly. Let me know if you need any additional information or support.

Best regards,
${data?.dealOwnerName || "Alex Teo"}
Senior Business Development Manager
${data?.companyName || "InCorp"} Global Pte. Ltd.

© ${new Date().getFullYear()} ${
          data?.companyName || "InCorp"
        }. All rights reserved.
${data?.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
    `,
      })
    );

    // onboarding submission cs team internal agent template
    this.templates.set(
      EmailTemplate.ONBOARDING_SUBMITTED_INTERNAL_AGENT,
      (
        data: {
          clientName?: string;
          dealOwnerName?: string;
          csRecipientName?: string;
          url?: string;
          documentUrl?: string;
          companyName?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `CS Processing Request – ${data?.clientName || "Client"}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS Processing Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong>CS team</strong>,
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Please proceed with initiating the CS process for the following client:
            </p>
            
            <div style=" margin: 20px 0;">
                <p style="font-size: 16px; color: #2f465a; margin: 0 0 10px 0; line-height: 1.6;">
                    <strong>Client Name:</strong> ${data?.clientName || "N/A"}
                </p>
                <p style="font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                    UBOs/Significant Controllers/Person having Executive Authority/Directors: Please <a href="${
                      data?.documentUrl
                    }" style="color: #007bff; text-decoration: underline;">click here</a> to review data provided by the client/ WORD doc
                </p>
            </div>
            
            
            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0; line-height: 1.6;">
                Kindly begin data entry, incorporation documents preparation. This request is also shared with Dylan Ng and Lee Wei Hsiung for visibility.
            </p>
            
            <a href="${
              data.url
            }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600;">
                     Review Details
                </a>


            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                Please let me know if you require any additional information.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Warm regards,
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0 0 5px 0; font-weight: 600; text-align: left;">
                 Incorp Team
            </p>
        </div>
        
        ${IncorpFooter(data.companyName)}
    </div>
</body>
</html>`,
        plainText: `
CS Processing Request – ${data?.clientName || "Client"}

Dear CS team,

Please proceed with initiating the CS process for the following client:

- Client Name: ${data?.clientName || "N/A"}
- UBOs/Significant Controllers/Person having Executive Authority/Directors: ${
          data?.url ||
          "Click here to review data provided by the client/ WORD doc"
        }

${
  data?.documentUrl
    ? `Please click here to view all the uploaded documents: ${data.documentUrl}`
    : ""
}

Kindly begin data entry, incorporation documents preparation. This request is also shared with Dylan Ng and Lee Wei Hsiung for visibility.

Please let me know if you require any additional information.

Warm regards,
${data?.dealOwnerName || "Alex Teo"}
Senior Business Development Manager
${data?.companyName || "InCorp"} Global Pte. Ltd.

© ${new Date().getFullYear()} ${
          data?.companyName || "InCorp"
        }. All rights reserved.
${data?.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
`,
      })
    );

    // onboarding submission kyc internal agent template
    this.templates.set(
      EmailTemplate.ONBOARDING_SUBMITTED_KYC_INTERNAL_AGENT,
      (
        data: {
          clientName?: string;
          dealOwnerName?: string;
          csRecipientName?: string;
          recipientName?: string;
          url?: string;
          documentUrl?: string;
          companyName?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `KYC Processing Request – ${data?.clientName || "Client"}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS Processing Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        ${header()}
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 15px 0; line-height: 1.6;">
                Dear <strong>${data?.recipientName || "User"}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 20px 0; line-height: 1.6;">
                Please proceed with initiating the CS process for the following client:
            </p>
            
            <div style=" margin: 20px 0;">
                <p style="font-size: 16px; color: #2f465a; margin: 0 0 10px 0; line-height: 1.6;">
                    <strong>Client Name:</strong> ${data?.clientName || "N/A"}
                </p>
                <p style="font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                    UBOs/Significant Controllers/Person having Executive Authority/Directors: Please <a href="${
                      data?.documentUrl
                    }" style="color: #007bff; text-decoration: underline;">click here</a> to review data provided by the client/ WORD doc
                </p>
            </div>

            
            <p style="font-size: 16px; color: #2f465a; margin: 20px 0; line-height: 1.6;">
Kindly begin data entry, name screening, and e-KYC setup. This request is also shared with Dylan Ng and Lee Wei Hsiung for visibility.
            </p>
            
            <a href="${
              data.url
            }" style="display: inline-block; background-color: #bb2121; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: 600;">
                     Review KYC
                </a>


            <p style="font-size: 16px; color: #2f465a; margin: 20px 0 0 0; line-height: 1.6;">
                Please let me know if you require any additional information.
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 25px;">
            <p style="font-size: 16px; color: #2f465a; margin: 0 0 5px 0; text-align: left;">
                Warm regards,
            </p>
            <p style="font-size: 16px; color: #bb2121; margin: 0 0 5px 0; font-weight: 600; text-align: left;">
                Incorp Team
            </p>
        </div>
        
        ${IncorpFooter(data.companyName)}
    </div>
</body>
</html>`,
        plainText: `
KYC Processing Request – ${data?.clientName || "Client"}

Dear ${data?.recipientName || "User"},

Please proceed with initiating the CS process for the following client:

- Client Name: ${data?.clientName || "N/A"}
- UBOs/Significant Controllers/Person having Executive Authority/Directors: ${
          data?.url ||
          "Click here to review data provided by the client/ WORD doc"
        }

${
  data?.documentUrl
    ? `Please click here to view all the uploaded documents: ${data.documentUrl}`
    : ""
}

Kindly begin data entry, name screening, and e-KYC setup. This request is also shared with Dylan Ng and Lee Wei Hsiung for visibility.

Please let me know if you require any additional information.

Warm regards,
${data?.dealOwnerName || "Alex Teo"}
Senior Business Development Manager
${data?.companyName || "InCorp"} Global Pte. Ltd.

© ${new Date().getFullYear()} ${
          data?.companyName || "InCorp"
        }. All rights reserved.
${data?.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
`,
      })
    );

    // bluemeg email template
    this.templates.set(
      EmailTemplate.BLUEMEG_FILE_PROCESSING_REPORT,
      (data: {
        reportDate?: string;
        totalFiles?: string;
        successCount?: string;
        errorCount?: string;
        csvAttached?: string;
        companyAddress?: string;
      }) => ({
        subject: `BlueMeg File Processing Report`,
        html: `<!DOCTYPE html>
              <html lang="en">

                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>BlueMeg File Bulk Uploader Report</title>
                </head>

                <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f5f7fa;">
                    <div style="max-width: 650px; margin: 0 auto; padding: 0; background-color: #ffffff; box-shadow: 0 3px 10px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
                        <!-- Header Section -->
                        <div style="text-align: center; padding: 25px 20px; background-color: #1976d2; margin-bottom: 0;">
                            <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="Incorp" style="max-width: 180px; height: auto;" />
                        </div>

                        <!-- Report Header -->
                        <div style="padding: 30px 30px 20px; background-color: #ffffff; margin-bottom: 0;">
                            <h2 style="color: #2c5aa0; margin-top: 0; font-size: 24px; border-bottom: 2px solid #eaeaea; padding-bottom: 15px;">File Uploader Service Report</h2>
                            <p style="font-size: 16px; color: #555;">Dear Team,</p>
                            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
                                This is your automated report for the BlueMeg File Uploader service. Below you'll find a summary of all file operations completed during the processing cycle.
                            </p>
                            <div style="background-color: #f7f9fc; padding: 20px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #2c5aa0;">
                                <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #666; font-weight: bold; width: 40%;">Report Date:</td>
                                        <td style="padding: 8px 0;">${
                                          data.reportDate ||
                                          new Date().toLocaleDateString()
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #666; font-weight: bold;">Total Files Processed:</td>
                                        <td style="padding: 8px 0;">${
                                          data.totalFiles || 0
                                        }</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <!-- Summary Statistics -->
                        <div style="padding: 0 30px 20px; background-color: #ffffff;">
                            <h3 style="color: #2c5aa0; border-bottom: 2px solid #eaeaea; padding-bottom: 10px; font-size: 20px;">Processing Summary</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 20px;">
                                <div style="flex: 1; min-width: 150px; background-color: #e8f5e9; padding: 20px; border-radius: 6px; text-align: center; border-bottom: 4px solid #4caf50; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                                    <div style="font-size: 32px; font-weight: bold; color: #2e7d32; margin-bottom: 5px;">${
                                      data.successCount || 0
                                    }</div>
                                    <div style="color: #2e7d32; font-size: 15px; font-weight: 500;">Successfully Processed</div>
                                </div>
                                <div style="flex: 1; min-width: 150px; background-color: #ffebee; padding: 20px; border-radius: 6px; text-align: center; border-bottom: 4px solid #ef5350; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                                    <div style="font-size: 32px; font-weight: bold; color: #c62828; margin-bottom: 5px;">${
                                      data.errorCount || 0
                                    }</div>
                                    <div style="color: #c62828; font-size: 15px; font-weight: 500;">Failed Processing</div>
                                </div>
                            </div>
                        </div>

                        <!-- CSV Attachment Notice -->
                        ${
                          data.csvAttached
                            ? `
                        <div style="padding: 0 30px 30px; background-color: #ffffff;">
                            <div style="background-color: #e3f2fd; border-radius: 6px; padding: 20px; border-left: 4px solid #1976d2;">
                                <h4 style="color: #0d47a1; margin-top: 0; display: flex; align-items: center; font-size: 18px;">
                                    <span style="margin-right: 10px;">📊</span> Detailed Report Attachment
                                </h4>
                                <p style="margin-bottom: 0; color: #0d47a1; font-size: 15px;">
                                    A detailed CSV report containing all file processing information has been attached to this email. This report includes complete processing logs, timestamps, and additional technical details. An additional CSV file is also attached containing only the
                                    failed files and their paths.
                                </p>
                            </div>
                        </div>
                        `
                            : ""
                        }

                        <!-- Footer -->
                        <div style="font-size: 13px; text-align: center; color: #757575; margin-top: 0; border-top: 1px solid #eaeaea; padding: 25px 30px; background-color: #f7f9fc;">
                            <p style="margin-bottom: 10px;">&copy; ${new Date().getFullYear()} BlueMeg File Orchestrator. All rights reserved.</p>
                            <p style="margin-bottom: 10px;">This is an automated report generated by the BlueMeg File Orchestrator service.</p>
                            <p style="margin-bottom: 10px;">${
                              data.companyAddress ||
                              "36 Robinson Rd, #20-01 City House, Singapore 068877"
                            }</p>
                            <p style="font-size: 11px; color: #9e9e9e; margin-bottom: 0;">
                                Generated: ${new Date().toISOString()}
                            </p>
                        </div>
                    </div>
                </body>
              </html>
            `,
        plainText: `
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
