// Checks that every locale catalog has the same keys as the pt source of truth.
// Run with: npm run i18n:check
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(here, "..", "src", "messages");

const source = "pt";
const targets = ["en", "it"];

function load(locale) {
  return JSON.parse(readFileSync(join(messagesDir, `${locale}.json`), "utf8"));
}

function flatten(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flatten(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

const sourceKeys = new Set(flatten(load(source)));
let problems = 0;

for (const locale of targets) {
  const localeKeys = new Set(flatten(load(locale)));
  const missing = [...sourceKeys].filter((k) => !localeKeys.has(k));
  const extra = [...localeKeys].filter((k) => !sourceKeys.has(k));

  if (missing.length || extra.length) {
    problems += missing.length + extra.length;
    console.error(`\n${locale}.json is out of sync with ${source}.json`);
    if (missing.length) console.error(`  missing: ${missing.join(", ")}`);
    if (extra.length) console.error(`  extra:   ${extra.join(", ")}`);
  } else {
    console.log(`${locale}.json matches ${source}.json (${localeKeys.size} keys)`);
  }
}

if (problems > 0) {
  console.error(`\n${problems} key mismatch(es) found.`);
  process.exit(1);
}
console.log("\nAll locale catalogs are in sync.");
