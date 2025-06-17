export const header = () => {
  return ` <div style="background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 2px solid #bb2121;">
           <img src="https://www.incorp.asia/wp-content/themes/incorpbeta/assets/images/logo-incorp-global.png" alt="Incorp" style="max-width: 150px; height: auto;" />
        </div>`;
};

export const IncorpFooter = (companyName?: string) => {
  return `<div style="font-size: 12px; text-align: center; color: #888888; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; padding-left: 25px; padding-right: 25px; padding-bottom: 25px;">
            <p style="margin: 0 0 15px 0;">This is an automated message, Please do not reply to this email.</p>
            <div style="margin-top: 15px;">
                <p style="margin: 0 0 10px 0;">&copy; 2025 ${
                  companyName || "InCorp"
                }. All rights reserved.</p>
                <p style="margin: 0;">36 Robinson Rd, #20-01 City House, Singapore 068877</p>
            </div>
        </div>`;
};
