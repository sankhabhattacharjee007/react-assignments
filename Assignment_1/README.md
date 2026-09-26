# Assignment 1: React Environment Setup and Personal Portfolio

A modern, responsive personal portfolio webpage developed using **React**, **JSX**, and **External CSS**.

---

## 📋 Assignment Requirements & Fulfillment

| Requirement | Requirement Details | Implementation in this Project |
| :--- | :--- | :--- |
| **Pre-requisite** | React environment setup, JSX, reusable components, project structure | Modern Vite + React 18 configuration, clean modular folder structure |
| **Minimum 6 Components** | At least 6 distinct components | **7 Components built:**<br>1. `Navbar.jsx`<br>2. `Header.jsx`<br>3. `About.jsx`<br>4. `Education.jsx`<br>5. `Skills.jsx`<br>6. `Contact.jsx`<br>7. `Footer.jsx` |
| **Sections Included** | Header, Footer, Navigation Bar, About Me, Education, Skills, Contact Info | All required sections are fully implemented with rich content |
| **Responsive Design** | Mobile, tablet, and desktop adaptability | Mobile-first CSS with media queries (`@media (max-width: 768px)`, `@media (max-width: 480px)`), collapsible mobile menu |
| **External CSS** | No inline styles, external stylesheet | Styled exclusively via `src/style.css` using modern CSS variables, Flexbox & Grid |
| **JSX Only** | All components authored in JSX syntax | Pure React functional components with JSX |

---

## 📁 Project Structure

```text
portfolio/
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite React build configuration
├── README.md                   # Assignment documentation & run guide
└── src/
    ├── main.jsx                # React root mount (createRoot)
    ├── App.jsx                 # Master application component assembling all 7 components
    ├── style.css               # External responsive CSS stylesheet
    └── components/
        ├── Navbar.jsx          # Component 1: Top navigation with responsive mobile menu
        ├── Header.jsx          # Component 2: Hero intro banner with call-to-actions
        ├── About.jsx           # Component 3: About Me bio, quick facts & highlights
        ├── Education.jsx       # Component 4: Academic timeline & degrees
        ├── Skills.jsx          # Component 5: Technical skills with category chips & bars
        ├── Contact.jsx         # Component 6: Contact cards & interactive inquiry form
        └── Footer.jsx          # Component 7: Footer with links, copyright & back-to-top
```

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🎨 Design & Code Highlights
- **Curated Color Palette**: Modern dark slate/indigo theme (`#0f172a`, `#1e293b`) with vibrant cyan and violet gradients.
- **Glassmorphism & Micro-interactions**: Smooth card hover elevation, glowing accents, and animated menu transitions.
- **Form State Handling**: Interactive form in `Contact.jsx` using React `useState` hooks with success notification.
- **Accessible & Semantic HTML**: Uses `<nav>`, `<header>`, `<main>`, `<section>`, and `<footer>` tags.
