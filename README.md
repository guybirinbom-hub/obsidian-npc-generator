# Fantasy NPC Generator (Obsidian plugin)

Roll richly detailed fantasy NPCs — or just names — for your tabletop world, right inside Obsidian.

Click the **🎲 dice** icon in the left ribbon and generate a full NPC for any of **38 ancestries** (Pathfinder-style: elves, dwarves, goblins, kitsune, centaurs, and many more, plus nine custom human kingdoms). Every NPC comes with:

- **A name** — shown in English with a **Hebrew (עברית) translation** underneath. Click either to copy it.
- **Age** — appropriate to the ancestry's real lifespan (a goblin is young at 29; an elf can be centuries old).
- **Height** — grounded in the ancestry's size.
- **Appearance** — ancestry-accurate skin/scales/fur/plumage, hair, eyes, and distinctive features.
- **Profession, background, a personality quirk, a catchphrase, a campfire topic, a childhood event, and family** — all in readable Hebrew.

You can also roll **by region**: define areas with per-ancestry population percentages and let the plugin pick who you run into.

Everything (all ~10,700 names and the NPC tables) ships **inside the plugin** — no extra setup, no internet needed.

## Install with BRAT (recommended)

[BRAT](https://github.com/TfTHacker/obsidian42-brat) installs and auto-updates plugins straight from GitHub.

1. In Obsidian, install and enable the **BRAT** community plugin.
2. Open the command palette → **BRAT: Add a beta plugin for testing**.
3. Paste this repository URL:
   ```
   https://github.com/guybirinbom-hub/obsidian-npc-generator
   ```
4. Choose the latest version and click **Add Plugin**.
5. Go to **Settings → Community plugins** and enable **Fantasy NPC Generator**.

BRAT will pull in new versions automatically as they're released.

## Manual install

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/guybirinbom-hub/obsidian-npc-generator/releases/latest).
2. Create a folder `<your vault>/.obsidian/plugins/fantasy-name-roller/` and drop the three files in.
3. Reload Obsidian and enable the plugin under **Settings → Community plugins**.

## Customizing

The plugin's settings tab lets you add or edit ancestries (gendered or unisex name lists, optional surnames) and define regions with population percentages. Your custom ancestries and regions are preserved across updates.

## For maintainers

The full name library lives in `data.json` and is embedded into `main.js` (BRAT only ships `main.js`/`manifest.json`/`styles.css`). After editing `data.json`, re-embed it:

```
node build-bundle.js          # refresh the embedded copy
node build-bundle.js --bump   # ...and bump dataVersion so existing installs pick up the new names
```

Then bump `version` in `manifest.json` and cut a new GitHub release with `main.js`, `manifest.json`, and `styles.css` attached.
