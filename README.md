# Cairo International for Contracting & Architecture - Static Website

A professional one-page static website for a construction/architecture company, designed for testing deployment workflows on Cloudflare Pages.

## Project Overview

This is a simple, professional static website showcasing Cairo International for Contracting & Architecture. The site features sections for the company overview, services, projects, and contact information.

## Technical Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with responsive design
- **Vanilla JavaScript** - Interactive functionality without frameworks
- **Font Awesome** - Icon library for professional appearance

## Features

- ✅ Responsive design for desktop, tablet, and mobile
- ✅ Professional construction/architecture aesthetic
- ✅ Smooth animations and transitions
- ✅ Mobile-friendly navigation
- ✅ Contact form with WhatsApp integration
- ✅ Placeholder project gallery
- ✅ Dedicated Products page for made-to-order manufactured goods
- ✅ SEO-friendly structure

## Local Development

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code, Sublime Text, etc.)

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cairo-international
   ```

2. **Open the website:**
   ```bash
   open index.html
   ```
   Or double-click the `index.html` file in your file explorer.

3. **Test responsiveness:**
   - Use browser developer tools (F12) to simulate different device sizes
   - Check the "Responsive" tab in Chrome DevTools

## Deployment to Cloudflare Pages

### Step 1: Create a GitHub Repository

1. **Create a new repository on GitHub**
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name: `cairo-international`
   - Description: "Static website for Cairo International for Contracting & Architecture"
   - Make it public
   - Do NOT initialize with README (we'll add it later)

2. **Upload your files**
   - Copy all files from this project (`index.html`, `styles.css`, `script.js`, `README.md`)
   - Push them to your GitHub repository

### Step 2: Create Cloudflare Pages Account

1. **Sign up for Cloudflare**
   - Go to [Cloudflare](https://www.cloudflare.com)
   - Create a free account

2. **Access Cloudflare Pages**
   - Navigate to "Pages" in the dashboard
   - Click "Create a page"

### Step 3: Connect GitHub Repository

1. **Connect GitHub**
   - Click "Connect to GitHub"
   - Authorize Cloudflare to access your repositories
   - Select your `cairo-international` repository

2. **Configure build settings**
   - **Build command:** `echo "Build completed"`
   - **Output directory:** `.` (current directory)
   - **Framework preset:** "Static site" or "None"

### Step 4: Deploy

1. **Deploy the site**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)

2. **Preview your deployment**
   - Copy the generated URL (e.g., `https://cairo-international.pages.dev`)
   - Test all functionality

## Project Structure

```
cairo-international/
├── index.html            # Main HTML file
├── about.html            # About page
├── services.html         # Services page
├── projects.html         # Projects gallery
├── project-details.html  # Project detail template
├── products.html         # Manufactured products catalog
├── styles.css            # CSS styling
├── script.js             # JavaScript functionality
├── includes/             # Shared navbar & footer components
├── images/               # Image assets
└── README.md             # This file
```

## Customization

### Updating the Website

To update the website content:

1. **Edit `index.html`** - Update company information, services, projects
2. **Edit `styles.css`** - Modify colors, typography, layout
3. **Edit `script.js`** - Add or modify JavaScript functionality

### Adding Assets

1. **Images:** Create an `assets/` folder and add images
2. **Update paths:** Use relative paths in your HTML/CSS
3. **Optimize:** Compress images for better performance

## Production Considerations

### Performance Optimization

- ✅ All CSS is inlined (no external dependencies)
- ✅ JavaScript is minimal and efficient
- ✅ No external APIs or databases
- ✅ Optimized for mobile devices

### SEO Best Practices

- ✅ Semantic HTML5 structure
- ✅ Proper meta tags and viewport settings
- ✅ Alt text for all images
- ✅ Clean URL structure
- ✅ Fast loading times

## Troubleshooting

### Common Issues

**Q: The website doesn't load properly**
- Check browser console for JavaScript errors
- Verify all file paths are correct
- Ensure CSS and JS files are not corrupted

**Q: Responsive design doesn't work**
- Check media queries in `styles.css`
- Test with different browser sizes
- Verify viewport meta tag is present

**Q: Deployment fails**
- Check build logs for errors
- Ensure all required files are committed
- Verify package.json if using build tools

## Future Enhancements

### If you want to expand the website:

1. **Add more pages** - Create additional HTML files
2. **Implement a CMS** - Use static site generators like Gatsby or Next.js
3. **Add animations** - Consider using CSS animations or lightweight libraries
4. **Performance monitoring** - Set up Cloudflare Analytics
5. **Custom domain** - Connect your company domain

## License

This project is for demonstration purposes only. All content is fictional and created for testing deployment workflows.

## Support

For deployment issues, refer to Cloudflare Pages documentation or contact support through the Cloudflare dashboard.