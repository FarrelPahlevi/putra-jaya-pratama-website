---
{
  "name": "Putra Jaya Pratama / Minimal Industrial",
  "description": "The existing PJP system: Barlow typography, pumpkin accents, warm paper, charcoal panels, and construction photography.",
  "colors": {
    "mi-paper": "#f5f3ef",
    "mi-ink": "#131313",
    "primary-action": "#b55514",
    "primary-action-hover": "#944009",
    "dark-action": "#151513",
    "dark-action-hover": "#36312c",
    "accent-text": "#ac5319",
    "accent-on-dark": "#f0ac6a",
    "pumpkin": "#c96a1b",
    "pumpkin-light": "#e58a2a",
    "dark-panel": "#141a1c",
    "white": "#ffffff",
    "muted-text": "#64615c",
    "gallery-divider": "#d5d1c9",
    "filter-selected": "#a94f13",
    "filter-surface": "#faf9f6",
    "filter-text": "#4e4b47",
    "modal-paper": "#f5f3ee",
    "modal-ink": "#0c0d0e",
    "field-border": "#a59b8e",
    "error": "#9c2020"
  },
  "typography": {
    "display": { "fontFamily": "Barlow Semi Condensed, Arial Narrow, Arial, sans-serif", "fontWeight": 800, "lineHeight": 1.05, "letterSpacing": "-0.025em" },
    "headline": { "fontFamily": "Barlow Semi Condensed, Arial Narrow, Arial, sans-serif", "fontWeight": 700, "lineHeight": 1.08, "letterSpacing": "-0.025em" },
    "title": { "fontFamily": "Barlow, Arial, sans-serif", "fontWeight": 700, "lineHeight": 1.22, "letterSpacing": "-0.01em" },
    "body": { "fontFamily": "Barlow, Arial, sans-serif", "fontSize": "16px", "fontWeight": 400, "lineHeight": 1.6 },
    "label": { "fontFamily": "Barlow, Arial, sans-serif", "fontSize": "11px", "fontWeight": 700, "lineHeight": 1.45, "letterSpacing": "0.12em" },
    "button": { "fontFamily": "Barlow, Arial, sans-serif", "fontSize": "14px", "fontWeight": 700, "lineHeight": 1.3, "letterSpacing": "0.005em" }
  },
  "rounded": { "square": "0px", "control": "4px", "field": "14px", "dialog": "28px", "filter": "99px" },
  "spacing": { "control-gap": "20px", "control-padding-y": "15px", "control-padding-x": "24px", "heading-gap": "17px", "heading-bottom": "46px", "field-padding": "14px", "dialog-padding": "28px" },
  "components": {
    "button-primary": { "backgroundColor": "{colors.primary-action}", "textColor": "{colors.white}", "typography": "{typography.button}", "rounded": "{rounded.control}", "padding": "15px 24px" },
    "button-primary-hover": { "backgroundColor": "{colors.primary-action-hover}" },
    "button-outline": { "backgroundColor": "#ffffff0a", "textColor": "{colors.white}", "typography": "{typography.button}", "rounded": "{rounded.control}", "padding": "15px 24px" },
    "button-outline-hover": { "backgroundColor": "{colors.white}", "textColor": "#171512" },
    "button-dark": { "backgroundColor": "{colors.dark-action}", "textColor": "{colors.white}", "typography": "{typography.button}", "rounded": "{rounded.control}", "padding": "15px 24px" },
    "button-dark-hover": { "backgroundColor": "{colors.dark-action-hover}" },
    "field": { "backgroundColor": "{colors.white}", "textColor": "{colors.modal-ink}", "rounded": "{rounded.field}", "height": "48px", "padding": "0px 14px" },
    "filter": { "backgroundColor": "{colors.filter-surface}", "textColor": "{colors.filter-text}", "rounded": "{rounded.filter}", "padding": "12px 19px" },
    "filter-selected": { "backgroundColor": "{colors.filter-selected}", "textColor": "{colors.white}" },
    "service-card": { "backgroundColor": "{colors.mi-paper}", "textColor": "{colors.mi-ink}", "typography": "{typography.title}", "rounded": "{rounded.square}" },
    "navigation": { "textColor": "#e6e4e1", "height": "88px" },
    "section-heading": { "textColor": "#1b1c1c", "typography": "{typography.headline}" },
    "inquiry-dialog": { "backgroundColor": "{colors.modal-paper}", "textColor": "{colors.modal-ink}", "rounded": "{rounded.dialog}", "padding": "28px" }
  }
}
---

# Design System: Putra Jaya Pratama

## Overview

**Creative North Star: "Minimal Industrial"**

This is the existing direction named in the project records. Large construction photographs, tightly set Barlow headings, warm paper surfaces, and pumpkin accents establish its character. Open spacing and flat sections leave room for the work itself; charcoal panels provide contrast and separate major content areas.

The interface pairs a compact, fixed navigation bar with generous content sections. Service illustrations stand freely on the page, while gallery photographs fill square-edged frames. The consultation dialog retains a softer, rounded form language inherited from the earlier implementation.

**Key Characteristics:**

- Construction photography and custom isometric service illustrations.
- Barlow Semi Condensed headlines paired with Barlow body text and controls.
- Pumpkin accents on warm paper and dark industrial surfaces.
- Flat, open sections with thin rules; depth concentrated in navigation and overlays.
- Different shapes for page actions, gallery filters, and consultation fields.

**Recorded scope and evidence (11 November 2026):** This record covers the active homepage, `/galeri-proyek`, shared navigation/footer, and consultation dialog. Sources are `src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/minimal-industrial.css`, `src/project-gallery.css`, their mounted components, and the 10 November typography/gallery records. Earlier unmounted components and their styles remain outside the current system. The frontmatter is valid YAML expressed with JSON syntax; its values are the reusable token record. The sidecar adds preview components, motion, breakpoints, and generated tonal ramps. Ramps are preview aids; frontmatter colors specify the implemented palette.

**Visual verification:** The 11 November responsive audit uses fresh Chrome/Playwright captures at 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920px on both active routes. Current evidence is under `docs/ui-ux-20261111/after/`; the corresponding `before/` folder preserves the previous render and measured defects. The audit report records the automated accessibility checks, interaction results and limitations. Earlier `preview/` captures remain historical references.

## Colors

The palette combines warm, material-like neutrals with a family of pumpkin and burnt-orange accents. Exact assignments are in the frontmatter; related shades serve different backgrounds and control states.

### Primary

- **Burnt Pumpkin Action** (`primary-action`, `primary-action-hover`): solid page actions and their darker hover state.
- **Clay Text Accent** (`accent-text`): emphasized words in section headings on light surfaces.
- **Warm Apricot Highlight** (`accent-on-dark`): emphasized homepage hero words on photography. Other dark sections use closely related local shades recorded in their source.
- **Pumpkin** (`pumpkin`): the inherited selection color and consultation field focus border.
- **Pumpkin Light** (`pumpkin-light`): the global keyboard focus ring. Gallery controls have their own warmer focus shade in the component stylesheet.
- **Deep Pumpkin Selection** (`filter-selected`): selected gallery filter, paired with white text.

### Neutral

- **Warm Paper** (`mi-paper`): the main page surface, including the open service grid and gallery.
- **Near-black Ink** (`mi-ink`): default page text; **Muted Stone** (`muted-text`) supports section descriptions.
- **Industrial Charcoal** (`dark-panel`): the story panel. The footer, gallery callout, and lightbox use nearby dark surface shades.
- **Dark Action** (`dark-action`, `dark-action-hover`): the solid action on the orange contact section.
- **White** (`white`): reversed text, outlines, and input surfaces.
- **Stone Divider** (`gallery-divider`): gallery section rules. **Filter Paper** (`filter-surface`) and **Filter Ink** (`filter-text`) define unselected filters.
- **Dialog Paper** (`modal-paper`), **Dialog Ink** (`modal-ink`), and **Field Border** (`field-border`): the consultation form's inherited surface family.

### Feedback

- **Error Red** (`error`): required-field markers and validation feedback in the consultation dialog.

## Typography

**Display Font:** Barlow Semi Condensed, with Arial Narrow, Arial, and sans-serif fallbacks.

**Body Font:** Barlow, with Arial and sans-serif fallbacks. Google Fonts supplies body weights 400 through 800 and condensed heading weights 600 through 800.

The condensed family gives large headings a compact, industrial character. Barlow keeps descriptions, service names, navigation, and forms consistent and readable. There is no distinct mono or serif role in the active system. Emphasized words use upright condensed type with an orange color change; the earlier Georgia italic treatment was removed.

### Hierarchy

| Role | Observed sizing and treatment | Use |
| --- | --- | --- |
| Display | Homepage `clamp(3.5rem,7vw,6.75rem)`, weight 800, line height 1.05, tracking -0.025em; mobile `clamp(2.625rem,11.6vw,4rem)` | Main photographic headline |
| Gallery display | `clamp(3.75rem,6.5vw,6.75rem)`, weight 800, line height 1.025, tracking -0.026em | Gallery headline |
| Headline | `clamp(2.5rem,5.2vw,5rem)`, weight 700, line height 1.08; mobile `clamp(2.5rem,9.4vw,3.75rem)` | Repeated section headings |
| Title | Service titles `clamp(23px,2vw,28px)`, weight 700, line height 1.22 | Illustration labels; process titles use a related smaller scale |
| Body | Page base 16px/1.6; section descriptions generally 15-17px with line height 1.68-1.73 | Supporting copy |
| Label | 11px, weight 700, uppercase, tracking 0.12em | Section kickers and compact metadata |
| Button | 14px, weight 700, line height 1.3 | Page actions |

Hero copy is constrained to 670px; centered section descriptions to 580px. Forms retain 16px input text on mobile. Display/headline/title tokens omit a fixed font size because their source uses responsive sizing; the expressions above preserve that behavior.

**The Upright Emphasis Rule.** Heading emphasis stays upright in the condensed family, with color carrying the distinction.

## Layout

The main container is centered, with a maximum width of 1270px. Shared `--mi-gutter: clamp(20px,5.1vw,80px)` controls symmetric side insets; up to 360px it becomes 16px. Stacked story copy uses the same gutter. Regular sections use `clamp(72px,8vw,120px)` vertical padding and 72px up to 650px. The homepage hero has `min-height:100svh` and grows when its content needs more height. Spacing tokens name component measurements rather than forcing every section to a fixed screen height.

| Surface/pattern | Desktop | Responsive behavior |
| --- | --- | --- |
| Shared header | Fixed, 88px tall | 76px up to 950px; 72px up to 650px; full-height scrollable mobile menu replaces desktop links up to 950px |
| Service grid | Three columns, 1160px maximum width | Two columns up to 1099px; one column up to 519px; illustrations cap at 340px, then 304px |
| Story panel | Equal photo/copy columns | Stacks up to 950px; copy and photo padding/heights adapt again up to 650px |
| Process | Four columns with dividing rules | Two columns up to 950px; one column up to 650px |
| Gallery grid | Three columns, 260px automatic rows, 13px gap; featured images span two columns | Two columns/265px rows up to 900px; one column with automatic rows, 4:3 frames and 12px gaps up to 620px |
| Gallery filters | Wrapping group with result count beside it | Stack with the count up to 620px; filters reflow without horizontal scrolling |
| Footer | Three columns with a wider identity block | Two link columns up to 650px; identity spans both |

The homepage hero centers its content; the gallery hero aligns its content to the container's left edge. Headings, images, dividers, and full-width tonal panels provide grouping. At widths up to 470px, homepage hero actions stack and cap at 320px. Anchor scrolling uses the shared header height plus 24px; section navigation moves keyboard focus to the destination.

## Elevation & Depth

Page content is predominantly flat. Photographic overlays and alternating paper/charcoal surfaces carry depth. The homepage hero uses dark gradients for text legibility, with restrained text shadows. Navigation gains a shadow after scrolling, and native dialogs separate themselves through a dark backdrop and a lifted surface. Only the lightbox backdrop uses blur (7px).

### Shadow Vocabulary

- **Scrolled navigation:** `0 10px 28px #0003`.
- **Open mobile menu:** a full-height opaque surface without a shadow.
- **Gallery lightbox:** `0 22px 90px #0009`.
- **Homepage headline legibility:** `0 4px 22px rgba(0,0,0,.24)`.
- **Consultation dialog:** `0 24px 80px #0005`.

**The Flat Content Rule.** Service items and gallery image frames remain flat; navigation state and overlays carry structural shadows.

## Shapes

Page photographs and service layouts have square edges. Main page actions have lightly softened corners (4px). Gallery filters use capsule corners (99px). The consultation dialog keeps its existing larger corners (28px), fields (14px), and fully rounded action buttons. The square brand mark contains a condensed P and a pumpkin dot; the stacked wordmark remains part of that lockup.

Thin rules distinguish process steps, gallery controls, story facts, and footer metadata. The service grid has no enclosing card border or raised panel. These contextual differences are part of the implemented system.

## Components

### Buttons

Compact, firm actions with clear contrast. Main page actions have a 52px minimum height, desktop padding (15px 24px), a thin border, and the control radius. Up to 650px, they use a 50px minimum height and padding (13px 18px); up to 360px, horizontal padding reduces to 15px.

- **Primary:** Burnt Pumpkin Action with white text; darkens on hover.
- **Outline:** near-transparent white fill and a light border over photography; becomes white with dark text on hover.
- **Dark:** Dark Action with white text on the orange contact panel; lightens slightly on hover.
- **Text action:** an unboxed label with an adjacent directional icon; underlines on hover.
- **Motion/focus:** filled and outlined page actions rise 2px on hover. Background changes take 200ms and movement 250ms, using the shared `cubic-bezier(.22,1,.36,1)` easing. The global focus ring is 3px with a 4px offset.

### Gallery filters

Capsule controls combine a service label with a small, tabular count. Unselected filters use Filter Paper, Filter Ink, and a stone border. Selection uses Deep Pumpkin Selection with white text and `aria-pressed`. Filters have a 44px minimum height, padding (12px 19px), and background/color/border transitions (200ms). Hover shifts the border and text toward pumpkin. Gallery-specific focus uses a 3px warm-orange ring and a 3px offset.

### Service cards and photograph frames

Service items are centered, non-interactive articles. Their existing custom isometric illustrations use a 5:4 canvas, `object-fit: contain`, and an unframed warm-paper setting, with the service title below. Use the actual artwork under `public/assets/services/`.

Gallery cards are image-only, square-edged buttons, with captions and titles available through accessible names and the lightbox. Images fill their frames using `object-fit: cover`. Pointer hover enlarges an image to 1.035; keyboard focus adds an inset ring and subtle shade. Image motion takes 550ms, and the shade takes 250ms. Homepage hero photography has a separate subdued saturation/contrast treatment; gallery thumbnails retain their natural colors.

Project photographs have 400px and, where the original is wider, 700px WebP variants. `srcset` describes the real file widths; the source originals remain available to the lightbox. Homepage hero sizing accounts for the landscape image covering a tall mobile frame with `max(100vw,134svh)`, so a small thumbnail is not stretched to the full screen height. Original project images are not upscaled during asset generation.

### Inputs and consultation dialog

White fields use the Field Border, field radius, 48px single-line minimum height, and 16px Barlow text. Standard horizontal padding is 14px. Every field has an associated visible label. Keyboard focus uses a 3px burnt-pumpkin ring and 3px offset. Validation focuses the invalid field and connects its inline error with aria-describedby. Error copy uses Error Red on a pale red panel. The read-only summary has a visible label and warm tinted background.

The native dialog is a rounded, warm-paper panel capped at 640px, with 24–36px padding (20px horizontal on small phones), 28px corners (24px up to 430px), and a scrollable height constrained by 100dvh. Its heading uses the condensed family and its actions retain their capsule shape. It closes through its close button, backdrop, cancellation action, or Escape. The form prepares a copyable summary, announces clipboard feedback, and offers manual selection on clipboard failure. Async copy disables the relevant actions. Focus remains in the dialog and returns to its trigger when closed; browser tests verify this behavior.

### Navigation

The homepage header starts with a dark transparent gradient over photography and becomes nearly opaque after 48px of scrolling. The gallery header starts solid. Desktop links use Barlow (14px, weight 600), warm off-white text, and a thin pumpkin underline for hover/current location or current page. Up to 1120px, links tighten to 13px and smaller gaps; every target remains at least 44px wide. Mobile navigation uses full-width 64px ruled rows, current-location semantics and a full-width consultation action. It locks background scrolling and focus, closes on Escape, link selection or a desktop resize, and preserves the destination focus after section navigation.

### Section headings and rules

A compact uppercase kicker precedes a condensed headline, followed by a restrained description. Centered homepage headings and split gallery headings share the type relationship. Number labels, short horizontal accent lines, and thin neutral rules recur as lightweight orientation cues.

### Gallery lightbox

A native dialog places a contained photograph inside a charcoal frame with title, service, caption, and previous/next controls. Its maximum width is 1120px with viewport gutters, and its height follows the dynamic viewport. Escape, arrow keys, backdrop closing, all photo controls and focus return are browser-tested. Controls remain 44px on mobile and metadata stacks below the photo. Horizontal touch advances the photo; vertical gestures and canceled touches do not. Gesture evidence uses synthesized Chrome touch input rather than physical devices.

### Motion and reduced motion

The main easing is `cubic-bezier(.22,1,.36,1)`. Each hero enters once through a visible 12px translation lasting 650ms. Hover/press and navigation feedback remain restrained; no autoplay or scroll-reveal effects are added. Reduced-motion queries remove nonessential transitions/animations, and scripted section scrolling honors the preference. The consultation dialog has its own reduced-motion coverage outside the page wrapper.

## Do's and Don'ts

### Do:

- **Do** use Barlow Semi Condensed for major headings and Barlow for body text, service names, controls, and fields.
- **Do** keep heading emphasis upright and use the contextual pumpkin accent.
- **Do** preserve the container, responsive grid changes, and context-specific corner treatments recorded here.
- **Do** use the existing construction photographs and custom service illustrations with their current roles and aspect ratios.
- **Do** keep service articles unframed and gallery thumbnails image-only, with metadata in accessible names and the viewer.
- **Do** preserve visible keyboard focus and the existing reduced-motion handling when extending a component.

### Don't:

- **Don't** restore earlier Bricolage/Georgia typography or the unmounted pill-navigation system as the active default.
- **Don't** add lifted card surfaces to the open service grid or overlay captions onto the current image-only gallery cards.
- **Don't** apply consultation-dialog rounding to page photographs or main page actions.
- **Don't** treat generated sidecar tonal ramps as additional implemented palette tokens.
- **Don't** use this visual record as evidence that current interactions or accessibility have passed a fresh browser audit.
