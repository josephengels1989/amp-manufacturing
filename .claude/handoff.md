# ANT Manufacturing Website - Session Handoff

## Current Status
Site is live at **https://ant.sailorskills.com** and ready for client review.

## This Session Completed
- Fixed Vercel deployment protection (was blocking public access)
- Connected GitHub repo to Vercel for auto-deploy
- Added `vercel.json` for clean URLs (/about instead of /about.html)
- Updated About page hero with batch-production.jpeg
- Removed all em-dashes from copy, rewrote sentences for better flow
- Generated custom favicon (gold ant with toroidal coil pattern)
- Fixed favicon transparency using Python/PIL (Nano Banana can't do true transparency)
- Created client handoff guide at `docs/handoff-guide.md`
- Drafted email to Joe & Quinn for review

## Architecture
- **Hosting:** Vercel (sailorskills team, project: `ant`)
- **Repo:** github.com/standardhuman/ant-manufacturing
- **Domain:** ant.sailorskills.com (temporary), will transfer to antmfg.com
- **Forms:** Resend API for contact and review form submissions
  - CONTACT_EMAIL: Joe's email (customer inquiries)
  - REVIEW_EMAIL: Brian's email (review feedback)

## Known Issues
- Vercel auto-deploy works, but alias needs manual update after each deploy:
  ```bash
  npx vercel alias set [deployment-url] ant.sailorskills.com
  ```
- Nano Banana (Gemini) cannot create true transparency - use Python/PIL instead:
  ```python
  from PIL import Image
  import numpy as np
  img = Image.open('image.png').convert('RGBA')
  data = np.array(img)
  r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
  black_mask = (r < 30) & (g < 30) & (b < 30)
  data[:,:,3] = np.where(black_mask, 0, 255)
  Image.fromarray(data).save('output.png')
  ```

## Next Steps
1. **Send review email to Joe & Quinn**
   - Review form: https://ant.sailorskills.com/review
   - Email draft ready (see conversation history)

2. **After receiving feedback:**
   - Incorporate their responses (origin story, bios, materials list, etc.)
   - Fill in placeholder content on About and How It Works pages
   - Update contact info if they provide different email/location

3. **Domain transfer (when ready):**
   - Joe/Quinn create Vercel account
   - Transfer domain from Framer to Vercel
   - Set up project under their account
   - Configure environment variables (RESEND_API_KEY, CONTACT_EMAIL)
   - See `docs/handoff-guide.md` for client-facing instructions

## Local Development
```bash
cd /Users/brian/Documents/AI/business/clients/ant-manufacturing/website
python3 -m http.server 8080
# Visit http://localhost:8080
```

## Files of Note
- `docs/handoff-guide.md` - Client-facing guide for post-handoff
- `api/submit-contact.js` - Contact form handler
- `api/submit-review.js` - Review form handler
- `vercel.json` - Clean URLs config
- `favicon.png` - Custom ant favicon with transparency
