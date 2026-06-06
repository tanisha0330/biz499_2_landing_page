

##  Complete File Architecture Analysis

### **Repository Structure Overview**
```
biz499_2_landing_page/
├── index.html          (Main landing page)
├── themes.html         (Themes gallery page)
├── horizontal.html     (Horizontal scroll demo)
├── script.js           (Main interactive logic)
├── themes.js           (Themes page parallax)
├── style.css           (Main styling)
├── themes.css          (Themes page styling)
├── assets/             (Images folder)
└── FILE.MD             (Documentation)
```

---

## 🔗 **File Connections & Dependencies**

### **1. index.html** (Main Landing Page)
**What it contains:**
- Complete biz499 digital marketing landing page
- Sections: Navbar, Hero, About, Services (horizontal scroll), Case Studies (stacked cards), Themes Gallery, Works & Feedback, Contact form, Footer
- Contains inline SVG logo with gradient
- Uses semantic HTML5 with accessibility features (aria-labels, alt text)

**Links to:**
- `style.css` - Main stylesheet (line 11)
- `script.js` - Interactive behaviors (line 530)
- `assets/` folder - Images (rocket.png, theme*.jpeg, AI headshot)

**Key interactive elements:**
- Modal for projects
- Countdown timers
- Notification popups
- Mobile navigation toggle

---

### **2. themes.html** (Themes Gallery Page)
**What it contains:**
- Dedicated page showing 12 theme templates
- 4 columns of gallery cards with parallax effect
- Navigation header linking back to main page

**Links to:**
- `style.css` - Reuses main styles (line 8)
- `themes.css` - Page-specific styling (line 9)
- `script.js` - Shared interactive features (line 57)
- `themes.js` - Parallax scroll logic (line 58)

**Navigation connections:**
- Logo links to `index.html` (line 4)
- Nav links point back to index.html sections (lines 10-13)
- "Book Your Business Audit Now" button links to contact section

---

### **3. style.css** (Main Stylesheet - 45KB)
**What it controls:**
| Component | Lines | Details |
|-----------|-------|---------|
| **Design Tokens** | 1-20 | Brand colors (pink #F59AC4, orange #FBBC74), fonts, dark mode palette |
| **Reset** | 22-57 | Global resets, scroll behavior, gradient text utility |
| **Navbar** | 59-205 | Fixed header with blur effect, responsive mobile menu |
| **Hero Section** | 206-598 | Animated sphere, headline animations, CTA buttons, countdown timer |
| **Horizontal Scroll** | 600-755 | Service panels with smooth scroll animation |
| **About Section** | 756-885 | Mask parallax, text rotator with rotating background |
| **Case Studies** | 886-1040 | Stacked card animations with z-index layering |
| **Themes Gallery** | - | Parallax columns with different speeds |
| **Split Section** | - | Folder grid + feedback carousel |
| **Contact Section** | - | Form + owner photo |
| **Mobile Responsive** | Throughout | Breakpoints at 900px and 640px |

**Key animations:**
- `revealLine`, `fadeIn`, `glowPulse`, `sphereFloat`, `pulse-red`, `typing`

---

### **4. script.js** (Main JavaScript - 19KB)
**8 Main Functions:**

| # | Function | Lines | Purpose |
|---|----------|-------|---------|
| 1 | **Mobile Nav Toggle** | 21-36 | Toggle hamburger menu on mobile |
| 2 | **Parallax Sphere** | 38-84 | Sphere follows mouse movement with easing |
| 3 | **Navbar Scroll Effect** | 87-121 | Add blur/background when scrolling past hero |
| 4 | **Reveal on Scroll (Intersection Observer)** | 124-142 | Fade in elements as they enter viewport |
| 5 | **Horizontal Scroll Animation** | 145-180 | Translate service panels left based on scroll |
| 6 | **About Mask Parallax** | 183-205 | Scale and morph mask element while scrolling |
| 6B | **Text Rotator & BG Changer** | 208-234 | Rotate words in about section, change BG colors |
| 7 | **Stacked Cards Animation** | 237-296 | Flip cards off-screen as user scrolls |
| - | **Themes Gallery Parallax** | 298-352 | Move gallery columns at different speeds |
| - | **Project Modal** | 355-380 | Open/close project details popup |
| - | **Notification Popup** | 383-414 | Show random customer notifications every 3s |
| 8 | **Countdown Timer** | 422-463 | Update 10-minute timer across all displays |

**DOM Dependencies:**
- `#menuToggle`, `#navLinks` → Mobile menu
- `#sphereWrapper` → Hero sphere
- `#hScrollContainer` → Service panels
- `#aboutMask`, `#wordRotator` → About section
- `.card` elements → Case studies
- `.gallery-column` → Themes
- `.folder-item` → Projects

---

### **5. themes.css** (Themes Page Styling - 1.5KB)
**What it styles:**
- Fixed gallery layout with 4 columns
- Gallery container at viewport height
- Parallax-ready column structure
- Scroll spacer for 3x viewport height
- Card hover effects

**Overrides:** Minimal, mostly layout-specific

---

### **6. themes.js** (Themes Parallax Logic - 1.5KB)
**What it does:**
- Extracts initial translateY from inline styles
- Listens to scroll events
- Calculates parallax movement for each column based on `data-speed` attribute
- Applies transform: translateY() to create depth effect

**Example data-speed values:**
- Column 1: `0.8` (faster)
- Column 2: `0.5` (slower)
- Column 3: `0.9` (faster)
- Column 4: `0.3` (slowest)

---

##  **Complete Flow Diagram**

```
User visits website
        ↓
    index.html
    ├─ Loads style.css
    ├─ Loads script.js
    └─ Displays:
       ├─ Navbar (interactive - script.js#1)
       ├─ Hero with sphere (script.js#2)
       ├─ Services - Horizontal scroll (script.js#5)
       ├─ About with text rotator (script.js#6B)
       ├─ Case Studies - Stacked cards (script.js#7)
       ├─ Themes Gallery - Parallax (script.js#298)
       ├─ Works & Feedback - Modal + carousel (script.js#355)
       └─ Contact form + Footer

User clicks "Themes" in nav
        ↓
    themes.html
    ├─ Loads style.css (shared)
    ├─ Loads themes.css (page-specific)
    ├─ Loads script.js (general features)
    ├─ Loads themes.js (parallax logic)
    └─ Displays gallery with parallax effect

All pages share:
├─ Design tokens from style.css
├─ Font families (Inter, Outfit)
├─ Brand colors
├─ Responsive breakpoints
└─ Common components (navbar, etc.)
```

---

## **What Each File Does (Summary Table)**

| File | Type | Size | Purpose | Loaded By |
|------|------|------|---------|-----------|
| **index.html** | HTML | 29.5KB | Main landing page | Browser |
| **themes.html** | HTML | 8.8KB | Themes gallery page | index.html nav or direct link |
| **horizontal.html** | HTML | 9.4KB | Horizontal scroll demo | Standalone or linked |
| **style.css** | CSS | 45.5KB | Main styling (all pages) | Both HTML files |
| **themes.css** | CSS | 1.5KB | Themes page layout | themes.html only |
| **script.js** | JS | 19.2KB | Core interactive logic | Both HTML files |
| **themes.js** | JS | 1.5KB | Parallax scroll for gallery | themes.html only |
| **assets/** | Folder | - | Images (PNG, JPEG) | Referenced in HTML |

---

## **Key Interactions Between Files**

1. **CSS → HTML**: style.css defines `.navbar`, `.hero`, `.card` classes that HTML uses
2. **JS → CSS**: script.js applies classes like `.scrolled`, `.revealed`, `.active`, `.away` 
3. **HTML → CSS**: Data attributes like `data-speed` are read by both CSS and JS
4. **HTML → JS**: IDs like `#navbar`, `#services` are targeted by script.js
5. **themes.js → themes.css**: Modifies transform property on `.gallery-column` elements

This is a **modular, well-structured project** with clear separation of concerns! 🚀
