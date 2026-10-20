# Testimonial Drafts — ✅ APPROVED & PUBLISHED (2026-10-20)

All three clients approved the draft wordings via the owner. The quotes now live in the production source `src/data/testimonials.ts` with organization-level attribution (no individual names or roles were approved, so none are displayed). The homepage TrustSection renders them; the About page can adopt the same data at any time.

## Published quotes (exact approved wording)

1. **Cozee Care** — "Sahad took the time to understand our needs and helped translate our requirements into a clear, professional online experience. He paid attention to the details and worked through feedback as the project developed."
2. **Violina Pflegedienst** — "Sahad helped us present our services through a professional online presence. He approached our requirements thoughtfully and paid attention to the details throughout the website project."
3. **Taqwa Group** — "Sahad took a practical, structured approach to our website project. He worked to reflect our requirements clearly and paid attention to the details during implementation."

Attribution shown: organization name only. No ratings, no individual names, no invented dates.

## Approval checklist — completed

- [x] Exact wording confirmed (owner-confirmed on behalf of the clients).
- [x] Public attribution: organization names only; individual names/roles withheld.
- [x] Publication permission: confirmed by the owner (2026-10).
- [x] Corrections: none required.
- [x] Language scope: English source quotes displayed verbatim in all locales (UI text localizes around them).

## Draft-preview mechanism

The `TESTIMONIAL_PREVIEW=1` preview gate remains in place for FUTURE drafts; with approved entries now present in `testimonials.ts`, the approved quotes take precedence and the preview drafts no longer render (by design — approved data always wins).

## Future testimonials

Follow the original checklist flow: draft → client confirmation → add a fully permissioned entry to `src/data/testimonials.ts`. The section renders new entries automatically.
