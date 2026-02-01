# AMP Manufacturing Website

Custom static website for ANT Manufacturing.

## File Structure

```
website/
├── index.html           # Homepage
├── about.html           # About page
├── how-it-works.html    # Process/workflow page
├── contact.html         # Contact page with form
├── css/
│   └── styles.css       # All styles
├── js/
│   └── main.js          # Animations, mobile nav, form handling
└── assets/
    ├── images/          # Photos and graphics
    └── fonts/           # Custom fonts (if any)
```

## To Edit Content

1. Open the HTML file you want to edit
2. Find the text you want to change
3. Update it and save
4. Push to git (Vercel will auto-deploy)

## Placeholders to Fill In

Look for `<!-- PLACEHOLDER: -->` comments in:
- **about.html** - Origin story, team bios
- **how-it-works.html** - Materials/capabilities details
- **contact.html** - Update form action URL with Formspree ID

## Contact Form Setup

1. Go to [Formspree](https://formspree.io)
2. Create a free account
3. Create a new form
4. Copy the form endpoint (looks like `https://formspree.io/f/xxxxx`)
5. Replace `YOUR_FORM_ID` in contact.html with your endpoint

## To Add Images

1. Add images to `assets/images/`
2. Reference them in HTML: `<img src="assets/images/filename.jpg" alt="Description">`

## Colors (if you want to tweak)

Edit in `css/styles.css` under `:root`:
- `--color-accent`: The gold/copper accent (#c9a227)
- `--color-bg`: Main background (near black)
- `--color-text-primary`: Main text (off-white)

## Local Preview

Just open `index.html` in a browser. No build step needed.
