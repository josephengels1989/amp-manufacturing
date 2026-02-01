import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: #0a0a0a; padding: 30px; text-align: center;">
          <h1 style="color: #c9a227; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <div style="margin-bottom: 20px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">Name</p>
            <p style="margin: 0; font-size: 16px;">${name}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">Email</p>
            <p style="margin: 0; font-size: 16px;"><a href="mailto:${email}" style="color: #c9a227;">${email}</a></p>
          </div>
          ${company ? `
          <div style="margin-bottom: 20px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">Company</p>
            <p style="margin: 0; font-size: 16px;">${company}</p>
          </div>
          ` : ''}
          <div style="margin-bottom: 20px;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">Message</p>
            <p style="margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        <div style="background: #0a0a0a; padding: 20px; text-align: center;">
          <a href="mailto:${email}?subject=Re: Your inquiry to ANT Manufacturing" style="display: inline-block; background: #c9a227; color: #0a0a0a; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">Reply to ${name}</a>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}
    `.trim();

    // Send notification to ANT
    const { data, error } = await resend.emails.send({
      from: 'ANT Website <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || process.env.REVIEW_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Send confirmation to the submitter
    const confirmationHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: #0a0a0a; padding: 30px; text-align: center;">
          <h1 style="color: #c9a227; margin: 0; font-size: 24px;">We got your message</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.6;">Hi ${name},</p>
          <p style="font-size: 16px; line-height: 1.6;">Thanks for reaching out to ANT Manufacturing. We've received your inquiry and will get back to you within one business day.</p>
          <p style="font-size: 16px; line-height: 1.6;">In the meantime, here's a copy of what you sent us:</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #666;">${message}</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">Talk soon,<br><strong>The ANT Team</strong></p>
        </div>
        <div style="background: #f9f9f9; padding: 20px; text-align: center; color: #888; font-size: 12px;">
          ANT Manufacturing · California, USA
        </div>
      </div>
    `;

    // Send confirmation (don't fail if this one errors)
    await resend.emails.send({
      from: 'ANT Manufacturing <onboarding@resend.dev>',
      to: email,
      subject: 'We received your message - ANT Manufacturing',
      html: confirmationHtml,
    }).catch(err => console.error('Confirmation email error:', err));

    return res.status(200).json({ success: true, id: data.id });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
