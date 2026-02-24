import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, company, message, attachments } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeMessage = escapeHtml(message);

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: #0a0a0a; padding: 30px; text-align: center;">
          <h1 style="color: #B87333; margin: 0; font-size: 24px;">New Inquiry</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <div style="margin-bottom: 20px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">Email</p>
            <p style="margin: 0; font-size: 16px;"><a href="mailto:${safeEmail}" style="color: #B87333;">${safeEmail}</a></p>
          </div>
          ${safeCompany ? `
          <div style="margin-bottom: 20px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">Company</p>
            <p style="margin: 0; font-size: 16px;">${safeCompany}</p>
          </div>
          ` : ''}
          ${safeMessage ? `
          <div style="margin-bottom: 20px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">Message</p>
            <p style="margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          ` : '<p style="color: #999; font-style: italic;">No message included. Check attachments.</p>'}
          ${attachments && attachments.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">Attachments</p>
            <p style="margin: 0; font-size: 16px;">${attachments.map(a => escapeHtml(a.filename)).join(', ')}</p>
          </div>
          ` : ''}
        </div>
        <div style="background: #0a0a0a; padding: 20px; text-align: center;">
          <a href="mailto:${safeEmail}?subject=Re: Your inquiry to Ampersand Manufacturing" style="display: inline-block; background: #B87333; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">Reply</a>
        </div>
      </div>
    `;

    const subject = `New inquiry${safeCompany ? ` from ${safeCompany}` : ''} (${safeEmail})`;

    const resendAttachments = attachments
      ? attachments.map(a => ({
          filename: a.filename,
          content: Buffer.from(a.content, 'base64'),
        }))
      : [];

    const emailOptions = {
      from: 'Ampersand Manufacturing <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'joe@ampmanufacturing.com',
      replyTo: email,
      subject,
      html: htmlContent,
    };

    if (resendAttachments.length > 0) {
      emailOptions.attachments = resendAttachments;
    }

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
