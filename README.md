# Akshay Suryawanshi - Portfolio Website

A clean, modern, and responsive portfolio website built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools required.

![Portfolio Preview](./preview.png)

## 🚀 Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Dark/Light Mode**: Automatic theme detection with manual toggle, persisted in localStorage
- **Smooth Animations**: Reveal-on-scroll animations using IntersectionObserver
- **Project Filtering**: Filter projects by category (Automation, DFIR, Cloud, Governance)
- **Expandable Project Cards**: Accordion-style details for each project
- **Copy to Clipboard**: One-click email copy with toast notification
- **Accessibility**: ARIA labels, keyboard navigation, focus states, semantic HTML
- **Performance Optimized**: No external dependencies, optimized scroll handlers
- **Print Friendly**: Clean print styles

## 📁 File Structure

```
Portfolio Website/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # All styles with CSS variables for theming
├── script.js           # All interactivity and animations
├── README.md           # This file
└── Akshay_Suryawanshi_Resume.pdf  # Your resume (add this file)
```

## 🏃‍♂️ Running Locally

### Option 1: Direct File Opening
Simply double-click `index.html` to open it in your default browser.

### Option 2: Local Server (Recommended)
Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Using Node.js:
```bash
# Install serve globally
npm install -g serve

# Run server
serve .
```

Using VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then visit `http://localhost:8000` (or the port shown).

## 🎨 Customization

### Update Personal Information
Edit `index.html` to update:
- Name, title, location
- Contact information (email, phone)
- LinkedIn URL
- Summary text
- Experience history
- Skills and certifications

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #0066cc;        /* Main brand color */
    --color-accent: #00a86b;          /* Accent color */
    --color-bg: #ffffff;              /* Background */
    --color-text: #1a1a2e;            /* Text color */
    /* ... more variables */
}

[data-theme="dark"] {
    /* Dark theme overrides */
}
```

### Add/Remove Projects
In `index.html`, find the `.projects__grid` section and add/modify project cards:
```html
<article class="project-card reveal" data-category="automation">
    <!-- Project content -->
</article>
```

Categories: `automation`, `dfir`, `cloud`, `governance`

### Update Resume
Replace `Akshay_Suryawanshi_Resume.pdf` with your actual resume file.

## 🌐 Deployment

### GitHub Pages
1. Create a new repository on GitHub
2. Push your files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose `main` branch and `/ (root)` folder
6. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site is live instantly

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### Custom Domain
1. Purchase a domain (Namecheap, GoDaddy, etc.)
2. Add CNAME record pointing to your hosting provider
3. Configure the domain in your hosting settings

## 📝 Next Steps to Personalize

- [ ] Replace `Akshay_Suryawanshi_Resume.pdf` with your actual resume
- [ ] Add a professional headshot image (optional)
- [ ] Update LinkedIn URL to your actual profile
- [ ] Add Open Graph image (`og-image.png`) for social sharing
- [ ] Add favicon (`favicon.ico`)
- [ ] Consider adding a blog section
- [ ] Add Google Analytics or privacy-friendly analytics
- [ ] Set up a custom domain
- [ ] Add testimonials section (optional)
- [ ] Add a contact form with Formspree or Netlify Forms (optional)

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Credits

Built with ❤️ for Akshay Suryawanshi

Icons: Inline SVG (no external dependencies)
Fonts: System font stack for optimal performance

---

**Tip**: Keep your portfolio updated! Add new projects, certifications, and skills as you grow in your career.
