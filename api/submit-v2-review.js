import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Map responses to readable labels
    const questionLabels = {
      hero_section: '1. Hero Section - Static copper image',
      reframe_animation: '2. Reframe Animation - Placement',
      centered_layout: '3. Centered Text Layout',
      video_strips: '4. Video Strips',
      tech_specs: '5. Technical Specifications',
      overall_impression: '6. Overall Impression',
      next_steps: '7. Next Steps',
      logo_design: '8. Logo Design',
      domain_name: '9. Domain Name',
      domain_details: '   Domain Details',
      content_removals: '10. Content Removals',
      content_removal_notes: '   Content Removal Notes',
      navigation: '11. Navigation',
      navigation_notes: '   Navigation Notes',
      copy_messaging: '12. Copy & Messaging',
      contact_approach: '13. Contact Approach',
      contact_notes: '   Contact Notes',
      site_structure: '14. Overall Site Structure'
    };

    // Build HTML email
    let htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: #0a0a0a; padding: 30px; text-align: center;">
          <h1 style="color: #c9a227; margin: 0; font-size: 24px;">V2 Review Feedback</h1>
          <p style="color: #888; margin: 10px 0 0;">From Joe's Review</p>
        </div>
    `;

    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.trim()) {
        htmlContent += `
          <div style="padding: 25px; border-bottom: 1px solid #eee;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; margin: 0 0 5px;">${questionLabels[key] || key}</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${value}</p>
          </div>
        `;
      }
    });

    htmlContent += `
        <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #888; font-size: 12px;">
          Submitted from Ampersand Manufacturing V2 review form
        </div>
      </div>
    `;

    // Build plain text version
    let textContent = `V2 Review Feedback\n\n`;
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.trim()) {
        textContent += `${questionLabels[key] || key}:\n${value}\n\n`;
      }
    });

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Ampersand Website <onboarding@resend.dev>',
      to: process.env.REVIEW_EMAIL || 'brian@example.com',
      subject: 'V2 Review Feedback from Joe',
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
