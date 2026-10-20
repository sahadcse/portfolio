/**
 * V2-12 image pipeline (plan §8.5 images, §15.2 V2-12).
 *
 * Converts the raw PNG screenshots in public/images/projects/ into:
 *   <name>.webp      — 1600px max width, original ratio (case-study figures)
 *   <name>-card.webp — uniform 16:10 crop at 1600px wide (index/homepage cards)
 *   <name>-og.jpg    — 1200x630 JPEG social preview (WebP is unreliable in
 *                      some social scrapers, so OG entries use this)
 *
 * Also processes public/ceo_image.png (owner-supplied portrait) into
 * public/images/sahad-portrait.webp at 960px width.
 *
 * Sources stay untouched in git history; run from the repo root:
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/** Source dir for raw captures (argv[1]); outputs always land in public/. */
const SRC_DIR = process.argv[2] ?? "public/images/projects";
const OUT_DIR = "public/images/projects";
const MAX_BYTES = 300 * 1024;

const files = readdirSync(SRC_DIR).filter((f) => f.endsWith(".png"));
let failures = 0;

for (const file of files) {
  const name = file.replace(/\.png$/, "");
  const src = join(SRC_DIR, file);
  const outputs = [
    { out: join(OUT_DIR, `${name}.webp`), w: 1600, h: null, fmt: "webp", q: 82 },
    // Card/OG crops anchor to the left edge — these screenshots carry their
    // logo + headline on the left, which a centre crop clips ("mpowering Lives")
    { out: join(OUT_DIR, `${name}-card.webp`), w: 1600, h: 1000, fmt: "webp", q: 80, pos: "left" },
    { out: join(OUT_DIR, `${name}-og.jpg`), w: 1200, h: 630, fmt: "jpeg", q: 80, pos: "left" },
  ];

  for (const { out, w, h, fmt, q, pos } of outputs) {
    let pipeline = sharp(src).resize({
      width: w,
      ...(h ? { height: h, fit: "cover", position: pos ?? "centre" } : {}),
      withoutEnlargement: true,
    });
    const buffer =
      fmt === "webp"
        ? await pipeline.webp({ quality: q }).toBuffer()
        : await pipeline.flatten({ background: "#ffffff" }).jpeg({ quality: q }).toBuffer();
    const ok = buffer.length <= MAX_BYTES;
    if (!ok) failures += 1;
    console.log(`${ok ? "ok " : "OVER"} ${out} ${Math.round(buffer.length / 1024)} KB`);
    await sharp(buffer).toFile(out);
  }
}

// Owner-supplied portrait → hero-portrait WebP
const portraitSrc = "public/ceo_image.png";
if (statSync(portraitSrc).isFile()) {
  const out = "public/images/sahad-portrait.webp";
  const buffer = await sharp(portraitSrc)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
  const ok = buffer.length <= MAX_BYTES;
  if (!ok) failures += 1;
  console.log(`${ok ? "ok " : "OVER"} ${out} ${Math.round(buffer.length / 1024)} KB`);
  await sharp(buffer).toFile(out);
}

console.log(failures === 0 ? "\nAll outputs within the 300 KB budget." : `\n${failures} output(s) over budget!`);
process.exit(failures === 0 ? 0 : 1);
