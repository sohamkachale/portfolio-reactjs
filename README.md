# Soham's Portfolio - React + Vite + Framer Motion

A modern, animated portfolio website built with React, Vite, and Framer Motion, converted from the original HTML/CSS/Bootstrap version.

## 🚀 Features

- **Modern React Architecture**: Component-based structure with hooks and state management
- **Smooth Animations**: Framer Motion for page transitions and interactive elements
- **Responsive Design**: Mobile-first approach with Bootstrap utilities
- **Fast Performance**: Vite for lightning-fast development and builds
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Accessibility**: WCAG compliant components

## 📁 Project Structure

```
soham-portfolio-react/
├── public/
│   ├── img/                    # Portfolio images
│   └── index.html             # HTML template
├── src/
│   ├── App.jsx               # Main app component with routing
│   ├── App.css              # Complete stylesheet
│   └── main.jsx             # React entry point
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Steps

1. **Create the project directory**
   ```bash
   mkdir soham-portfolio-react
   cd soham-portfolio-react
   ```

2. **Initialize the project**
   ```bash
   npm create vite@latest . -- --template react
   ```

3. **Install dependencies**
   ```bash
   npm install
   npm install framer-motion typed.js
   ```

4. **Replace the generated files**
   - Copy the provided `App.jsx`, `App.css`, `main.jsx` files
   - Replace the default `index.html` template
   - Update `package.json` with the provided dependencies
   - Copy `vite.config.js` configuration

5. **Add your images**
   - Create `public/img/` directory
   - Copy all your portfolio images:
     - `sohamk.png` (profile image)
     - `p1(1).png` (hero illustration)
     - `HTML-CSS-JS-Logo.png`
     - `bootstrap5-removebg-preview.png`
     - `ChatGPT Image Jul 26, 2025, 02_26_11 PM.png`
     - `mysq.png`
     - `filght.png`
     - `onecart.png`
     - `dog.png`

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Key Components

### Navigation
- Fixed navbar with scroll effects
- Smooth page transitions
- Mobile-responsive hamburger menu

### Pages
- **Home**: Hero section with typed.js animation and timeline
- **About**: Profile, skills tabs, progress bars, tools
- **Projects**: Project cards with hover animations
- **Work**: Current work showcase with feature grid

### Animations
- Page transitions with Framer Motion
- Hover effects on cards and buttons
- Scroll-triggered animations
- Loading states and micro-interactions

## 🎨 Customization

### Colors (CSS Variables)
```css
:root {
  --primary-bg: #070734;
  --nav-bg: #0a0a6d;
  --accent-color: #8a2be2;
  --text-light: #ffffff;
  --text-gray: #aaaaaa;
  --card-bg: rgba(255, 255, 255, 0.05);
  --footer-bg: #080516;
}
```

### Adding New Pages
1. Create a new component in the `renderCurrentPage()` function
2. Add navigation link in the `Navbar` component
3. Update the page routing logic

### Modifying Content
- Update personal information in the components
- Replace project data in the `Projects` component
- Modify skills and progress data in the `About` component

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 992px
- **Large Desktop**: > 992px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings: Build command: `npm run build`, Publish directory: `dist`

### Vercel
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Manual Deployment
1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web server

## 🌟 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting with Vite
- **Image Optimization**: Use WebP format for better compression
- **CSS Optimization**: Minimal CSS bundle with purged unused styles
- **JavaScript Optimization**: Tree-shaking and minification
- **Caching**: Service worker for offline functionality (optional)

## 🔄 Migration Notes

### From Original HTML/CSS Version
- All original styles preserved and optimized
- Bootstrap utilities maintained for grid and spacing
- Font Awesome icons and Google Fonts integrated
- Typed.js animation preserved
- Responsive design enhanced with React components

### Key Improvements
- Component reusability
- State management for interactive elements
- Smooth page transitions
- Better performance with Vite
- Modern development workflow
- TypeScript support ready (optional)

## 📄 License

This project is for personal portfolio use. Feel free to use it as inspiration for your own portfolio.

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

---

**Built with ❤️ by Soham Kachale**