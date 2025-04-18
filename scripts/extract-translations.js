const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const projectDir = process.cwd();
const outputDir = path.join(projectDir, "locales", "fr");
const outputFile = path.join(outputDir, "translation.json");

let translations = {};

/**
 * Récupère récursivement tous les fichiers .html dans un répertoire.
 * @param {string} dir - Chemin du répertoire à scanner.
 * @returns {string[]} Tableau des chemins complets des fichiers .html.
 */
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory() && file !== "node_modules") {
      results = results.concat(getHtmlFiles(filePath));
    } else if (stat && stat.isFile() && path.extname(file) === ".html") {
      results.push(filePath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(projectDir);
htmlFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const $ = cheerio.load(content);
  $("[data-i18n]").each((_, element) => {
    const key = $(element).attr("data-i18n");
    const value = $(element).text().trim();
    if (key && value && !translations.hasOwnProperty(key)) {
      translations[key] = value;
    }
  });
});

// Tri alphabétique des clés
const sortedKeys = Object.keys(translations).sort();
let sortedTranslations = {};
sortedKeys.forEach((key) => {
  sortedTranslations[key] = translations[key];
});

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Écrire l'objet JSON dans le fichier avec une indentation de 2 espaces
fs.writeFileSync(
  outputFile,
  JSON.stringify(sortedTranslations, null, 2),
  "utf8"
);

console.log(`Traductions extraites et enregistrées dans ${outputFile}`);
