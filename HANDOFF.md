# ANT Manufacturing Website - Handoff

**Date:** December 13, 2024
**Live URL:** https://ant.sailorskills.com
**Review Form:** https://ant.sailorskills.com/review.html
**GitHub:** https://github.com/standardhuman/ant-manufacturing

---

## What's Done

### Pages
- **Homepage** - Hero with video bg, typing animation, services, process, audience, CTA with image bg
- **About** - Hero with copper toroid image bg, origin story (placeholder), team bios (placeholder), "Why It Matters" section with PCB image bg
- **How It Works** - Hero with assembly line video bg, 7-step timeline, capabilities, FAQ
- **Contact** - Hero with green wire image bg, working contact form with Resend
- **Review Form** - Guided feedback form for Joe & Quinn with section-by-section prompts

### Design Updates This Session
- Image backgrounds added to: About hero, Contact hero, Homepage CTA, About "Why It Matters"
- Video moved from Homepage CTA to How It Works hero (assembly line feel)
- Typing animation fixed: continuous list, smooth fade-out loop, no divider
- Video overlays reduced from 85% to 70% for better legibility
- Added spacing between Contact hero and form section
- Added spacing above How It Works timeline section

### Technical
- **Vercel project renamed** from "website" to "ant"
- **Custom domain:** ant.sailorskills.com
- **GitHub repo:** standardhuman/ant-manufacturing (connected)
- **Contact form** → Resend API, sends to CONTACT_EMAIL + confirmation to submitter
- **Review form** → Resend API, sends formatted responses to REVIEW_EMAIL
- Large .mov files excluded from git via .gitignore

### Environment Variables (in Vercel)
| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key for sending emails |
| `REVIEW_EMAIL` | Where review form submissions go |
| `CONTACT_EMAIL` | Where contact form submissions go (falls back to REVIEW_EMAIL) |

---

## Still Needed from Joe & Quinn

Send them the review form: **https://ant.sailorskills.com/review.html**

### Content (collected via review form)
- [ ] Origin story - how ANT got started
- [ ] Meaning behind the name "ANT"
- [ ] Joe's bio
- [ ] Quinn's bio
- [ ] Materials/capabilities specifics
- [ ] Correct contact email
- [ ] Phone number (optional)
- [ ] Location details

### Feedback Needed
- [ ] Headline and positioning validation
- [ ] Problem framing ("stuck in the middle")
- [ ] Order size examples (currently says 1,500)
- [ ] Process steps accuracy
- [ ] Overall brand feel (1-5 rating)

---

## Next Session Priorities

1. **Send review form link to Joe & Quinn**
2. **Incorporate their feedback** when responses come in
3. **Domain transfer** to final production domain when ready
4. **Production email setup** - may need to switch from Resend to their preferred service
5. **Final polish** based on feedback

---

## File Structure

```
website/
├── index.html              # Homepage
├── about.html              # About page
├── how-it-works.html       # How It Works page
├── contact.html            # Contact page
├── review.html             # Feedback form for clients
├── css/styles.css          # All styles
├── js/main.js              # Animations, form handling, nav
├── api/
│   ├── submit-contact.js   # Contact form API (Resend)
│   └── submit-review.js    # Review form API (Resend)
├── assets/
│   ├── images/             # All images (large .mov excluded from git)
│   └── videos/             # Compressed video backgrounds
├── package.json            # Dependencies (resend)
├── .gitignore              # Excludes .mov, node_modules, .vercel
└── HANDOFF.md              # This document
```

---

## Quick Commands

```bash
# Local dev server
python3 -m http.server 8080

# Deploy to production
npx vercel --prod --yes

# Push to GitHub
git push origin main
```

---

## Notes

- Contact form sends confirmation email to the submitter - Joe/Quinn can test and see it arrive
- Review form has progress bar and guides through each section with specific prompts
- All "we" language in review form changed to "I" (Brian building solo)
- Images in assets/images/ include unused stock photos that could be used later
- The .mov source files exist locally but are excluded from git (too large)

---

## Messaging Reference

**Typewriter Animation Pairs:**
| They Say | ANT Says |
|----------|----------|
| "Your order is too small for us." | Every order gets our full attention. |
| "We can't guarantee that timeline." | We deliver when we say we will. |
| "You'll need larger quantities." | 1,000 units? That's our sweet spot. |
| "We'll get back to you... eventually." | We respond within one business day. |
