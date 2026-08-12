# Aero FCRIT — React + Tailwind Website

A multi-page React site for the Aero FCRIT aeromodelling/UAV club, built with Vite,
React Router, and Tailwind CSS.

## What's included

- **Working navigation** — real routes for every tab: Home, About, Drones, Aircraft,
  Achievements, Team, plus a "More" dropdown (Blog, News, Alumni, Sponsors, FAQ) on
  desktop and a flat scrollable menu on mobile. Active-link highlighting throughout.
- **Sitewide news ticker** — a horizontally-scrolling headline strip pinned above the
  nav on every page (`NewsTicker.jsx`), dismissible, pauses on hover, links to a full
  **News** page with category filters.
- **Hero slideshow** (`HeroSlideshow.jsx`) — auto-advances every 5s. You can also
  change slides by scrolling/swiping *horizontally* (trackpad two-finger swipe, mouse
  wheel shift-scroll, or a touch swipe on mobile) — normal *vertical* scrolling of the
  page is completely unaffected. Dot indicators show a live autoplay progress bar;
  arrows appear on desktop. Slides are placeholders — see "Adding your own media" below.
- **Scroll-explode diagrams** — `DroneDiagram.jsx` / `PlaneDiagram.jsx`, driven by a
  shared `useExplodeProgress` hook, on dedicated Drones/Aircraft pages.
- **New pages**:
  - `Blog.jsx` — featured post + grid of post cards.
  - `News.jsx` — filterable news column (All / Competitions / Builds / Sponsorship / Events).
  - `Alumni.jsx` — auto-rotating testimonial + alumni grid.
  - `FAQ.jsx` — interactive accordion (click a question to expand/collapse).
- **Responsive throughout** — nav, hero, stat strip, both exploded diagrams, spec
  sheets, team grid, achievements timeline, and all new pages have explicit mobile /
  tablet / desktop breakpoints. Uses `100dvh` (not `100vh`) for full-height sections so
  mobile browser address bars don't cause jumpy layouts.
- **Placeholder content** — clearly marked throughout (⚠ notes, "placeholder" labels)
  so it's obvious what still needs your real copy, photos, and links.

## Getting started

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

Requires Node 18+.

## Adding your own media to the hero slideshow

Open `src/components/HeroSlideshow.jsx`. Each entry in the `SLIDES` array currently
renders a dashed placeholder frame. To swap one for a real photo or video, replace the
placeholder `<div>` for that slide with:

```jsx
// Photo:
<img src="/images/slide-1.jpg" alt="..." className="absolute inset-0 w-full h-full object-cover" />

// Video:
<video src="/videos/slide-1.mp4" autoPlay muted loop playsInline
       className="absolute inset-0 w-full h-full object-cover" />
```

Put files in `public/images/` or `public/videos/` — anything in `public/` is served
as-is at the site root.

## Project structure

```
src/
  components/
    Navbar.jsx          # sticky nav, all routes, "More" dropdown, mobile menu
    NewsTicker.jsx       # sitewide horizontal headline strip
    Footer.jsx
    PageHero.jsx         # shared banner used on every sub-page
    HeroSlideshow.jsx    # home hero background slideshow
    DroneDiagram.jsx     # scroll-exploded quadcopter diagram
    PlaneDiagram.jsx     # scroll-exploded fixed-wing diagram
  hooks/
    useExplodeProgress.js
  pages/
    Home.jsx, About.jsx, Drones.jsx, Aircraft.jsx, Achievements.jsx,
    Sponsors.jsx, Team.jsx, Blog.jsx, News.jsx, Alumni.jsx, FAQ.jsx, Contact.jsx
  App.jsx                # routes + news-ticker/nav offset wiring
  index.css              # Tailwind + shared component classes + keyframes
tailwind.config.js        # custom color tokens & fonts (hangar, brass, signal, linecyan...)
```

## Things to customize before launch

- Replace placeholder text throughout every page (search for "placeholder" / "⚠").
- Drop in real photos/video for the hero slideshow (see above) and the two exploded
  diagrams (swap the placeholder line-art for real CAD renders or photos).
- Wire the Contact page form and the News ticker/News page to real data sources.
- Add real sponsor logos, alumni names, blog posts, and social links.
