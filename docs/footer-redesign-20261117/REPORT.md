# PJP premium industrial footer

Implemented locally on the homepage and project gallery. Selected **roadside editorial** over the denser engineering-ledger direction. The result uses PJP's existing charcoal, orange and Barlow typography with a large contact invitation, useful information index, oversized company signature and restrained road detail.

## Changes

- Exact requested CTA copy and original WhatsApp destination: https://wa.me/6281313884080.
- Existing company lockup, five navigation links, six service choices and verified phone number. Services open the existing inquiry form with the relevant selection.
- Removed the development notice. Added current-page back-to-top with keyboard focus management.
- Existing Motion engine reveals the headline and wordmark once. Small arrow and color responses on hover. Reduced motion restores static visible content.
- The floating WhatsApp shortcut remains visible. While the footer is in view it uses its recognizable icon and the content reserves a clear right edge. Its full label returns outside the footer; no-JavaScript and missing-observer modes use the compact fallback.
- No new dependencies or imagery. No deployment or push.

## Source and backup

Product changes: [SiteFooter.tsx](../../src/SiteFooter.tsx), new [site-footer.css](../../src/site-footer.css).

Backup: [original footer](backup/SiteFooter.tsx) and [source hashes](backup/source-hashes.json). This task's source edits are limited to SiteFooter.tsx and the new footer stylesheet. The contact configuration and other website sections were not edited by this task. This directory has no Git repository.

The final hash comparison detected separate gallery edits made during final QA: GalleryPage.tsx (09:43:30), project-gallery.css (09:43:38), and data/projectGallery.ts (09:43:39), local time on 17 November. These were left intact. An additional production build and footer integration checks cover the current combined workspace. The backup hashes record the starting state, not a claim that concurrent work did not occur.

## Screenshots

| View | Redesigned footer | Real page-bottom viewport |
| --- | --- | --- |
| Desktop, 1440px | [Footer](after/home-1440-footer.png) | [Viewport](after/home-1440-bottom.png) |
| Tablet, 768px | [Footer](after/home-768-footer.png) | [Viewport](after/home-768-bottom.png) |
| Mobile, 390px | [Footer](after/home-390-footer.png) | [Viewport](after/home-390-bottom.png) |
| Gallery, 1440px | [Footer](after/gallery-1440-footer.png) | [Viewport](after/gallery-1440-bottom.png) |

[Before desktop](before/home-1440-footer.png), [before tablet](before/home-768-footer.png), [before mobile](before/home-390-footer.png).

Tall footer-element screenshots omit page-fixed navigation and the skip link to avoid screenshot-stitching artifacts. Real viewport captures retain the actual page chrome and floating shortcut.

## Validation

- `npm.cmd run build`: passed strict TypeScript, client build, SSR build and prerendering for both routes.
- No lint script is configured in package.json.
- `node scripts/footer-audit.mjs`: 60 checks across 18 responsive views. Widths: 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920px. Checks include exact copy/destination, real anchors, font availability, overflow, 44px control dimensions, runtime errors and page-bottom collisions. Footer axe WCAG 2.2 AA checks at 390/768/1440px on both routes found zero violations.
- `node scripts/footer-audit.mjs --interactions`: 35 checks passed. Covers WhatsApp popup URL, all service selections, inquiry opening and focus return, Tab/Enter/Escape, visible focus, section/gallery navigation, same-route back-to-top, smooth scrolling, hover response, once-only reveal, dynamic reduced-motion change and both prerendered routes without JavaScript.
- `node scripts/footer-audit.mjs --sweep`: tests every footer control aligned with the floating shortcut at six widths on both routes. The initial version failed 10/12 combinations; the correction passed all 12.
- `node scripts/footer-audit.mjs --fallback`: disabled JavaScript and missing IntersectionObserver at 768/1440px. Regression reproduced as 0/4 before the conservative default, then passed 4/4.
- Test navigation to WhatsApp was intercepted. No messages were sent.

Evidence: [responsive results](after/report.json), [interaction results](after/interactions.json), [scroll sweep](after/sweep.json), [fallback results](after/fallback.json), [initial baseline](before/report.json). QA runs against the built local preview at http://127.0.0.1:4173.

Checks use headless Chrome 157 with emulated viewports and keyboard interaction. Physical-device, Safari and Firefox testing was not performed. Automated accessibility results supplement visual and keyboard inspection.

## Reference exploration

- [Footer.design large type](https://www.footer.design/styles/large-type) and [dark footers](https://www.footer.design/styles/dark): a brand name can form the closing composition; scale and contrast separate the invitation from utility links.
- [21st.dev footer collection](https://21st.dev/community/components/explore/footer-design): useful link grouping, mobile order and focus behavior. Existing Motion/Lucide stack was sufficient; no component source was copied.
- The requested [Awwwards inspiration URL](https://www.awwwards.com/inspiration/) returned HTTP 404 in Chrome. The current [Awwwards footer elements](https://www.awwwards.com/elements/?text=footer) returned HTTP 200 and supplied editorial contact/brand references.

Reference [status log](references/report.json), [Footer.design capture](references/footer-large-type.png), [21st.dev capture](references/21st-footers.png), [Awwwards capture](references/awwwards-footer-elements.png). Principles informed an original PJP composition; no reference code, assets or signature animation were copied.

## Design checks

[Footer design delivery checklist](DESIGN-CHECKS.md). The deterministic Impeccable hook found no issues in the changed UI files. It reported that the existing DESIGN.md sidecar is out of date; updating the unrelated design-system documentation was left outside this task.

`GATE: OFF (no build active)` was the separate Taste skill's gate result. It had no active build registration; this is not a whole-site design certification. The footer was verified directly with the production browser audit described above.
