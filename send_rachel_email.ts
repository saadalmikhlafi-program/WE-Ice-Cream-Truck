import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_prevent_build_error');

const BRAND_NAVY  = "#0A1128";
const BRAND_CORAL = "#FF6B6B";
const SITE_URL    = "https://weicecreamtruck.com";
const LOGO_URL    = `${SITE_URL}/images/we-icecream.jpg`; 
const SENDER_EMAIL = 'info@weicecreamtruck.com';

function baseTemplate(content: string, title: string) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body, table, td, p, a { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    img { border:0; display:block; line-height:100%; outline:none; text-decoration:none; }
  </style>
</head>
<body style="margin:0;padding:0;background:#F4F2EE;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="wrapper" style="padding:24px 12px;background:#F4F2EE;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="card" style="max-width:580px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 2px 16px rgba(10,17,40,0.08);">
        <tr>
          <td class="hdr" style="background:#ffffff;padding:32px 24px 24px;text-align:center;border-bottom:3px solid ${BRAND_CORAL};">
            <img src="${LOGO_URL}" alt="WE Ice Cream Truck" width="80" height="80" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin:0 auto 12px;border:3px solid #F4F2EE;"/>
            <p style="margin:0;font-size:13px;font-weight:700;color:#9CA3AF;letter-spacing:2px;text-transform:uppercase;">WE Ice Cream Truck</p>
          </td>
        </tr>
        <tr>
          <td class="body" style="padding:28px 28px 20px; font-size:16px; line-height:1.6; color:#4B5563;">
            ${content}
          </td>
        </tr>
        <tr>
          <td class="ftr" style="background:#F8F7F5;padding:20px 28px;text-align:center;border-top:1px solid #EDE9E4;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:${BRAND_NAVY};">WE Ice Cream Truck</p>
            <p style="margin:0 0 4px;font-size:12px;color:#9CA3AF;">Greater Boston, MA &middot; <a href="tel:617-999-3803" style="color:${BRAND_CORAL};font-weight:600;text-decoration:none;">617-999-3803</a></p>
            <p style="margin:0;font-size:11px;color:#C4BFB8;">&copy; ${new Date().getFullYear()} WE Ice Cream Truck LLC. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendReply() {
    const htmlContent = `
    <p>Hi Rachel,</p>
    <p>Thank you for contacting WE Ice Cream Truck!</p>
    <p>We'd be delighted to be part of your daughter's birthday celebration.</p>
    <p>The easiest way to book is directly through our website. Simply choose the package that best fits your event, complete the booking form, and submit your request. Our booking process is quick and easy.</p>
    <p>If you have any difficulty booking online, you can simply reply to this email with the following information:</p>
    <ul style="margin: 10px 0;">
        <li>Preferred event date</li>
        <li>Event start and end time</li>
        <li>Event address</li>
        <li>Estimated number of guests</li>
        <li>Your preferred package (if known)</li>
    </ul>
    <p>We'll be happy to complete the booking for you.</p>
    <p>If you prefer, you can also contact us by phone, and we'll be glad to assist you.</p>
    <p>Phone: <strong>(617) 999-3803</strong><br/>Phone: <strong>(617) 866-2727</strong></p>
    <p>We look forward to making your event a sweet and memorable experience!</p>
    <p>Best regards,<br/><strong>WE Ice Cream Truck</strong></p>
    `;

    const finalHtml = baseTemplate(htmlContent, "Re: Ice Cream Truck Booking Inquiry");

    try {
        const { data, error } = await resend.emails.send({
            from: '"WE Ice Cream Truck" <info@weicecreamtruck.com>',
            replyTo: 'info@weicecreamtruck.com',
            to: ['backhsgrl@gmail.com'],
            subject: 'Re: Ice Cream Truck Booking Inquiry',
            html: finalHtml,
        });

        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully! ID:", data?.id);
        }
    } catch (e) {
        console.error("Failed to send email:", e);
    }
}

sendReply();
