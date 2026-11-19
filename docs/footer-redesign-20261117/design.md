# PJP footer redesign

Service business: road construction. Primary action: consult through the existing WhatsApp destination.

## Directions

1. **Roadside editorial (selected):** oversized contact typography, a firm orange action, an open information grid and the company name as a full-width closing composition. Strong scale contrast gives PJP a memorable close while keeping practical information easy to scan.
2. **Engineering ledger:** compact ruled rows, smaller CTA, denser service index. Efficient, but less memorable and too similar in density to the current footer.

Selection is the designer's call, as requested in the brief. Inherit PJP's Barlow / Barlow Semi Condensed typography, orange and charcoal. No change to the rest of the website's identity.

## Design contract

- Exact supplied headline, supporting copy and WhatsApp action.
- Desktop: large left headline, right copy/action; four unequal information columns; one-line oversized company name; compact utility row.
- Tablet: stacked CTA and a two-by-two information grid. Mobile: compact CTA, full-width action and identity/contact, paired navigation/services, two-line company name.
- Retain the existing logo lockup, factual short description, NAV_LINKS, all six SERVICES_LIST entries and CONTACT/getWhatsAppUrl. Ignore placeholder COMPANY_INFO data.
- Services seed the existing inquiry dialog. Home anchors and gallery navigation retain destinations. Back-to-top stays on the current page and moves keyboard focus to top content.
- Existing motion engine reveals the headline and wordmark once. CSS arrow and underline hovers. Static content remains visible, reduced motion rests. No magnetic movement or new dependency.
- Small geometric road-line detail above the closing name; no images, gradients, invented business claims or ornamental clutter.
- A reserved right edge forms a road shoulder for the persistent WhatsApp shortcut. It compacts to its existing recognizable icon while the footer is in view, preserving visibility, destination, focus and overlay behavior. Full label returns outside the footer. An IntersectionObserver belongs to the footer and disconnects on unmount. Server HTML defaults to compact so disabled JavaScript or missing IntersectionObserver remains clear of content.

## Research

- https://www.footer.design/styles/large-type and https://www.footer.design/styles/dark: oversized names as the closing composition, contrast and information density.
- https://21st.dev/community/components/explore/footer-design and https://21st.dev/@efferd/components/minimal-footer: real links, useful grouping, responsive order and keyboard focus. No copied source or assets.
- https://www.awwwards.com/inspiration/: requested source returned 404 in Chrome. Used https://www.awwwards.com/elements/?text=footer instead (HTTP 200), studying editorial scale, restrained contact compositions and brand anchoring. Browser captures and status records are saved under references/.

## Scope and verification

Only src/SiteFooter.tsx and new src/site-footer.css are product changes. Backup and source hashes predate edits. No Git repository is present. No push or deployment.

Build/SSR prerender; both routes at 320/360/390/430/768/1024/1280/1440/1920px; overflow, tap size, floating contact clearance, font rendering, keyboard/focus, inquiry selection, intercepted WhatsApp destination, back-to-top, reduced motion, no-JavaScript HTML and footer axe audit. Save before/after screenshots and JSON results. No lint script exists.

## Implementation plan

- [x] Inspect source, data, motion, references and constraints; select direction.
- [x] Back up SiteFooter.tsx and record all source hashes.
- [x] Capture before views and establish failure of new CTA assertion.
- [x] Replace shared footer and add a scoped stylesheet.
- [x] Run responsive/interaction checks; visually review captures and fix findings.
- [x] Build and verify production routes, reduced motion, keyboard and static fallback.
- [x] Compare source hashes and deliver screenshots/report.

Ruling: the user delegated design selection and implementation, so no extra approval gate. Whole-page skill recipes are excluded by the footer-only scope. Real verified contact data takes precedence over placeholder-contact defaults.

Review finding: bottom padding alone did not prevent intermediate-scroll overlaps. A targeted sweep reproduced this on both routes at all sampled widths. Compact the persistent shortcut and reserve its right edge rather than hiding it. The additional footer-only composition inset is intentional utility space.

Design read: ENERGY 3 (large construction-company type), RHYTHM 3 (invitation / compact index / oversized signature), MOTION 1 (brief once-only entrances, small hover responses). The existing Barlow voice and restrained road detail carry identity. Direction arrows communicate outbound consultation and upward navigation; the small uppercase group labels support scanning.
