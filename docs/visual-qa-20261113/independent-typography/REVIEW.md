# Independent typographic assessment

Fresh browser assessment on 13 November 2026 against the newly built local preview at `http://127.0.0.1:4173`. Product source is read-only in this assessment. No deterministic detector results were consulted.

## Reproduced findings

### P1: text reveal masks cut glyphs during the entrance

Native Web Animations were frozen at currentTime=0. Two screenshots of the same target/position differ only by the clip-path keyframes being replaced with `none`; transform, opacity, typography and content remain the same.

- Hero `[data-hero-line]` uses a 14% bottom inset. The lowercase `g` descender in “Pengaspalan” is visibly severed. Reproduced at 320, 390, 768, 1024 and 1440px. Example: `hero-1440-mask-start.png` versus `hero-1440-mask-disabled-reference.png`; 2,813 changed raster pixels.
- Section `[data-motion="title"]` uses a bottom inset of 6%/10% on tablet/desktop. “kondisi lapangan.” is visibly sliced along the bottom at 1440px. Example: `story-1440-mask-start.png` versus `story-1440-mask-disabled-reference.png`; 1,558 changed pixels.
- Other section headings also reproduce the same mechanism; all 25 width/heading comparisons and actual computed type values are in `report.json`.

Root cause: the clipping rectangle is tied to the element line box rather than the actual ink bounds. Barlow Semi Condensed ink extends outside some tightly set line boxes. The affected text has no scrollWidth failure; a static DOM width check misses the issue.

### P1: the final zero-inset mask can retain glyph clipping

The animation finishes by committing an inline `clip-path: inset(0 0 0%)`, rather than releasing clipping. At mobile the configured section inset is already zero, yet the screenshot pairs still show missing tail pixels on the `g` in “tangani”. `services-320-mask-start.png` versus `services-320-mask-disabled-reference.png` reproduces this at a zero-inset state.

Measured after completing the animations:

| Target | Width | scrollHeight / clientHeight |
| --- | --- | --- |
| Service section h2 | 320 | 88 / 86px |
| Story h2 | 320 | 90 / 88px |
| Homepage h1 | 1440 | 219 / 212px |
| Service section h2 | 1440 | 166 / 162px |

These measurements locate the ink extending outside the box; the screenshot pairs, not the measurements alone, confirm visible clipping. Removing text clipping entirely, or using a mask with genuine ink padding and releasing it after playback, addresses both the transition and final state. Image clipping can stay independent.

### P2: selected native select text is cut at 320px

The consultation form's default “Belum yakin / perlu konsultasi” is visibly truncated by the native select's content/arrow area at 320px. The option can still be opened/selected, so this is a readability issue rather than a blocked form. Evidence: `form-320.png`. At 390 and 768px the full default is visible (`form-390.png`, `form-768.png`). Preserve the approved wording and font, and recover a small amount of inline space rather than rewriting the option.

## Typography system assessment

- **Authority and fit:** DESIGN.md establishes Barlow Semi Condensed for major headings and Barlow for body, service names, navigation and form controls. Both have distinct jobs and fit the supplied industrial identity. No replacement family is warranted.
- **Actual delivery:** Chrome DevTools `CSS.getPlatformFontsForNode` confirms custom `BarlowSemiCondensed-ExtraBold` for the first hero segment, `BarlowSemiCondensed-Bold` for emphasis, `Barlow-Regular` for supporting copy and `Barlow-SemiBold` for visible desktop navigation. This is real glyph rendering evidence, beyond computed font-family or FontFaceSet.check. Hidden mobile desktop-navigation links correctly report no painted glyphs. Details are in `report.json`.
- **Hierarchy:** At 1440px the hero is 100.8px/105.84px; service section h2 is 74.88px/80.87px; story h2 is 61.92px/68.11px. Body and controls are clearly subordinate. At 320px hero 42px/45.36px and section h2 40px/43.2px remain visually distinct through their section context, color and supporting content.
- **Scale and consistency:** The responsive scale derives from the existing clamps and breakpoints. Repeated labels, controls and section roles remain consistent. No arbitrary new scale is necessary.
- **Reading:** Existing 16px body copy and line-height around 1.65–1.73 are comfortable in the reviewed 320–1440px layouts. Desktop text measures remain bounded by the current 580/670px limits. Tightly set headline ink is readable when clipping is removed.
- **Stress:** Reviewed 320, 390, 768, 1024 and 1440px on home and gallery, plus consultation dialogs at each width. The gallery category legitimately wraps at 320px without losing its name. No static overlap or fixed-header obstruction was found in the reviewed initial gallery/form captures. Zoom, landscape, font-network failure and all remaining requested widths belong to the root agent's broader QA and are not claimed here.

## Evidence inventory and method limits

`probe.cjs` is the reproducible assessment script. `report.json` includes 25 raster comparisons, actual platform-font evidence and final computed text inventories. PNG files contain frozen starting masks, mask-disabled references and gallery/form captures at the five representative widths.

Frozen animation captures are deliberate diagnostic states, not a claim about wall-clock duration at those frames. Changed-pixel counts quantify the difference in a fixed crop; screenshots were also inspected visually. Headless Chrome with viewport emulation is not a physical-device test. No source code, content, server process or build configuration was changed by this assessment.
