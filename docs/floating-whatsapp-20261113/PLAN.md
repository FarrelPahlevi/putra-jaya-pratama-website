# Floating WhatsApp — local implementation

Scope: one reusable contact control, preserving both active routes, branding, content, consultation form and the existing motion system.

Design Read: Minimal Industrial, Barlow, pumpkin/charcoal/white. ENERGY 1 / RHYTHM 1 / MOTION 1 for this contact control. The circular mobile shape reduces obstruction; the desktop label makes the destination explicit. The offset shadow distinguishes a fixed action from document content. The glyph identifies the actual WhatsApp destination. No new focal spectacle or section animation is needed.

- Use the existing centralized WhatsApp helper and a real WhatsApp SVG glyph.
- Desktop/tablet: pumpkin pill with Barlow label. Mobile: 48px icon control, safe-area offsets.
- Reveal at 360px; hide below 250px. A 240ms opacity/8px entrance explains availability after the hero; no repeated decorative motion.
- Keep keyboard and screen-reader access before the scroll threshold. Keyboard focus reveals immediately. Native contact/footer links remain the no-JavaScript fallback.
- Suppress during any dialog/mobile menu. Protect text/controls beneath the fixed corner and suppress duplication while an existing WhatsApp contact link is visible.
- Use passive scroll thresholds, IntersectionObserver for collisions, scoped mutation/resize observations, and complete cleanup. No React updates per scroll pixel and no new dependencies.
- Verify fresh production output at all nine requested widths on both routes; intercept WhatsApp navigation, exercise overlays/focus/reduced motion/resize/cleanup and existing interactions. Capture before/after, run axe and production build.

Backup: `C:\Projects\PJP-Website-backups\floating-whatsapp-20261113-140553` (95 files, SHA-256 verified before edits).
