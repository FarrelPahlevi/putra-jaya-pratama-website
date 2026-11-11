# PJP motion refinement — 11 November 2026

Direction: precision and weight, with readable content present from the first render. Preserve Minimal Industrial, Barlow, every business statement and all six existing illustrations. The hero is the principal entrance; services show assembly, project photographs reveal their surface, and the story image provides a restrained moment of depth.

Final motion dials, on a 1–3 scale: ENERGY 2 / RHYTHM 3 / MOTION 3 on desktop, MOTION 2 on tablet, MOTION 1 on mobile. Reduced motion sets MOTION 0. Existing typography, paper/charcoal section rhythm and pumpkin accents supply the identity; added motion makes the material and sequence easier to read.

Audit: React 19 / TypeScript / Vite 6, Tailwind 4 plus component CSS. Motion 12.43.0 is already installed; active pages currently use a single CSS hero entrance and pointer transitions. Archived React Motion components are not mounted. Use the existing Motion dependency, native animation playback and one Intersection Observer, without GSAP or a smooth-scroll replacement.

Reference: https://www.tasteskill.dev/ was inspected in Chrome at 1440 × 900, at scroll positions 0, 750 and 1600. Opacity/transform entrances and sticky scene elements were observed. Screenshots and observations are in `reference/`. This is an adaptation of the requested principles, not a reconstruction of its implementation.

Implementation order:
1. Add centralized durations, easing, responsive intensity, lifecycle cleanup and failure-safe enhancement.
2. Annotate existing sections; distinct hero, illustration, editorial, process and photo treatments. Keep navigation and dialogs outside animated ancestors. Use a short native sticky image only on large, tall screens; never add a pinned scroll runway.
3. Add static HTML build output and native photograph links, because the existing empty client root fails the user's JavaScript-disabled requirement. Keep enhanced modal/filter behavior. Provide a manual project-summary fallback without inventing a contact number.
4. Build and inspect actual Chrome renders. Test normal/reduced motion, reverse/fast/touch scrolling, breakpoint changes, anchors, keyboard, filter/lightbox/form, initialization failure and JavaScript disabled. Compare screenshots across the requested widths.

Motion limits: 10–26px entrances, bounded stagger, 0.38–0.78s duration, no entrance below 70% opacity, no mobile parallax or pinning. No infinite decorative animation, new statistics, assets, sections in the enhanced website or production configuration changes.

Backup before source edits: `C:\Projects\PJP-Website-backups\motion-20261111-162417`. Source, configuration and assets copied; generated output, dependencies, skills and QA captures excluded. Before screenshots: `before/`.

Skills: Impeccable (animate and craft floor), Taste Skill (motion and browser finish), UI UX Pro Max (interaction/reduced-motion guidance), Antislop core/UI/human/layout (DURING, session choice). The explicit preservation and scroll-animation brief takes precedence over generic skill directions to restyle existing pages or avoid scroll reveals.
