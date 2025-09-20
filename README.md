# Bikram Barman - Academic Website

A professional, responsive academic website for Bikram Barman, PhD Scholar in International Development Studies at Utrecht University and ISEC Bengaluru.

## Features

- **Responsive Design**: Mobile-first approach with optimal viewing on all devices
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation support
- **Professional Layout**: Clean, academic-focused design with serif body text and sans-serif headings
- **Interactive Gallery**: Lightbox functionality with keyboard and touch navigation
- **Contact Form**: Configurable form with validation and multiple service options
- **SEO Optimized**: Proper meta tags, structured data, and semantic markup

## Site Structure

- **Home** (`index.html`) - Introduction, contact info, and quick navigation
- **About** (`about.html`) - Biography and education details
- **Research & Experience** (`research.html`) - Professional experiences
- **Scholarships & Affiliations** (`scholarships.html`) - Awards and memberships
- **Conferences & Talks** (`conferences.html`) - Academic presentations and events
- **Skills** (`skills.html`) - Technical expertise
- **Gallery** (`gallery.html`) - Photo gallery with lightbox
- **Contact** (`contact.html`) - Contact information and form

## Quick Setup

### 1. GitHub Pages Deployment

#### Option A: Manual Upload
1. Download all files from this project
2. Create a new GitHub repository named `your-username.github.io`
3. Upload all files to the repository
4. Go to Settings > Pages
5. Select "Deploy from a branch" and choose "main"
6. Your site will be available at `https://your-username.github.io`

#### Option B: GitHub Actions (Automated)
1. The included `.github/workflows/gh-pages.yml` file will automatically deploy your site
2. Push changes to the main branch to trigger automatic deployment
3. Ensure GitHub Pages is enabled in your repository settings

### 2. Replace Placeholder Content

#### Profile Image
- Replace `assets/images/profile-placeholder.jpg` with your actual photo
- Recommended size: 500x500px, square format
- Supported formats: JPG, PNG, WebP

#### CV File
- Replace `assets/cv/bikram-barman-cv.pdf` with your actual CV
- Keep the filename as `bikram-barman-cv.pdf` or update the link in `index.html`

#### Gallery Images
Replace the placeholder images in `assets/images/gallery/` with your actual photos:
- `conference-1.jpg` - Conference presentation at University of Cambridge
- `workshop-1.jpg` - Research workshop at Utrecht University
- `conference-2.jpg` - Meeting of Young Minds conference at IIT Bombay
- `fieldwork-1.jpg` - Field research in rural India
- `g20-event.jpg` - G20 event presentation in Bengaluru
- `bsg-conference.jpg` - British Society of Gerontology conference
- `isec-research.jpg` - Research collaboration at ISEC Bengaluru
- `data-workshop.jpg` - Data analysis workshop

**Image Guidelines:**
- Recommended size: 800x600px or similar aspect ratio
- Format: JPG or PNG
- File size: Under 500KB for optimal loading
- Use descriptive filenames

### 3. Configure Contact Form

The contact form requires a backend service to function. Choose one of these options:

#### Option A: Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form endpoint
3. In `contact.html`, update the form action:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Option B: Netlify Forms
1. Deploy to Netlify
2. Add `netlify` attribute to the form:
   ```html
   <form class="contact-form" id="contact-form" netlify name="contact" method="POST">
   ```

#### Option C: Custom Backend
1. Set up your own backend service
2. Update the form action URL in `contact.html`
3. Ensure CORS is properly configured

### 4. Customize Content

All content is preserved exactly as provided. To make updates:

1. **Personal Information**: Update name, email, and affiliations in relevant files
2. **Navigation**: Modify the navigation menu in each HTML file if needed
3. **Styling**: Customize colors, fonts, and layout in `assets/css/style.css`
4. **Content**: Update the preserved content sections as needed

## File Structure

```
├── index.html                 # Homepage
├── about.html                 # About page
├── research.html              # Research & Experience
├── scholarships.html          # Scholarships & Affiliations
├── conferences.html           # Conferences & Talks
├── skills.html                # Technical Skills
├── gallery.html               # Photo Gallery
├── contact.html               # Contact page
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── main.js            # Main JavaScript
│   │   ├── gallery.js         # Gallery functionality
│   │   └── contact.js         # Contact form handling
│   ├── images/
│   │   ├── profile-placeholder.jpg
│   │   └── gallery/           # Gallery images
│   └── cv/
│       └── bikram-barman-cv.pdf
├── .github/
│   └── workflows/
│       └── gh-pages.yml       # GitHub Actions deployment
└── README.md                  # This file
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Optimized images with lazy loading
- Minimal JavaScript (no external dependencies)
- Efficient CSS with mobile-first approach
- Semantic HTML for better SEO

## Accessibility Features

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme
- Focus management
- Alt text for all images

## Customization

### Colors
Main colors are defined in CSS custom properties. Update these in `style.css`:
- Primary: `#2563eb` (blue)
- Text: `#333` (dark gray)
- Background: `#fff` (white)
- Accent: `#6b7280` (gray)

### Fonts
- Body text: 'Crimson Text' (serif)
- Headings: 'Inter' (sans-serif)
- Loaded from Google Fonts

### Layout
The site uses CSS Grid and Flexbox for responsive layouts. Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Support

For technical issues or questions about setup:
1. Check this README for common solutions
2. Verify all file paths are correct
3. Ensure your web server supports static file serving
4. Test the contact form configuration

## License

This website template is provided as-is for academic and professional use. Feel free to modify and customize as needed.

---

**Note**: Remember to replace all placeholder content with your actual information before deploying the site.