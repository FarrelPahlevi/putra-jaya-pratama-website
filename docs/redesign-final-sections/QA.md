# Prototype delivery and QA

## Open the result

- Development preview: http://localhost:5173/prototype-final.html
- Built/prerendered review bundle: http://localhost:4173/prototype-final.html
- Approved homepage comparison: http://localhost:5173/#proyek

The review bar switches A / Industrial Editorial, B / Architectural Portfolio and C / Field Filmstrip. A is recommended and is the initial view. Direct links use `?concept=editorial`, `?concept=portfolio` or `?concept=filmstrip`. The original homepage's sections are not replaced.

The static review bundle includes a copy of the approved built homepage/gallery so its comparison and gallery links also work locally. It is a review artifact, not a production deployment.

## Final implementation

Four existing photographs are selected: archives **112, 035, 142, 198**. Their paths, dimensions and responsive variants were checked against the local WebP files. No client, location, project name or new business claim was fabricated. Editorial shows three photos together; the fourth is available through the viewer. Only those four archive IDs appear in the prototype image request log.

The sequence is photography on warm paper, a charcoal consultation section with one primary enquiry action, then the compact existing footer on the same ground. Mobile navigation/services use two small footer columns; identity/contact span the available width. Desktop footer is four columns. Measured footer heights are approximately 848px at 390, 726px at 768 and 444px at 1024/1440/1920, determined by content.

Final copy was refined from the first study to **“Pengaspalan. Dari dekat.”** so the image section names the actual work. Body muted text was darkened to `#4d504a` on `#f5f3ef`; the supplied Antislop contrast checker measured **7.40:1**. Photo `sizes` accounts for the landscape-to-taller-frame mobile crop, allowing higher resolution candidates on dense screens.

Interactions: photo buttons/native lightbox; ArrowLeft/ArrowRight, Escape, close button and backdrop; focus restoration; portfolio selectors; manually controlled native filmstrip; existing enquiry dialog with six service preselection; WhatsApp/Instagram; gallery and back-to-top navigation. Existing floating WhatsApp is reused and becomes compact only on the prototype surface. CTA/footer controls keep a safe horizontal clearance.

## New files and isolation

| File | Purpose |
| --- | --- |
| `prototype-final.html` | Separate local entry, fonts and metadata |
| `src/prototypes/final-sections/FinalSectionsPrototype.tsx` | Three compositions, review controls and interactions |
| `src/prototypes/final-sections/photos.ts` | Four truthful local photo records |
| `src/prototypes/final-sections/final-sections.css` | Scoped layout, typography, states and responsive rules |
| `src/prototypes/final-sections/main.tsx` | Isolated client mount/hydration |
| `src/prototypes/final-sections/entry-server.tsx` | Isolated server render |
| `scripts/build-final-sections.mjs` | Client/SSR prototype build and approved comparison snapshot |
| `scripts/final-sections-audit.mjs` | Responsive, interaction, accessibility and original-source checks |
| `scripts/final-sections-smoke.mjs` | Targeted image rechecks, final visual captures and built/no-JS checks |

Research/delivery documents: `RESEARCH.md`, `CONCEPTS.md`, `PLAN.md`, this `QA.md`, and `README.md`. Capture scripts, reference JSON, inventory/contact sheets, screenshots and QA reports stay within `docs/redesign-final-sections/`.

**Approved source modified: none.** `App.tsx`, `MinimalIndustrial.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, `site-footer.css`, `config/contact.ts`, `vite.config.ts` and `package.json` were compared against pre-prototype SHA-256 hashes. The normal build still produces the same approved homepage JS/CSS asset names. Shared components are imported, not edited. No dependency was installed.

Backup before source additions: `C:\Projects\PJP-Website-backups\final-sections-prototype-20261118\`. Hash evidence: `approved-source-hashes.json`.

## Build and browser verification

**80 checks pass, 0 unresolved functional/accessibility checks.** Final consolidated evidence: `qa-summary.json`; raw broad run: `qa-report.json`; targeted/built checks: `smoke-report.json`; final visual states: `final-visual-report.json`.

- `npm.cmd run build`: passed TypeScript strict, approved client/SSR builds and both approved prerenders.
- `node scripts/build-final-sections.mjs`: passed isolated client/SSR build and prerender. Prototype JS about 265.54kB / 82.53kB gzip; CSS about 91.63kB / 18.44kB gzip. These are build sizes, not a measured field-performance score.
- Chrome headless at **390, 768, 1024, 1440, 1920**, all three concepts: 15 responsive compositions, no page-level horizontal overflow, correct Barlow and images.
- Axe WCAG A/AA checks passed for all 15 configurations. Canonical 390/1440 were checked again after the final text/contrast refinement.
- Photo dialog keyboard controls, Escape, focus return, body scroll restoration and overlay suppression of WhatsApp passed.
- Portfolio selection changes the actual photo without changing stage height. Filmstrip scrolls natively, without wheel interception or page overflow.
- Six footer service choices preselect the existing enquiry form. Main enquiry opens/closes and returns focus. Sequential footer Tab order and visible rings passed.
- Footer/CTA collision sweep passed throughout scrolling at all required widths/concepts.
- Gallery navigation and back-to-top passed; built preview also navigates to the approved gallery/comparison page.
- Default hover and settling feedback were inspected. Reduced motion removes photo hover transforms/transitions and stops optional settling. Content starts readable.
- Built SSR hydration has **0 browser errors**; the broad 15-view audit also recorded **0 console/runtime errors**.
- JavaScript-disabled built preview keeps headings, photos, consultation copy and footer readable; a noscript WhatsApp fallback is available. Modal and concept-switch interactions require JavaScript.
- Independent read-only code review found no blocking or important lifecycle, focus, reduced-motion, SSR or isolation issue. Its TypeScript check passed.

The original incomplete harness result is retained in `qa-initial-harness.json`. Axe initially required an explicit browser context, and the original-section screenshot initially attempted an out-of-viewport clip. Both harness problems were corrected. Two later image assertions checked the off-screen filmstrip photo before native lazy loading; only those two cases were rerun after scrolling the photo into view. All four images loaded. The consolidated report keeps the earlier assertion reason alongside its passing recheck. Successful interaction tests were not rerun merely to replace that evidence.

External WhatsApp/Instagram destination strings and safe attributes were checked; no business message was sent. Tests use Chrome emulation, not physical phones or a Safari/Firefox certification. No unmeasured Lighthouse/Web Vitals claims are made.

## Visual comparison

- `screenshots/editorial-{390,768,1024,1440,1920}.jpg`: recommended final captures.
- `screenshots/portfolio-*.jpg`, `filmstrip-*.jpg`: working alternatives at all five widths.
- `screenshots/approved-*.jpg`: the existing homepage's last three sections, cropped from a genuine full-page render.
- `screenshots/comparison-1440.jpg`, `comparison-390.jpg`: approved/prototype side-by-side. The prototype includes its separate review/header controls; the approved image is cropped to the three scoped sections.
- `screenshots/no-javascript-390.jpg`: readable prerender without JavaScript.
- `screenshots/first-*.jpg`, `editorial-hover.jpg` and `review-*.jpg` retain earlier iteration/review evidence. The explicitly named final concept captures and comparison files are the current output.

Visual review checked all required widths, selected-image composition, mobile alternatives, the dark consultation/footer continuity, contact hierarchy and the before/after comparison. No unrelated imagery or stock photography was introduced.

## Applied design skills and delivery gate

Antislop During: no invented claims, no extra decorative wordmark, no theme/effect import, one primary action, real photos and native semantic controls. Impeccable: different content densities joined into one visual sequence, visible defaults, contrast and actual rendered review. UI UX Pro Max: focus/touch affordances, normal scrolling, media dimensions and reduced-motion coverage. Taste Skill: composition/image-led direction, purposeful feedback and a real-browser diagnostic; its full-page scaffold rules are distinguished from this isolated final-sections brief.

Antislop scoped gate:

- R-02/R-17/R-18/R-36/R-38 PASS: no new em-dash product copy, invented statistics, testimonials, places or client claims; archive files are actual PJP assets.
- R-03/R-25/R-32/R-39 PASS: 15 responsive states, axe A/AA, visible focus, native actions, dialog keyboard operation and safe CTA/footer clearance; body contrast independently measured.
- R-23/R-24/R-26/R-35 PASS: requested prototype assets/functions only; working archive, viewer, form and contact routes; successful builds and recorded browser tests.
- R-27/R-28/R-33/R-34/R-40 PASS: static content has visible defaults, no invented FAQ/theme system or runtime patch, explicit media dimensions, responsive/lazy loading and no looping third-party media.
- R-01/R-04/R-06/R-07/R-08/R-09/R-10/R-12/R-13/R-14/R-19/R-22 PASS: existing brand palette/type, relevant zoom/navigation icons, function-led arrows, no background grid, badge wall, glass, glow, cards or illustrations; quiet cancellable photo feedback.
- R-37/Liveliness PASS: established Minimal Industrial direction, ENERGY 2 / RHYTHM 2 / MOTION 1; a dominant field image, orange enquiry focus, composed spacing and compact closure.
- C-1..C-5/R-05/R-11/R-15/R-16/R-20/R-21/R-29/R-30/R-31 PASS within the prototype brief: actual evidence and functions determine composition; no unrelated template identity, pill/card system, marketing claims, new theme or fabricated content.

Taste Skill diagnostic output is retained in `taste-gate-first.txt` and `taste-gate.txt`. It is not counted as a functional QA pass. Final diagnostic: **GATE: FAIL 34 (round 2 of 3)**, 8 non-blocking WARNs. Initial diagnostic had 37 open findings; the final heading, body contrast and responsive image-candidate refinement removed the headline/contrast/upscale findings. No check count was inferred; both runs are saved.

Remaining diagnostic findings are preserved for evaluation rather than automatically forcing a different design brief:

- The checker treats this final-sections excerpt as an entire homepage hero and asks for an extra first-screen CTA, a number/place claim, photography in the consultation section and exact one-screen section heights. Those additions would repeat actions, invent unsupported content or replace the requested connected sequence with fixed screen blocks.
- It requires kit-specific `.wrap` structure, one shared margin for the external review bar and product, identical split-column top lines, and an h2 always smaller than h1 even across independent section contexts. The prototype instead uses the established PJP gutters, separate review controls and content-driven proportions.
- It flags the two-line PJP brand lockup, wrapping concept-choice labels, the official phone number, and existing inherited `outline:none` rules for noninteractive focus destinations/unused Tailwind selectors. Actual native controls have their scoped `:focus-visible` rings; keyboard and axe checks passed. The official business number is explicitly supplied and must remain.
- No kit files were edited and no waiver file was added to manufacture a pass. The full unresolved list remains in `taste-gate.txt`; the prototype is not described as passing the global Taste scaffold gate.

No GitHub push, Cloudflare deployment, production configuration change or replacement of the approved homepage occurred.
