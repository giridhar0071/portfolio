# Sai Giridhar Bandla — Portfolio

A cinematic single-page portfolio (React + Vite + Tailwind v4), built on the
video-hero template and filled with all of Giridhar's content: selected work
(with custom architecture diagrams), engineering principles, skills, experience,
writing, and testimonials.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Edit your content

All copy lives in **`src/data.js`** — edit text there and every section updates.
The architecture diagrams for the case studies live in **`src/viz.js`**.

## TODO before you publish

1. **Avatar** — replace `src/assets/about/image.png` with your own photo
   (keep roughly a 3:4 portrait ratio). It shows on the ID badge in the About section.
2. **GitHub / LinkedIn** — in `src/data.js`, set `PROFILE.github` and
   `PROFILE.linkedin` to your real profile URLs (currently placeholder roots).
3. **Résumé** — `public/Sai_Giridhar_Bandla_Resume.docx` is wired to the
   "Résumé" / "Download résumé" links. Swap the file to update it.
4. **Social preview image** — add an `og:image` / `twitter:image` in `index.html`
   (point it to a 1200x630 PNG in `public/`) so shared links show a preview card.

## Sections

Preloader → Navbar → Hero (video) → About → Work → Principles → Skills →
Experience + Currently → Writing → Testimonials → Contact → Footer

## Stack

React 19 · Vite 6 · Tailwind CSS v4 · Framer Motion · AOS
