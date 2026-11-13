# Antislop Delivery Gate

Mode: DURING, explicit session choice. Scope: requested motion refinement of the existing PJP website. Direction and purpose: `PLAN.md`; implementation, limitations and file list: `../PJP-MOTION-20261111.md`. Existing user-approved visual identity and content are preserved.

## Hard Gate

| Item | Status | Concrete evidence |
| --- | --- | --- |
| R-02: product punctuation | PASS | No product-copy rewrite; new fallback copy has no em dash. |
| R-03: mobile containment | PASS | 18 layout checks across 320–1920px: no overflow or clipped copy. |
| R-17: sourced statistics | PASS | No statistics or achievements added; business-data hashes unchanged. |
| R-18: testimonials | PASS | No testimonial or portrait added. |
| R-23: assets/navigation | PASS | All 28 public files unchanged; fallback reuses real routes and existing photos. No generated visual asset. |
| R-24: real navigation | PASS | Internal destination check passed; native photograph links open original image assets. |
| R-25: contrast | PASS | Axe WCAG AA checks: zero violations in both routes/all nine widths and open dialogs. Existing palette unchanged; fallback uses dark ink on paper and white on charcoal. |
| R-26: functional controls | PASS | 37 interaction checks exercise menu, every inquiry trigger, filters, all photos, form and clipboard paths. |
| R-27: states | PASS | Form validation, copying, success, denied clipboard/manual recovery and existing preview notice preserved and exercised. No unsupported filter is offered. |
| R-28: relevant FAQ | PASS | No FAQ introduced. |
| R-32: keyboard | PASS | Skip link, focus traps/return, Enter, Tab, Escape and arrow navigation exercised. Stationary photo links retain visible focus rings. |
| R-33: direct implementation | PASS | Source/component/CSS changes made with apply_patch. Build-time prerender renders React components; it does not rewrite UI source. |
| R-34: themes | PASS | No theme mode or toggle introduced; existing paper/charcoal identity preserved. |
| R-35: executed site | PASS | Production build, 18 layout checks, 37 interaction checks, 73 motion checks and 8 lifecycle/performance checks executed. |
| R-36: factual claims | PASS | No new marketing/performance claim in the product. Performance report names actual local measurements and their limits. |
| R-37: direction | PASS | User's explicit preservation/motion brief, DESIGN.md and pre-implementation PLAN.md set direction. |
| R-38: real content | PASS | JSX text and business data unchanged; official-contact limitation retained. |
| R-39: native controls/accessibility/motion | PASS | Semantic links/buttons and labels retained; native dialogs, reduced-motion toggling, focus, zoom/text scaling and touch tested. No time-based loop; scrub progress belongs to the user's scroll. |
| R-40: loading/layout stability | PASS | Existing image dimensions, responsive sources and high-priority hero preserved. Static HTML precedes lazy motion. No blocking third-party script added. |

## Purpose Gate

| Item | Status | Purpose/evidence |
| --- | --- | --- |
| R-01: gradients/glows | PASS | Existing photo shading supports text contrast; no new gradient/glow. |
| R-04: icons | PASS | Existing arrows indicate navigation/action; close and previous/next icons retain their real interaction. No new icon system. |
| R-06: typography/labels | PASS | Existing Barlow and industrial labels preserved as explicitly requested. No monospace/decorative label added. |
| R-07: background patterns | PASS | No background pattern added. |
| R-08: arrows | PASS | Existing action/navigation affordances preserved; no new decorative arrow. |
| R-09: badges/pills | PASS | Existing rounded filters communicate selection. No status/marketing badge added. |
| R-10: translucent surfaces | PASS | Existing header appearance preserved; no extra translucent surface. |
| R-12: elevation | PASS | No new card shadow or floating surface. Dialog/header elevation unchanged. |
| R-13: glow | PASS | No glow added. |
| R-14: uniform cards | PASS | Six existing service illustrations retain their content-driven grid without added card containers. |
| R-19: motion purpose | PASS | Authored two-line hero; row-based service assembly; image-surface gallery reveal; restrained story depth; process-rule extension. Distances/durations vary by device, and controls remain readable. |
| R-22: illustrations | PASS | Six actual PJP construction illustrations retained byte-for-byte. |

## Liveliness

| Item | Status | Evidence |
| --- | --- | --- |
| Explicit dials | PASS | ENERGY 2 / RHYTHM 3 / MOTION 3 desktop, 2 tablet, 1 mobile, 0 reduced in PLAN/report. |
| Dial consistency | PASS | Native desktop image depth, lighter tablet depth, no mobile depth; distinct existing light/dark section rhythm. |
| Focal point | PASS | Hero headline, service illustration group, story photograph, process heading and gallery photographs reviewed in rendered screenshots. |
| Structural whitespace | PASS | Existing section spacing/layout preserved; all reduced-motion section measurements match before captures. |
| Deliberate accent | PASS | Existing pumpkin accent retained; no new competing color. |
| Identity motif | PASS | Barlow headline weight, square photo frames, construction illustrations and measured horizontal rule reveals. |
| Design Read | PASS | Existing DESIGN.md and pre-edit PLAN.md define industrial material, restrained motion and preservation constraints. |

## Craftsmanship and Quality Locks

| Item | Status | Evidence |
| --- | --- | --- |
| C-1 intentionality | PASS | PLAN and implementation report give each motion treatment a purpose. |
| C-2 completeness | PASS | Existing interactions tested; native photo/manual-summary fallbacks are available without JavaScript. |
| C-3 composition | PASS | No new section in the enhanced website or arbitrary pinned runway. |
| C-4 resilience | PASS | Nine widths, landscape, 200% text, keyboard, clipboard error, no-JS, failed import, missing observer, resize and reduced-motion cases exercised. |
| C-5 evidence | PASS | Raw JSON and before/after captures retained; untested physical devices/browsers stated explicitly. |
| R-05 section rhythm | PASS | Existing service/story/process/gallery/contact sequence preserved; motion distinguishes their purposes. |
| R-11 shapes | PASS | Existing square page actions, rounded filters and consultation fields unchanged. |
| R-15 CTA specificity | PASS | Existing “Lihat layanan”, “Lihat foto proyek”, “Isi kebutuhan proyek” and explicit clipboard actions retained. |
| R-16 buzzwords | PASS | Active-page copy preserved from the prior copywriting refinement. No marketing phrase added. |
| R-20 identity | PASS | Real construction photos, six project-specific service illustrations, Barlow and pumpkin remain the visual subject. |
| R-21 theme reason | PASS | Existing industrial dark panels/paper surfaces preserved; no forced new theme. |
| R-29 palette | PASS | Original palette and source CSS colors unchanged outside a matching no-JS fallback. |
| R-30 originality | PASS | Reference motion observed, but PJP structure, assets, copy and components retained. |
| R-31 explainable decisions | PASS | File-by-file implementation and motion purpose documented; no unrelated visual redesign. |
