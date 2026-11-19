// The home page's head is the one in index.html.
export function modHead(mod) {
  return {
    title: `${mod.fullName ?? mod.name} — Modroll Studio`,
    description: mod.description[0],
    canonical: `https://modroll.studio/mods/${mod.slug}`,
  };
}

export const notFoundTitle = 'Page not found — Modroll Studio';
