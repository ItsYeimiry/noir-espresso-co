// Generates the demo imagery in public/images/. Every file is a drop-in slot:
// replace a JPG with a real photo of the same name and the site picks it up.
// Run: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const SIZES = {
  hero: [2400, 1500],
  tile: [1600, 1200],
  tall: [1400, 1750],
  square: [1200, 1200],
};

// [path, size, bgTop, bgBottom, lights[], seed]
const warm = ["#d9a066", "#f0cfa4", "#8a5530"];
const slots = [
  ["hero/hero.jpg", "hero", "#0e0907", "#2b1a10", ["#d08a4a", "#f2cfa0", "#6b3f22"], 11],
  ["tiles/coffee.jpg", "tile", "#120b08", "#33200f", warm, 21],
  ["tiles/pastry.jpg", "tile", "#160c0e", "#3a1f22", ["#e9a3a6", "#f6d5c8", "#8c4a4f"], 22],
  ["tiles/reserve.jpg", "tile", "#0b0d0c", "#1f2a25", ["#7fb9a3", "#d7e6dc", "#35584a"], 23],
  ["method/origin.jpg", "tall", "#0c0f0b", "#27311d", ["#9db46a", "#dfe6b8", "#4a5a2c"], 31],
  ["method/roast.jpg", "tall", "#100806", "#3a190c", ["#d4682c", "#f4b27a", "#6a2a10"], 32],
  ["method/extraction.jpg", "tall", "#0b0a0a", "#2a2220", ["#e0b27a", "#f6e7d2", "#5b4130"], 33],
  ["method/service.jpg", "tall", "#0d0b0a", "#2c2018", ["#c99a62", "#f1dcc0", "#6e4a2a"], 34],
  ["visit/space.jpg", "hero", "#0b0908", "#251a14", ["#c08a55", "#ecd2b0", "#5e3d25"], 41],
];

const coffee = [
  ["geisha", "#e6c46a"], ["siphon", "#9ab7c9"], ["nitro", "#d9c7a8"], ["flatwhite", "#efdcc3"],
  ["macchiato", "#b3693a"], ["tonic", "#9fc9b4"], ["rose", "#e4a0ac"], ["affogato", "#f1e3c2"],
  ["mocha", "#8a4f33"], ["olla", "#c98a4b"],
];
coffee.forEach(([k, c], i) =>
  slots.push([`coffee/${String(i + 1).padStart(2, "0")}-${k}.jpg`, "tall", "#0f0a08", "#2a1a12", [c, "#f2dcc0", "#6b4026"], 100 + i]),
);

const pastry = [
  ["tiramisu", "#d8b55a"], ["opera", "#6b3b24"], ["matcha", "#9cc07a"], ["macaron", "#e58aa0"],
  ["basque", "#d89a4a"], ["volcan", "#5a2a1c"], ["eclair", "#9bbf6a"], ["yuzu", "#ecd25a"],
  ["praline", "#a0623a"], ["pannacotta", "#e2a62a"],
];
pastry.forEach(([k, c], i) =>
  slots.push([`pastry/${String(i + 1).padStart(2, "0")}-${k}.jpg`, "square", "#100b0a", "#2a1c18", [c, "#f5e2cf", "#704433"], 200 + i]),
);

function svg(w, h, top, bottom, lights, seed) {
  const r = rng(seed);
  const big = lights
    .map((c, i) => {
      const cx = (0.2 + r() * 0.6) * w;
      const cy = (0.15 + r() * 0.5) * h;
      const rad = (0.22 + r() * 0.22) * Math.max(w, h);
      return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="${c}" opacity="${(i === 0 ? 0.42 : 0.2).toFixed(2)}"/>`;
    })
    .join("");
  let bokeh = "";
  for (let i = 0; i < 22; i++) {
    const c = lights[Math.floor(r() * lights.length)];
    const rad = (0.012 + r() * 0.05) * Math.max(w, h);
    bokeh += `<circle cx="${(r() * w).toFixed(0)}" cy="${(r() * h * 0.7).toFixed(0)}" r="${rad.toFixed(0)}" fill="${c}" opacity="${(0.1 + r() * 0.28).toFixed(2)}"/>`;
  }
  const blurBig = Math.round(Math.max(w, h) * 0.07);
  const blurSmall = Math.round(Math.max(w, h) * 0.006);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient>
    <linearGradient id="table" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lights[2]}" stop-opacity="0"/><stop offset="1" stop-color="${lights[2]}" stop-opacity="0.5"/></linearGradient>
    <radialGradient id="vig" cx="0.5" cy="0.45" r="0.8"><stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.62"/></radialGradient>
    <filter id="b1" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${blurBig}"/></filter>
    <filter id="b2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="${blurSmall}"/></filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${seed}"/><feColorMatrix type="saturate" values="0"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <g filter="url(#b1)">${big}</g>
  <rect y="${(h * 0.6).toFixed(0)}" width="${w}" height="${(h * 0.4).toFixed(0)}" fill="url(#table)"/>
  <g filter="url(#b2)">${bokeh}</g>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.1"/>
</svg>`;
}

for (const [path, size, top, bottom, lights, seed] of slots) {
  const [w, h] = SIZES[size];
  const out = join(root, path);
  await mkdir(dirname(out), { recursive: true });
  await sharp(Buffer.from(svg(w, h, top, bottom, lights, seed)))
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out);
}
console.log(`Generated ${slots.length} demo images in public/images/`);
