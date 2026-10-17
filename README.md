# The Oak — Padel House (Neo-Classical Web Experience)

An architectural, luxury neo-classical web experience built for **The Oak Padel House**, showcasing world-class courts, seamless scroll interactions, bespoke booking flow, and an atmosphere gallery. Designed in a refined palette of warm terracotta, sand, light cream, crimson red, and deep oak.

---

## 🌟 Project Overview

This repository implements the first 3 primary sections inspired by the architectural design presentation:
1. **Section 1: Hero Canvas Scroll Sequence** — 181-frame canvas scroll-scrub engine with LERP smoothing (`0.14`), centered intro typography, bottom-centered continuously rotating circular `• SCROLL DOWN • SCROLL DOWN` indicator, sequential windowed captions (01 Book Private Court, 02 Host Tournament, 03 Shoot Campaign), and right-aligned "YOUR COURT IS READY / LETS PLAY !" with red `BOOK A COURT` button.
2. **Section 2: The Process (Interactive Booking Experience)** — Widescreen composite card filling the section stage (`max-w-[94vw]`, `flex-1`), top-right `THE PROCESS` label, and dynamic bottom captions swapping across 4 stages (Book Your Court, Meet Your Pro, Let's Stay A While, And Let's Play).
3. **Section 3: Memories CTA & Atmosphere Gallery** — Warm cream `#F5ECD7` background featuring `MOVE YOUR CURSOR` sub-label, `LETS CREATE SOME MEMORIES !` handcrafted Trobosh typography (+40% enlarged size), oversized dual action pill buttons (`Book Your Court` and `Host Event`), strict max 5-item interactive cursor trail, and 9-photo atmospheric court & lounge gallery with interactive lightbox modal.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Animation Engine**: [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/) with canvas frame preloader & LERP interpolation
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: Neo-classical serifs (`Cormorant Garamond`, `Playfair Display`), modern sans-serif (`Inter`), and artistic display (`Trobosh`)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone or navigate to the repository directory
cd oak-padel-house

# Install dependencies
npm install
```

### Local Development
```bash
# Start the local development server with hot module replacement (HMR)
npm run dev
```
Open your browser at the displayed local URL (typically `http://localhost:5173`).

### Production Build
```bash
# Compile and optimize assets for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Repository Structure

```
site2/
├── README.md               # Project overview, run/build commands, deploy steps
├── SPEC.md                 # Functional & UX specifications for Sections 1–3
├── DESIGN.md               # Design tokens, color system, typography & motion rules
├── CONTENT.md              # Decoupled copy deck for all sections & modals
├── COMPONENTS.md           # Interactive component catalog & behaviors
├── TASKS.md                # Build checklist and implementation progress
├── index.html              # HTML entry with Google Font imports
├── package.json            # Node.js dependencies and scripts
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind configuration with custom theme tokens
├── src/
│   ├── main.jsx            # React root mount
│   ├── App.jsx             # Main container orchestration
│   ├── index.css           # Custom styles, font faces & utility classes
│   ├── components/
│   │   ├── Navbar.jsx          # Transparent header with crimson branding & centered links
│   │   ├── SectionHero.jsx     # Section 1: 181-frame canvas scrub & rotating indicator
│   │   ├── SectionProcess.jsx  # Section 2: Widescreen composite card & dynamic captions
│   │   ├── SectionMemories.jsx # Section 3: Trobosh typography, cursor trail & gallery
│   │   ├── BookingModal.jsx    # Reservation modal dialog
│   │   ├── EventModal.jsx      # Private event inquiry modal dialog
│   │   └── LightboxModal.jsx   # Interactive full-screen image lightbox
│   └── data/
│       └── content.js      # Centralized copy deck sourced from CONTENT.md
├── public/
│   ├── frames/             # 181 WebP animation frames for Section 1
│   └── assets/             # Section 1, 2, and 3 media assets
├── Section 1/              # Original Section 1 assets & animation
├── Section 2/              # Original Section 2 assets
└── Section 3/              # Original Section 3 assets
```

---

## 🌐 Deployment Steps

### Vercel / Netlify
1. Connect the repository to your hosting provider.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Set Install Command: `npm install`
5. Deploy.

