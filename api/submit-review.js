import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    const reviewerName = formData.reviewer_name || 'Unknown';

    // Format the form data into readable HTML
    const sections = [
      {
        title: 'Overall Impressions',
        fields: [
          { label: 'First Impressions (3 words)', value: formData.first_impressions },
          { label: 'Brand Accuracy Rating', value: formData.brand_accuracy ? `${formData.brand_accuracy}/5` : null },
          { label: "What's Missing", value: formData.whats_missing },
        ]
      },
      {
        title: 'Homepage Hero',
        fields: [
          { label: 'Headline Feedback', value: formData.headline_feedback },
          { label: 'Order Size Feedback', value: formData.order_size },
        ]
      },
      {
        title: 'Problem Positioning',
        fields: [
          { label: 'Problem Positioning Feedback', value: formData.problem_positioning },
          { label: 'Complaints Feedback', value: formData.complaints_feedback },
        ]
      },
      {
        title: 'About Page',
        fields: [
          { label: 'Opening Line Feedback', value: formData.about_opening },
          { label: 'Beliefs Feedback', value: formData.beliefs_feedback },
        ]
      },
      {
        title: 'Origin Story (Content)',
        fields: [
          { label: 'Origin Story', value: formData.origin_story },
          { label: 'Name Meaning', value: formData.name_meaning },
        ]
      },
      {
        title: 'Team Bios (Content)',
        fields: [
          { label: "Joe's Bio", value: formData.joe_bio },
          { label: "Quinn's Bio", value: formData.quinn_bio },
        ]
      },
      {
        title: 'How It Works',
        fields: [
          { label: 'Process Feedback', value: formData.process_feedback },
          { label: 'Materials/Capabilities', value: formData.materials },
        ]
      },
      {
        title: 'Contact Info (Content)',
        fields: [
          { label: 'Email', value: formData.contact_email },
          { label: 'Phone', value: formData.contact_phone },
          { label: 'Location', value: formData.contact_location },
        ]
      },
      {
        title: 'Final Thoughts',
        fields: [
          { label: 'Key Takeaway', value: formData.key_takeaway },
          { label: 'Other Feedback', value: formData.other_feedback },
        ]
      },
    ];

    // Build HTML email
    let htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: #0a0a0a; padding: 30px; text-align: center;">
          <h1 style="color: #c9a227; margin: 0; font-size: 24px;">Ampersand Website Review</h1>
          <p style="color: #888; margin: 10px 0 0;">Submitted by ${reviewerName}</p>
        </div>
    `;

    sections.forEach(section => {
      const hasContent = section.fields.some(f => f.value && f.value.trim());
      if (!hasContent) return;

      htmlContent += `
        <div style="padding: 25px; border-bottom: 1px solid #eee;">
          <h2 style="color: #c9a227; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 20px;">${section.title}</h2>
      `;

      section.fields.forEach(field => {
        if (field.value && field.value.trim()) {
          htmlContent += `
            <div style="margin-bottom: 15px;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">${field.label}</p>
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${field.value}</p>
            </div>
          `;
        }
      });

      htmlContent += `</div>`;
    });

    htmlContent += `
        <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #888; font-size: 12px;">
          Submitted from Ampersand Manufacturing website review form
        </div>
      </div>
    `;

    // Build plain text version
    let textContent = `Ampersand Website Review\nSubmitted by: ${reviewerName}\n\n`;
    sections.forEach(section => {
      const hasContent = section.fields.some(f => f.value && f.value.trim());
      if (!hasContent) return;

      textContent += `\n${'='.repeat(40)}\n${section.title.toUpperCase()}\n${'='.repeat(40)}\n\n`;
      section.fields.forEach(field => {
        if (field.value && field.value.trim()) {
          textContent += `${field.label}:\n${field.value}\n\n`;
        }
      });
    });

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Ampersand Website <onboarding@resend.dev>',
      to: process.env.REVIEW_EMAIL || 'brian@example.com',
      subject: `Ampersand Website Review from ${reviewerName}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
