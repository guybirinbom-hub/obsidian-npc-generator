/*
 * build-bundle.js — embed data.json into main.js so the plugin is self-contained.
 *
 * Why: BRAT (and direct release installs) only copy main.js, manifest.json and styles.css —
 * never data.json. So the full ancestry/name library must live INSIDE main.js. This script
 * reads data.json and rewrites the marked  // @bundle ... // @endbundle  region in main.js.
 *
 * Usage:
 *   node build-bundle.js            # refresh embedded data, keep current dataVersion
 *   node build-bundle.js --bump     # also increment dataVersion (do this when names changed,
 *                                    # so existing installs re-seed the new content on next load)
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(dir, 'data.json'), 'utf8'));
let main = fs.readFileSync(path.join(dir, 'main.js'), 'utf8');

const markerRe = /\/\* @bundle \*\/[\s\S]*?\/\* @endbundle \*\//;
if (!markerRe.test(main)) {
  console.error('ERROR: could not find the /* @bundle */ ... /* @endbundle */ markers in main.js');
  process.exit(1);
}

// Preserve (or bump) the existing dataVersion.
const curMatch = main.match(/"dataVersion"\s*:\s*(\d+)/);
let dataVersion = curMatch ? parseInt(curMatch[1], 10) : 1;
if (process.argv.includes('--bump')) dataVersion += 1;

const bundle = { dataVersion: dataVersion, ancestries: data.ancestries, areas: data.areas || [] };
const json = JSON.stringify(bundle);
main = main.replace(markerRe, '/* @bundle */ ' + json + ' /* @endbundle */');
fs.writeFileSync(path.join(dir, 'main.js'), main, 'utf8');

let names = 0;
data.ancestries.forEach((a) => ['firstNames', 'maleFirstNames', 'femaleFirstNames', 'lastNames'].forEach((k) => { if (Array.isArray(a[k])) names += a[k].length; }));
console.log('Embedded ' + data.ancestries.length + ' ancestries / ' + names + ' names into main.js  (dataVersion ' + dataVersion + ', ' + (json.length / 1024).toFixed(0) + ' KB).');
