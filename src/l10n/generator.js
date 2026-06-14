import * as fs from "fs";
import * as path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTranslationFiles(inputFile, outputDir) {
  const raw = await fs.promises.readFile(inputFile, "utf-8");
  const items = JSON.parse(raw);

  const translationsByLang = {};

  for (const item of items) {
    for (const [lang, value] of Object.entries(item.translation)) {
      if (!translationsByLang[lang]) {
        translationsByLang[lang] = {};
      }

      translationsByLang[lang][item.code] = value;
    }
  }

  await fs.promises.mkdir(outputDir, { recursive: true });

  for (const [lang, translations] of Object.entries(translationsByLang)) {
    const filePath = path.join(outputDir, `${lang}.json`);

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(translations, null, 2),
      "utf-8",
    );

    console.log(`Generated ${filePath}`);
  }
}

// Usage
generateTranslationFiles(
  path.join(__dirname, "generator.json"),
  __dirname,
).catch(console.error);
