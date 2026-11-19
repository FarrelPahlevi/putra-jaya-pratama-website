# PJP isolated final-sections prototype plan

Goal: build the researched three-section sequence and two meaningful alternatives without changing approved homepage components or production configuration.

Architecture: a separate Vite HTML entry mounts a prototype React tree. Shared `InquiryModal`, `FloatingWhatsApp` and `SiteFooter` supply real business functions. All new styling is scoped to the prototype. A separate build script passes isolated Vite build options and writes `preview/final-sections/`; normal build/configuration remains unchanged. The static review bundle also copies the approved built homepage/gallery for working comparison links.

Stack: existing React 19, TypeScript, Vite, Motion and Lucide; no added packages.

## Tasks

- [x] Inventory checkpoint evidence, mark limited observations, complete research register and 12-reference shortlist.
- [x] Compare three directions and recommend Industrial Editorial.
- [x] Back up relevant approved files and record hashes before adding prototype source.
- [x] Create `prototype-final.html`, `src/prototypes/final-sections/` and an isolated build script. Keep App/homepage/footer/header sources unchanged.
- [x] Implement four real local photos, three compositions, native lightbox, normal-flow consultation, existing footer and form integration.
- [x] Verify all concepts at 390, 768, 1024, 1440 and 1920; test links, keyboard, dialog focus, reduced motion, no overflow, no console errors, responsive image loading and floating-control clearance.
- [x] Capture approved version and prototype, create comparison sheets, run normal build and isolated build, record limitations and preview instructions.

Review focus: truthful archive labels; mobile crops; native horizontal scrolling without page overflow; every modal closes and returns focus; no hidden text when animation fails; shared WhatsApp/Instagram remain correct; static homepage source hashes unchanged.
