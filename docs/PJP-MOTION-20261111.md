# PJP: scroll motion implementation

Implemented in the existing React website on 11 November 2026. No deployment, Git push, production configuration change, new runtime dependency or replacement asset.

## Result and architecture

The existing Minimal Industrial design remains the source of truth. Barlow typography, pumpkin/black/paper palette, section order, copy, six service illustrations, four project photos, header/footer and consultation behavior are preserved. Source-text comparisons and SHA-256 checks are recorded in `motion-20261111/source-verification.json`.

Motion uses the already-installed **Motion 12.43.0** package. `motion/mini` supplies native Web Animations playback; `scroll` supplies scroll-linked timelines, using native timelines where supported. No GSAP, ScrollTrigger or smooth-scroll replacement was added.

- `tokens.ts`: shared exponential ease-out, responsive distance/duration/stagger and hero timing.
- `siteMotion.ts`: one Intersection Observer per active scene, distinct reveal treatments, bounded group stagger, native scroll-linked depth and mutation observation for replaced gallery groups. A WeakMap replaces duplicate scene initialization. All observers, media listeners, playback controls and scroll attachments are cleaned up; previous inline styles are restored.
- `useSiteMotion.ts`: React lifecycle and deferred dynamic import after paint. StrictMode/unmount races are guarded. Static content stays readable when the chunk fails.
- `motion.css`: restrained pointer hover and native sticky editorial image on wide, tall desktop viewports. No generated pin spacer or artificial scroll distance.

The homepage hero reveals its two existing headline segments in sequence without word splitting. Supporting copy and actions settle by 8px; actions remain visible and clickable. Service illustrations rise and scale lightly by row. Editorial headings use a shallow mask; process rules extend from the left. Gallery reveals operate on image layers, leaving focus outlines on stationary native links. Filter changes reveal the replaced photo group. Contact headings and actions have a short closing entrance.

Hero and story image depth scrub in both directions. Travel is proportional to image height and stays within its overscan, including short desktop windows and height-only resizing. There are no perpetual decorative loops, pointer-followers or scroll traps.

## Responsive behavior

| Profile | Entrance budget | Image depth | Sticky behavior |
| --- | --- | --- | --- |
| Desktop ≥1200px | Up to 26px, 0.72s; hero 0.78s; stagger ≤0.18s | Hero ±1.8%, story ±1.8% | Story photo only when viewport height ≥800px, bounded by its existing section |
| Tablet 768–1199px | Up to 18px, 0.60s; stagger ≤0.14s | Hero ±0.8% | None |
| Mobile <768px | Up to 10px, 0.44s; stagger ≤0.09s | None | None |
| Reduced motion | Static; active effects cancelled when preference changes | None | None |

Motion dials: ENERGY 2 / RHYTHM 3 / MOTION 3 desktop, 2 tablet, 1 mobile, 0 reduced motion. The hero is the focal entrance; service assembly, project-surface reveals and the story image each serve a different visual purpose.

## Progressive enhancement

Previously the production HTML contained an empty root. The build now prerenders the homepage and gallery from the same React components, then hydrates them in the browser. It writes both `galeri-proyek.html` and `galeri-proyek/index.html` so the local clean URL and trailing-slash URL both receive the correct page. Existing robots/preview metadata is preserved.

Without JavaScript, the website still presents its business content, all illustrations/photos, native navigation and links to original project photos. A clearly labelled manual project-summary field is available. Enhanced filtering, dialogs and automatic clipboard copying require JavaScript. When only the motion module fails, the React application, inquiry form and gallery remain functional.

The consultation CTA retains its existing summary/clipboard workflow. This project does not contain a verified WhatsApp contact; no number or sending action was invented.

## Files changed

Existing source/configuration:

1. `package.json`: add SSR bundle and static prerender to the local build command.
2. `src/App.tsx`: accept a server-render pathname without requiring `window`.
3. `src/main.tsx`: hydrate prerendered HTML; keep client render for development.
4. `src/MinimalIndustrial.tsx`: attach scene lifecycle and mark existing motion targets.
5. `src/GalleryPage.tsx`: motion targets, keyed filter groups, native image-link fallback with enhanced lightbox.
6. `src/minimal-industrial.css`: remove the superseded hero animation/keyframes.
7. `scripts/ui-interactions.mjs`: distinguish navigation targets from native photograph links.

New implementation/testing files:

8. `src/motion/tokens.ts`
9. `src/motion/siteMotion.ts`
10. `src/motion/useSiteMotion.ts`
11. `src/motion/motion.css`
12. `src/entry-server.tsx`
13. `scripts/prerender.mjs`
14. `scripts/motion-audit.mjs`
15. `scripts/motion-lifecycle.mjs`

Documentation/evidence: this report; `motion-20261111/PLAN.md`, `source-verification.json`, `before/`, `after/`, `motion/` and `reference/`. Impeccable also updated its generated `.impeccable/hook.cache.json` cache. Generated `dist/` and `dist-ssr/` are build outputs.

SHA-256 comparison confirms **28 public files unchanged**, including every illustration and photograph. Header, footer, inquiry component, gallery/inquiry/global CSS, business data, `vite.config.ts`, `index.html` and lockfile are unchanged. JSX text in both active pages is unchanged. Under reduced motion, all 18 measured section layouts and visible-copy inventories match the before captures.

## Verification

Chrome 157.0.8103.50, controlled through Playwright. Both active routes tested locally at `http://127.0.0.1:4173`.

| Executed check | Result | Evidence |
| --- | --- | --- |
| Production build, including `tsc -b`, client/SSR bundles and prerender | PASS | `npm.cmd run build`, exit 0 |
| Layout, image loading, clipping, touch targets, console and axe checks | 18/18 PASS | `motion-20261111/after/report.json` |
| Form, menu, focus, keyboard, clipboard success/denial, filters, lightbox, swipes and navigation | 37/37 PASS | `motion-20261111/after/interactions.json` |
| Normal motion, slow/fast/reverse scrolling, anchors, breakpoint changes, reduced motion, touch scrolling, failed chunk and JavaScript disabled | 73/73 PASS | `motion-20261111/motion/report.json` |
| Duplicate initialization, stale cleanup, unmount, 20 mount cycles, missing observer, short windows and CPU slowdown | 8/8 PASS | `motion-20261111/motion/lifecycle-performance.json` |

Layout checks: mobile **320, 360, 390, 430**; tablet **768, 1024**; desktop **1280, 1440, 1920px**. Normal-motion scroll checks cover 360, 390, 430, 768, 1024, 1440 and 1920px. Native no-JavaScript content and photo navigation were exercised at 390, 768 and 1440px. Additional tests cover 844×390 landscape, 200% text size and height-only desktop resizing from 500 to 1080px.

No horizontal overflow, broken images, overlapping photos, clipped copy, undersized visible targets or axe violations were found in the 18 final layout checks. Console errors and hydration warnings were resolved. Manual visual review covered actual before/after hero, mobile services, tablet process, desktop story/gallery and JavaScript-disabled screenshots.

The local CPU 4× diagnostic sampled six seconds of forward/reverse scrolling at 390 and 1440px: 360 rAF samples each, median 16.7ms, p95 16.8ms, no samples above 50ms and no long tasks during scrolling. Initial-load long tasks of 70–136ms were recorded. These are single-machine headless diagnostics with unthrottled local networking, not physical-device or field Core Web Vitals guarantees. Raw measurements, including observed LCP/CLS, are in the JSON report.

Final client output: main JS 264.38kB / 80.86kB gzip; deferred motion chunk 27.02kB / 10.28kB gzip; CSS 82.68kB / 17.03kB gzip. Primary content is present before the motion chunk. Image dimensions/aspect ratios reserve layout space. No custom production scroll listener was introduced; the existing passive header handler is unchanged.

No lint script or ESLint configuration exists in this project. TypeScript checking ran as part of every production build. No lint result is claimed.

## Skills and design review

Impeccable's animate/craft-floor guidance informed hierarchy, visible defaults and authored motion. Taste Skill informed restrained motion and browser review. UI UX Pro Max informed responsive motion and interaction guidance. Antislop core, UI, human and mobile-layout guidance applied in DURING mode from the user's session choice. The user's preservation brief takes precedence over generic skill suggestions to replace existing labels, layouts or assets. Superpowers verification/debugging guidance was used for test evidence and confirmed regressions.

The reference [tasteskill.dev](https://www.tasteskill.dev/) was actually inspected in Chrome at three scroll positions. Its observed entrances and sticky scenes informed direction; the implementation does not claim to reproduce its code. Reference captures are retained in `motion-20261111/reference/`.

## Backup and rollback

Backup: **`C:\Projects\PJP-Website-backups\motion-20261111-162417`**, made before source edits. It contains 81 source/configuration/asset/tooling files. Dependencies, build output, installed skills and QA capture folders were excluded. No backed-up file is missing from the working project.

To restore the previous working behavior, stop the preview server and run these commands in PowerShell from the project directory. They restore only the seven existing files changed by this task and rebuild the original client application. Newly added motion/prerender files become unused; keep them for review or remove the eight explicitly listed new files separately if an exact source rollback is required.

```powershell
$pjpRestoreRoot = 'C:\Projects\PJP-Website'
$pjpMotionBackup = 'C:\Projects\PJP-Website-backups\motion-20261111-162417'
$pjpRestoreFiles = @(
  'package.json', 'scripts\ui-interactions.mjs', 'src\App.tsx',
  'src\main.tsx', 'src\MinimalIndustrial.tsx', 'src\GalleryPage.tsx',
  'src\minimal-industrial.css'
)
foreach ($pjpRestoreFile in $pjpRestoreFiles) {
  Copy-Item -LiteralPath (Join-Path $pjpMotionBackup $pjpRestoreFile) -Destination (Join-Path $pjpRestoreRoot $pjpRestoreFile) -Force
}
Set-Location -LiteralPath $pjpRestoreRoot
npm.cmd run build
```

## Screenshots and limitations

- Before: `motion-20261111/before/`.
- Final responsive/static renders: `motion-20261111/after/`.
- Final normal-motion section renders and no-JavaScript screenshots: `motion-20261111/motion/`.

Testing uses desktop Chrome with viewport/touch/CPU emulation. Safari, Firefox, physical Android/iOS devices and field performance have not been tested. External Google Fonts remain an existing network dependency. The preview's unavailable official contact remains unchanged. No deployment or push was performed.
