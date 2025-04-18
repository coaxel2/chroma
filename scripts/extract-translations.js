// scripts/extract-all-text.js
const fs = require("fs");
const path = require("path");

const files = [
  "actualites.html",
  "apropos.html",
  "articles.html",
  "compte.html",
  "contact.html",
  "evenements.html",
  "faq.html",
  "index.html",
];

// Helpers ----------------------------------------------------
const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "") // supprime scripts
    .replace(/<style[\s\S]*?<\/style>/gi, "") // supprime styles
    .replace(/<!--[\s\S]*?-->/g, "") // supprime commentaires
    .replace(/<\/?[^>]+>/g, " ") // enlève toutes balises
    .replace(/\s+/g, " ") // espaces multiples -> simple
    .trim();

let texts = new Set();

// Parcours des fichiers -------------------------------------
files.forEach((file) => {
  const filePath = path.join(__dirname, "..", file);
  if (!fs.existsSync(filePath)) {
    console.warn(`⛔  Fichier introuvable : ${file}`);
    return;
  }
  const html = fs.readFileSync(filePath, "utf8");
  const content = stripTags(html);
  content.split(" ").forEach((word) => {
    const t = word.trim();
    if (t.length > 1) texts.add(t);
  });
});

// Tri et sortie ---------------------------------------------
const sorted = Array.from(texts).sort((a, b) => a.localeCompare(b, "fr"));
const outDir = path.join(__dirname, "..", "json");
const outFile = path.join(outDir, "fr.json");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(sorted, null, 2), "utf8");

console.log(
  `✅  ${sorted.length} chaînes exportées vers ${path.relative(
    process.cwd(),
    outFile
  )}`
);
