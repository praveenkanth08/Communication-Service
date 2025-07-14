export const header = () => {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td style="background-color: #ffffff; padding: 20px; text-align: center; border-bottom: 2px solid #bb2121;">
                    <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" 
                         alt="InCorp" 
                         width="150" 
                         height="auto" 
                         style="display: block; margin: 0 auto; max-width: 150px; height: auto;" />
                </td>
            </tr>
          </table>`;
};

export const IncorpFooter = (companyName?: string) => {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center; padding-bottom: 8px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #888888; margin: 0;">
                                            This is an automated message, Please do not reply to this email.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #888888; margin: 0 0 10px 0;">
                                            &copy; 2025 ${
                                              companyName || "InCorp"
                                            }. All rights reserved.
                                        </p>
                                        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #888888; margin: 0;">
                                            ${"36 Robinson Road, #20-01 City House, Singapore 068877"}
                                        </p>
                                    </td>
                                </tr>
                            </table>`;
};
