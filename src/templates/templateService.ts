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
        subject: `Let’s Get Started with Your Onboarding​`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - KYC Process</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Welcome! Please complete your onboarding process.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto; ">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName
                                                ? data?.recipientName
                                                : "User"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Thank you message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           Thank you for choosing to work with InCorp. We’re happy to
support you on this journey.​
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instructions -->
                                <tr>
                                    <td style="padding-bottom: 30px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           To get things started, please complete the onboarding form
by filling in all the required sections at your earliest
convenience.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Button -->
                                <tr>
                                    <td class="button-td" style="text-align: center; ">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #bb2121;">
                                                    <a class="button-a" href="${
                                                      data.url
                                                    }" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #bb2121;">
                                                        Begin Onboarding
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Contact message -->
                                <tr>
                                    <td style="padding-top: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           If you have any questions or need any assistance along the
way, feel free to reach out. We're here to help.​
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${
                                              data?.companyName || "InCorp"
                                            } Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data?.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        plainText: `
Welcome to ${data.companyName || "InCorp"}!

${data.recipientName ? `Dear ${data.recipientName},` : ""}

Thank you for choosing ${
          data.companyName || "InCorp"
        } for your business incorporation needs. We're excited to help you start your entrepreneurial journey!

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
        subject: `Onboarding Submission Received​`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Submission Received - ${data?.companyName || "InCorp"}</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        KYC submission received - next steps for verification.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            ${
                                              data?.recipientName
                                                ? `Dear <strong>${data?.recipientName}</strong>,`
                                                : "Dear User,"
                                            }
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Acknowledgement message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           Thanks for your Onboarding submission. We appreciate your
prompt response.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Next steps message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Our team is now reviewing the information, and we’ll keep
you updated on the next steps as we move forward.​                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Update message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                          If you have any questions in the meantime, feel free to reach
out.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Best regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${
                                              data?.companyName || "InCorp"
                                            } Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data?.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        plainText: `
KYC Submission Received - ${data.companyName || "InCorp"}

${data.recipientName ? `Dear ${data.recipientName},` : "Dear User,"}

We acknowledge receipt of your completed Onboarding form and the accompanying documents. Thank you for your prompt response.

As the next step, electronic Know Your Customer (e-KYC) verification links will be sent to the Ultimate Beneficial Owners (UBOs), Significant Controllers, Person having Executive Authority and Directors listed in your submission. Kindly inform the relevant individuals to complete the verification process at their earliest convenience.

We will continue to keep you informed of the progress.

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
        subject: `Onboarding Process – Next Steps​`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onboarding Process - ${data?.companyName || "InCorp"}</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Complete your onboarding form and submit required documents.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName
                                                ? data?.recipientName
                                                : "User"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Thank you message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           Thank you for choosing to engage our services. We are
pleased to support you through the onboarding process.​
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instructions -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           To continue your Onboarding process, please complete all
required sections of the Onboarding form at your earliest
convenience.​
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Document checklist message -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           For your reference, we have also attached a checklist of the
necessary corporate documents. Kindly ensure that all
relevant documents are submitted along with the
completed form.​
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Button -->
                                <tr>
                                    <td class="button-td" style="text-align: center; padding: 30px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #bb2121;">
                                                    <a class="button-a" href="${
                                                      data.url
                                                    }" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #bb2121;">
                                                        Complete Next Step
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Contact message -->
                                <tr>
                                    <td style="padding-top: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                          Should you require any assistance or clarification, please do
not hesitate to contact us. We will be glad to support you.​

​
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Best regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${
                                              data?.companyName || "InCorp"
                                            } Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data?.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        plainText: `
Onboarding Process - ${data.companyName || "InCorp"}

${data.recipientName ? `Dear ${data.recipientName},` : "Dear User,"}

Thank you for choosing to engage our services.

To initiate the onboarding process, kindly fill in all required sections here at your earliest convenience.

Additionally, we have attached a checklist outlining the required corporate documents. Please ensure that all applicable documents are submitted together with the completed Onboarding form.

${data.url ? `Complete your onboarding: ${data.url}` : ""}

Should you have any questions or require clarification, please do not hesitate to contact us.

Best regards,
${data.companyName || "InCorp"} Team

© ${new Date().getFullYear()} ${
          data.companyName || "InCorp"
        }. All rights reserved.
${data.companyAddress || "36 Robinson Rd, #20-01 City House, Singapore 068877"}
    `,
      })
    );

    //skip prelim KYC and direct onboarding
    this.templates.set(
      EmailTemplate.ONBOARDING_NOTSTARTED_WELCOME_EMAIL,
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
        subject: `Onboarding Process – Next Steps​`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - Onboarding Process - ${
      data?.companyName || "InCorp"
    }</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Welcome! Begin your onboarding process and submit required documents.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName
                                                ? data?.recipientName
                                                : "User"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Thank you message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           Thank you for choosing to engage our services. We are
pleased to support you through the onboarding process.​
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instructions -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            To begin, please complete all required sections of the
onboarding form at your earliest convenience.​
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Document checklist message -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           For your reference, we have also attached a checklist of the
necessary corporate documents. Kindly ensure that all
relevant documents are submitted along with the
completed form.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Button -->
                                <tr>
                                    <td class="button-td" style="text-align: center; padding: 30px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #bb2121;">
                                                    <a class="button-a" href="${
                                                      data.url
                                                    }" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #bb2121;">
                                                        Begin Onboarding
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Contact message -->
                                <tr>
                                    <td style="padding-top: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            SShould you require any assistance or clarification, please do
not hesitate to contact us. We will be glad to support you.​
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Best regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${
                                              data?.companyName || "InCorp"
                                            } Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data?.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        plainText: `
Welcome to ${data.companyName || "InCorp"}!

${data.recipientName ? `Dear ${data.recipientName},` : "Dear User,"}

Thank you for choosing to engage our services.

To initiate the onboarding process, kindly fill in all required sections here at your earliest convenience.

Additionally, we have attached a checklist outlining the required corporate documents. Please ensure that all applicable documents are submitted together with the completed Onboarding form.

${data.url ? `Begin your onboarding: ${data.url}` : ""}

Should you have any questions or require clarification, please do not hesitate to contact us.

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
        subject: `Onboarding Submission Received – Next Steps`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Details Under Review - ${data?.companyName || "InCorp"}</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Onboarding form received - e-KYC verification links will be sent next.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName
                                                ? data?.recipientName
                                                : "User"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Acknowledgement message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                          We acknowledge receipt of your completed onboarding
form and accompanying documents. Thank you for your
prompt response.​
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Next steps message -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            As the next step, electronic Know Your Customer (e-KYC)
verification links will be sent to the Ultimate Beneficial
Owners (UBOs), Significant Controllers, Persons with
Executive Authority, and Directors listed in your submission.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Update message -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            We kindly ask that you inform the relevant individuals to
complete the verification at their earliest convenience to
avoid delays.​
                                        </p>
                                    </td>
                                </tr>

                                 <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           We will continue to keep you updated on the progress of
your onboarding.
                                        </p>
                                    </td>
                                </tr>
                                
                                
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Best regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${
                                              data?.companyName || "InCorp"
                                            } Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data?.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        plainText: `
Onboarding Submission Received - ${data.companyName || "InCorp"}

${data.recipientName ? `Dear ${data.recipientName},` : "Dear User,"}

We acknowledge receipt of your completed Onboarding form and the accompanying documents. Thank you for your prompt response.

As the next step, electronic Know Your Customer (e-KYC) verification links will be sent to the Ultimate Beneficial Owners (UBOs), Significant Controllers, Person having Executive Authority and Directors listed in your submission. Kindly inform the relevant individuals to complete the verification process at their earliest convenience.

We will continue to keep you informed of the progress.

${data?.documentUrl ? `Download document: ${data.documentUrl}` : ""}

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
        subject: `Outcome of Onboarding Submission Review​`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Update - ${data?.companyName || "InCorp"}</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        KYC verification status update - further assistance available.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            ${
                                              data?.recipientName
                                                ? `Dear <strong>${data?.recipientName}</strong>,`
                                                : "Dear User,"
                                            }
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- KYC Status message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                           Thank you for your Onboarding submission.​
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Support contact message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Following our review, we regret to inform you that we are
unable to onboard you at this time.​
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Should you have any questions or require further
clarification, please do not hesitate to contact your usual
point of contact. We remain available to assist you as
needed.​
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Best regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${
                                              data?.companyName || "InCorp"
                                            } Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data?.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Quick reminder to complete your KYC process - just a few minutes left!
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Casual greeting -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Hi <strong>${
                                              data?.recipientName
                                                ? data?.recipientName
                                                : "[Customer Name]"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Friendly reminder message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            We noticed you started your KYC process but didn't get a chance to finish it. No worries — it happens!
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instructions to continue -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            To continue where you left off, just click the button below. It only takes a few minutes to complete, and it's an essential step to get you fully onboarded.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Resume Button -->
                                <tr>
                                    <td class="button-td" style="text-align: center; padding: 30px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #bb2121;">
                                                    <a class="button-a" href="${
                                                      data.url
                                                    }" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #bb2121;">
                                                        Resume KYC Submission
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Support message -->
                                <tr>
                                    <td style="padding-top: 20px; padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            If you need help or have any questions, our team is just a message away.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Closing message -->
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Looking forward to having you all set up!
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${
                                              data?.companyName || "InCorp"
                                            } Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data?.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .otp-display {
                font-size: 40px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Your verification code: ${data?.otp} - expires in ${
          data?.expirationMinutes
        } minutes
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Blue Header Section -->
                    <tr>
                        <td style="background-color: #2f465a; color: #ffffff; padding: 40px 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Welcome heading -->
                                <tr>
                                    <td style="padding-bottom: 10px;">
                                        <h1 style="margin: 0; font-family: Arial, sans-serif; font-size: 24px; font-weight: 600; color: #ffffff;">
                                            Dear ${
                                              data?.recipientName || "User"
                                            },
                                        </h1>
                                    </td>
                                </tr>
                                
                                <!-- Instructions -->
                                <tr>
                                    <td style="padding-bottom: 24px;">
                                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 13px; color: #ffffff; line-height: 1.5;">
                                            Here's your One-Time Password (OTP) to proceed with your next step, this code expires after ${
                                              data?.expirationMinutes
                                            } minutes.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Large OTP Display -->
                                <tr>
                                    <td>
                                        <div class="otp-display" style="font-size: 50px; font-weight: bold; color: #ffffff; font-family: 'Courier New', monospace;">
                                            ${data?.otp}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 30px; text-align: center; background-color: #ffffff;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Security notice -->
                                <tr>
                                    <td style="margin-bottom: 30px;">
                                        <h3 style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 16px; color: #666666; font-weight: 600;">
                                            Do Not Share This Email
                                        </h3>
                                        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #888888; line-height: 1.5;">
                                            This email contains a secure code for ${
                                              data?.companyName || "InCorp"
                                            }. Please do not share this email, link, or access code with others.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Email Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data?.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        KYC clarification required - please review and update your information.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data.recipientName ||
                                              "[Customer Name]"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Introduction message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Thank you for submitting your preliminary KYC form. Upon review, our team has identified a few details that require clarification to proceed with your KYC verification.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Clarification Notes Section -->
                                <tr>
                                    <td style="padding: 25px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <!-- Section heading -->
                                            <tr>
                                                <td style="padding-bottom: 15px;">
                                                    <h3 style="font-family: Arial, sans-serif; color: #2f465a; font-size: 18px; margin: 0; font-weight: 600;">
                                                        📝 Clarification Notes:
                                                    </h3>
                                                </td>
                                            </tr>
                                            
                                            <!-- Notes content -->
                                            <tr>
                                                <td style="background-color: #f0f8ff; padding: 18px; border-radius: 6px; border-left: 4px solid #4a90e2;">
                                                    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; line-height: 1.6;">
                                                        ${this.renderClarificationNotes(
                                                          data.clarificationNotes
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Review instructions -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            To review and update your KYC information, kindly click the button below:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- CTA Button -->
                                <tr>
                                    <td class="button-td" style="text-align: center; padding: 30px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="border-radius: 6px; background-color: #bb2121; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                                    <a class="button-a" href="${
                                                      data.url || "#"
                                                    }" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; background-color: #bb2121;">
                                                        🔗 Review & Update Your KYC
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Urgency message -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            To keep the process on track, we encourage you to complete the updates as soon as possible.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Contact message -->
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            If you require any further clarification, please feel free to contact us.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0px 25px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${data.companyName || "InCorp"} Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer Information -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; margin: 0; font-size: 12px; color: #888888;">
                                            This is an automated message, Please do not reply to this email.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="margin-top: 15px;">
                                            <p style="font-family: Arial, sans-serif; margin: 0 0 10px 0; font-size: 12px; color: #888888;">
                                                &copy; 2025 ${
                                                  data.companyName || "InCorp"
                                                }. All rights reserved.
                                            </p>
                                            <p style="font-family: Arial, sans-serif; margin: 0; font-size: 12px; color: #888888;">
                                                36 Robinson Rd, #20-01 City House, Singapore 068877
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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
    <title>Onboarding Clarification Required</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Onboarding clarification required - please review and update your information.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data.recipientName ||
                                              "[Customer Name]"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Introduction message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Thank you for submitting your preliminary KYC form. Upon review, our team has identified a few details that require clarification to proceed with your KYC verification.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Clarification Notes Section -->
                                <tr>
                                    <td style="padding: 25px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <!-- Section heading -->
                                            <tr>
                                                <td style="padding-bottom: 15px;">
                                                    <h3 style="font-family: Arial, sans-serif; color: #2f465a; font-size: 18px; margin: 0; font-weight: 600;">
                                                        📝 Clarification Notes:
                                                    </h3>
                                                </td>
                                            </tr>
                                            
                                            <!-- Notes content -->
                                            <tr>
                                                <td style="background-color: #f0f8ff; padding: 18px; border-radius: 6px; border-left: 4px solid #4a90e2;">
                                                    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; line-height: 1.6;">
                                                        ${this.renderClarificationNotes(
                                                          data.clarificationNotes
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Review instructions -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            To review and update your KYC information, kindly click the button below:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- CTA Button -->
                                <tr>
                                    <td class="button-td" style="text-align: center; padding: 30px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="border-radius: 6px; background-color: #bb2121; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                                    <a class="button-a" href="${
                                                      data.url || "#"
                                                    }" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; background-color: #bb2121;">
                                                        🔗 Review & Update Your KYC
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Urgency message -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            To keep the process on track, we encourage you to complete the updates as soon as possible.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Contact message -->
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            If you require any further clarification, please feel free to contact us.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0px 25px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            ${data.companyName || "InCorp"} Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer Information -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter()}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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
        subject: `Action Required: COE Compliance​ Processing Request – ${
          data?.clientName || "Client"
        }`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS Processing Request</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        KYC processing request for ${
          data?.clientName || "client"
        } - action required.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>COE Compliance​ team</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instruction message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please proceed with initiating the CS process for the following client:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Client details -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 10px;">
                                                    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                        <strong>Client Name:</strong> ${
                                                          data?.clientName ||
                                                          "N/A"
                                                        }
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Button -->
                                <tr>
                                    <td class="button-td" style="text-align: left; padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #bb2121;">
                                                    <a class="button-a" href="${
                                                      data.url
                                                    }" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #bb2121;">
                                                        Review KYC
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Contact message -->
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please let me know if you require any additional information.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            InCorp Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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

    // prelim KYC success internal agent template
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
        subject: `Action Required: Prelim KYC Verification Complete – ${
          data?.clientName || "Client"
        }`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Complete</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        KYC verification complete for ${
          data?.clientName || "client"
        } - ready for next stage.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName || "User"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Success message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            The preliminary KYC for the following client has been <strong style="color: #28a745;">successfully completed</strong>. Please verify and proceed the client to the next onboarding stage:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Client details with success styling -->
                                <tr>
                                    <td style="padding: 20px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #28a745;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="padding-bottom: 10px;">
                                                                <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                                    <strong>Client Name:</strong> ${
                                                                      data?.clientName ||
                                                                      "N/A"
                                                                    }
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                                    <strong>Verification Status:</strong> <span style="color: #28a745; font-weight: 600;">Approved</span>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Next steps message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please verify the completed KYC documentation and proceed with moving the client to the next onboarding stage.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Conditional Button -->
                                ${
                                  data?.url
                                    ? `
                                <tr>
                                    <td class="button-td" style="text-align: left; padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #28a745;">
                                                    <a class="button-a" href="${data.url}" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #28a745;">
                                                        View Client Profile
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                `
                                    : ""
                                }
                                             
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Best regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            InCorp Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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
        subject: `Action Required: Prelim KYC Verification Failed – ${
          data?.clientName || "Client"
        } `,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Failed</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        KYC verification failed for ${
          data?.clientName || "client"
        } - action required.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName ||
                                              "Client Support"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Failure message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            The preliminary KYC for the following client has <strong style="color: #dc3545;">failed verification</strong>. Please review and take appropriate action:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Client details with failure styling -->
                                <tr>
                                    <td style="padding: 20px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="background-color: #fff5f5; padding: 20px; border-left: 4px solid #dc3545;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td style="padding-bottom: 10px;">
                                                                <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                                    <strong>Client Name:</strong> ${
                                                                      data?.clientName ||
                                                                      "N/A"
                                                                    }
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding-bottom: 10px;">
                                                                <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                                    <strong>Verification Status:</strong> <span style="color: #dc3545; font-weight: 600;">Failed</span>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                                    <strong>Review Date:</strong> ${
                                                                      data?.reviewDate ||
                                                                      new Date().toLocaleDateString()
                                                                    }
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>                               
                                
                                <!-- Conditional Button -->
                                ${
                                  data?.url
                                    ? `
                                <tr>
                                    <td class="button-td" style="text-align: left; padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #dc3545;">
                                                    <a class="button-a" href="${data.url}" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #dc3545;">
                                                        Review Failed KYC
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                `
                                    : ""
                                }
                                
                                
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Best regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            InCorp Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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
        subject: `Action Required: CS Processing Request – ${data?.clientName || "Client"}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS Processing Request</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        CS processing request for ${
          data?.clientName || "client"
        } - documents ready for review.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>CS team</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instruction message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please proceed with initiating the CS process for the following client:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Client details -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 10px;">
                                                    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                        <strong>Client Name:</strong> ${
                                                          data?.clientName ||
                                                          "N/A"
                                                        }
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                        UBOs/Significant Controllers/Person having Executive Authority/Directors: Please click here to review data provided by the client/ WORD doc
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Process instructions -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Kindly begin data entry, incorporation documents preparation. This request is also shared with Dylan Ng and Lee Wei Hsiung for visibility.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Conditional Download Button -->
                                ${
                                  data?.documentUrl
                                    ? `
                                <tr>
                                    <td class="button-td" style="text-align: left; padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #2f465a;">
                                                    <a class="button-a" href="${data.documentUrl}" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #2f465a;">
                                                        Download Documents
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                `
                                    : ""
                                }
                                
                                <!-- Contact message -->
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please let me know if you require any additional information.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            InCorp Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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

    // MSA and SOW preparation template
    this.templates.set(
      EmailTemplate.MSA_SOW_PREPARATION_REQUEST,
      (
        data: {
          clientName?: string;
          dealOwnerName?: string;
          recipientName?: string;
          companyName?: string;
          companyAddress?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `Action Required: MSA and SOW Preparation Request – ${
          data?.clientName || "Client"
        }`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MSA and SOW Preparation Request</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        MSA and SOW preparation request for ${data?.clientName || "client"}.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName || "User"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Request message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please proceed with preparing the MSA and SOW for the following client:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Client details -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            <strong>Client Name:</strong> ${
                                              data?.clientName || "N/A"
                                            }
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instructions -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            <strong>Please start preparing MSA and SOW. When ready, upload into HubSpot Deal.</strong>
                                        </p>
                                    </td>
                                </tr>
                                
                                
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            InCorp Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        plainText: `
MSA and SOW Preparation Request – ${data?.clientName || "Client"}

Dear ${data?.recipientName || "User"},

Please proceed with preparing the MSA and SOW for the following client:

- Client Name: ${data?.clientName || "N/A"}

Please start preparing MSA and SOW. When ready, upload into HubSpot Deal.

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

    //MSA and SOW upload requiest Template
    this.templates.set(
      EmailTemplate.MSA_SOW_UPLOAD_REQUEST,
      (
        data: {
          clientName?: string;
          dealOwnerName?: string;
          recipientName?: string;
          companyName?: string;
          companyAddress?: string;
          hubspotDealLink?: string;
          url?: string;
          dealId?: string;
        } = {
          companyName: "InCorp",
          companyAddress: "36 Robinson Rd, #20-01 City House, Singapore 068877",
        }
      ) => ({
        subject: `Action Required: Upload MSA & SOW Documents – ${
          data?.clientName || "Client"
        }`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MSA and SOW Upload Request</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Upload MSA and SOW documents for ${
          data?.clientName || "client"
        } to HubSpot.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName || "User"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Hope message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Hope you have prepared the MSA and SOW documents for the following client:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Client details -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            <strong>Client Name:</strong> ${
                                              data?.clientName || "N/A"
                                            }
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Upload instructions -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Kindly upload the finalized documents to the respective HubSpot deal at your earliest convenience.
                                        </p>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="button-td" style="text-align: left; padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #bb2121;">
                                                    <a class="button-a" href="${
                                                      data.url
                                                    }" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #bb2121;">
                                                        Review
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Contact message -->
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please let me know if you require any additional information.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            InCorp Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        plainText: `
Action Required: Upload MSA & SOW Documents – ${data?.clientName || "Client"}

Dear ${data?.recipientName || "User"},

I hope the MSA and SOW preparation for ${
          data?.clientName || "Client"
        } is progressing well.

Action Required:
Please upload the completed MSA and SOW documents to the HubSpot Deal at your earliest convenience.

Upload Details:
- Client Name: ${data?.clientName || "N/A"}
- Deal ID: ${data?.dealId || "Please check HubSpot"}
${data?.hubspotDealLink ? `- HubSpot Deal Link: ${data.hubspotDealLink}` : ""}

Documents to Upload:
1. Master Service Agreement (MSA)
2. Statement of Work (SOW)

Instructions:
• Navigate to the HubSpot Deal
• Upload documents in the "Attachments" section
• Ensure both MSA and SOW are clearly labeled
• Update deal stage once uploaded

Please confirm once the documents have been successfully uploaded to HubSpot.

If you encounter any issues or need assistance with the upload process, please don't hesitate to reach out.

Thank you for your prompt attention to this matter.

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
        subject: `Action Required: KYC Processing Request – ${data?.clientName || "Client"}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Processing Request</title>
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Client-specific styles */
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
            line-height: 100%;
        }
        
        /* Mobile styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .mobile-padding {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
            .button-td {
                padding: 20px 0 !important;
            }
            .button-a {
                padding: 15px 30px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <!-- Preheader text (hidden) -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        KYC processing request for ${
          data?.clientName || "client"
        } - data entry and screening required.
    </div>
    
    <!-- Email Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 20px 0;">
                <!-- Main Email Table -->
                <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        ${header()}
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <!-- Greeting -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Dear <strong>${
                                              data?.recipientName || "User"
                                            }</strong>,
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Instruction message -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please proceed with initiating the KYC process for the following client:
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Client details -->
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 10px;">
                                                    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                        <strong>Client Name:</strong> ${
                                                          data?.clientName ||
                                                          "N/A"
                                                        }
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                                        <strong>UBOs/Significant Controllers/Person having Executive Authority/Directors:</strong> Review the data provided by the client using the buttons below.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Process instructions -->
                                <tr>
                                    <td style="padding-bottom: 25px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Kindly begin data entry, name screening, and e-KYC setup
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Conditional Download Button -->
                                ${
                                  data?.documentUrl
                                    ? `
                                <tr>
                                    <td class="button-td" style="text-align: left; padding-bottom: 20px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="border-radius: 5px; background-color: #2f465a;">
                                                    <a class="button-a" href="${data.documentUrl}" 
                                                       style="display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; background-color: #2f465a;">
                                                        Download Documents
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                `
                                    : ""
                                }
                                
                                <!-- Contact message -->
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0; line-height: 1.6;">
                                            Please let me know if you require any additional information.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td class="mobile-padding" style="padding: 20px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #2f465a; margin: 0 0 5px 0;">
                                            Warm regards,
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 16px; color: #bb2121; margin: 0; font-weight: 600;">
                                            InCorp Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="mobile-padding" style="font-size: 12px; text-align: center; color: #888888; border-top: 1px solid #eeeeee; padding: 20px 25px 25px 25px;">
                            ${IncorpFooter(data.companyName)}
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        plainText: `
KYC Processing Request – ${data?.clientName || "Client"}

Dear ${data?.recipientName || "User"},

Please proceed with initiating the CS process for the following client:

- Client Name: ${data?.clientName || "N/A"}
- UBOs/Significant Controllers/Person having Executive Authority/Directors: Review data provided by the client

Review KYC: ${data?.url || "N/A"}
${data?.documentUrl ? `Download Documents: ${data.documentUrl}` : ""}

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
                        <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 2px solid #bb2121;">
                          <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="InCorp" style="max-width: 150px; height: auto;" />
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
