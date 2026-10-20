# Testimonial Drafts — Awaiting Client Approval

**Status: DRAFT — NOT APPROVED.** These wordings were drafted for client review. They are not client statements, have not been approved for publication, and must not be added to `src/data/testimonials.ts` (the production source) until every checklist item below is confirmed per client.

A local-only preview (enabled with `TESTIMONIAL_PREVIEW=1` before `npm run build && npm run start`) renders these drafts with a visible **DRAFT — NOT APPROVED** label. The preview cannot render without that environment variable, so production builds never contain it.

---

## Draft 1 — Cozee Care

> "Sahad took the time to understand our needs and helped translate our requirements into a clear, professional online experience. He paid attention to the details and worked through feedback as the project developed."

## Draft 2 — Violina Pflegedienst

> "Sahad helped us present our services through a professional online presence. He approached our requirements thoughtfully and paid attention to the details throughout the website project."

## Draft 3 — Taqwa Group

> "Sahad took a practical, structured approach to our website project. He worked to reflect our requirements clearly and paid attention to the details during implementation."

---

## Approval checklist (per client)

- [ ] **Exact wording** confirmed by the client (edits incorporated verbatim).
- [ ] **Approved public name** — the person's name as they want it shown.
- [ ] **Approved role & organization** — only if the client explicitly opts in.
- [ ] **Explicit publication permission** — written (email is fine), covering named public attribution on the portfolio.
- [ ] **Corrections** — any factual or tone corrections before publication.
- [ ] **Language scope** — which locales the client approves (English source; translations are derived drafts for their review if requested).

## On approval — how to publish

1. Add a fully permissioned entry to `src/data/testimonials.ts` (`permission.written: true`, `obtainedVia`, `obtainedOn`, `displayLocales`).
2. The homepage TrustSection and About TestimonialSection render it automatically — no code change.
3. Remove the approved client from this draft file (or mark it published) so drafts and live content never diverge.

## Contact routes for the ask

Cozee Care and Violina Pflegedienst contact paths are on their live sites; Taqwa Group was an employment relationship — the ask should go through the known contact there (owner action).
