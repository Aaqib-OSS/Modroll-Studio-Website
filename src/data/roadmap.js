// status must be 'released', 'ongoing', 'next', 'planned', 'paused' or 'abandoned' — anything else renders unstyled;
// Roadmap.jsx maps each to its label
const roadmap = [
  {
    title: `Critfall`,
    status: `released`,
    note: `d20 attack rolls, dice damage, crits and fumbles for Minecraft 1.21.1 — out now on Modrinth and CurseForge.`,
  },
  {
    title: `Store launch`,
    status: `released`,
    note: `Critfall is live on CurseForge and Modrinth.`,
  },
  {
    title: `Initiative`,
    status: `released`,
    note: `Dice driven turn order for Minecraft combat, out now on CurseForge. 0.3.0 adds mob turns. Feature requests are welcome.`,
  },
  {
    title: `Checks`,
    status: `released`,
    note: `Ability scores, skills, saving throws, character creation and levels 1–20, out now on CurseForge.`,
  },
  {
    title: `Headless Horseman`,
    status: `released`,
    note: `A Halloween boss: a headless rider and his Gallows Steed, at midnight through October — out now on CurseForge and Modrinth.`,
  },
  {
    title: `Depths`,
    status: `next`,
    note: `Party runs through generated dungeons in the dark, with traps, ambushes, secret doors and a boss at the bottom, all rolled through Critfall. Waiting on its art.`,
  },
  {
    title: `Monsters`,
    status: `next`,
    note: `Goblins, hobgoblins, dire wolves and the bugbear, each with their own tactics and every roll through Critfall. Waiting on its art.`,
  },
  {
    title: `Spells`,
    status: `planned`,
    note: `Tabletop spellcasting for Checks' caster classes: spell slots, preparing spells, a spell wheel and about 110 SRD spells in the first release.`,
  },
  {
    title: `Treasury`,
    status: `planned`,
    note: `Tabletop items for Minecraft: a bag of holding, potions, weapons and cursed items.`,
  },
];

export default roadmap;
