# Independent mechanical assessment

Scope: current active source only. No browser was launched, no product source was edited, and no historical pass report was used as evidence of current behavior. This assessment is isolated from the parallel visual review.

## Fresh detector

Executed:

```powershell
.\.agents\skills\impeccable\scripts\impeccable.cmd detect --json --scope type src/MinimalIndustrial.tsx src/GalleryPage.tsx src/SiteHeader.tsx src/SiteFooter.tsx src/components/InquiryModal.tsx src/minimal-industrial.css src/project-gallery.css src/inquiry-modal.css src/motion
```

Exit code: 0. Raw result: `[]`, retained in `detector-type-before.json`. A clean detector is a mechanical floor and cannot establish correct glyph rendering or motion visibility.

## Findings and boundaries

1. **Text masking is implemented directly on live text.** In `src/motion/siteMotion.ts`, the title branch animates `clipPath` from `inset(0 0 ${profile.clip}% 0)` to a zero inset. Hero line animation uses a 14% bottom inset initially, also ending at zero. This confirms the implementation property and the exact clipping mechanism. Whether particular glyphs are visibly cut, and by how many pixels, requires frozen-keyframe raster comparison. The source detector does not report this. Treat as a P1 candidate until visual evidence establishes its impact; do not call it a reproduced visual defect from this source-only review.

2. **Current clipping tests do not test glyph coverage.** `scripts/ui-audit.mjs` checks `scrollWidth > clientWidth`; `scripts/motion-audit.mjs` considers opacity 0 or visibility hidden. Neither compares vertical ink coverage, glyph overhang or clip-path effects during animation. This is a confirmed test-coverage gap. Add screenshot/paint comparisons with text animations paused at start, middle and end; a baseline can remove text clipping while keeping transform, opacity, fonts and layout identical.

3. **Current font checks do not establish actual rendered faces.** `document.fonts.check` and the computed `fontFamily` declaration are the only font assertions in `scripts/ui-audit.mjs`. They do not record which face painted each text node. A declared family may still fall back, and a font availability check can be misleading when a requested face is absent from the font set. Record loaded FontFace entries and inspect actual Chrome platform fonts for representative headings, body, controls, navigation and form text. No font-loading failure was reproduced in this source-only pass.

4. **Existing 200% check is text scaling, not browser zoom.** `scripts/ui-interactions.mjs` sets `html.style.fontSize = '200%'`. Pixel-sized body and controls are not thereby doubled. Keep this useful text-scaling case but add a documented 2× page/layout path, landscape and short-height captures. Do not describe the existing assertion alone as a complete browser zoom test.

5. **Lifecycle testing checks effects, not every live subscription.** Current source disconnects its IntersectionObserver/MutationObserver, removes the same media listeners, stops scroll attachments, cancels active animations and restores previous inline styles. `useSiteMotion` guards delayed imports and cancels its requestAnimationFrame. Header/menu and gallery key handlers also have matched removal. The tests exercise duplicate initialization, stale cleanup, unmount and repeated mount cycles through animation counts. No confirmed leak was found from inspection, but count active observers/listeners in an isolated fixture to strengthen that claim; animation count alone is not a general memory-leak proof.

6. **Asynchronous sticky height deserves an anchor stress test.** `motion.css` gives the story image a viewport-based height only after async motion initialization sets `data-motion-depth`. This is a potential layout/anchor issue rather than a verified defect. Compare section geometry before and after initialization at wide/tall sizes and refresh `/#proses` and `/#kontak`. Offscreen layout changes may not appear in CLS. Preserve current behavior if actual geometry and anchor tests remain stable.

## Established typography and non-findings

- Active body/control family: Barlow, with Arial/sans-serif fallbacks. Active display/headline family: Barlow Semi Condensed with narrow/system fallbacks. These roles match the approved Minimal Industrial system.
- Main heading sizes are responsive clamps; section line heights are generally 1.05–1.15, body copy 1.6–1.73. Compact navigation and labels use separate roles. These declarations alone do not prove or disprove raster clipping.
- Alternate font families and tightly tracked styles in unmounted `.pjp-*` legacy rules are outside this active-surface audit and are not product defects merely because they exist in CSS.
- Font weight values such as 850/900 resolve to the available Barlow family weights; their presence alone is not proof that the browser used Arial or another fallback.
- Scroll reveals are one-shot by a WeakSet; reverse scrolling is intentionally static after a completed entrance. The important usability property is readable content, rather than mandatory replay on every reversal.

No recommendations to change business copy, brand, fonts, assets, dependencies or page hierarchy are made by this mechanical pass.
