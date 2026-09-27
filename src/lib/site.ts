/** Site-wide constants. Everything here is public information from Camilo's GitHub profile. */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  // Set by Vercel at build and run time: the project's production domain.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Camilo Castro",
  url: resolveSiteUrl(),
  email: "cratoscamilo@gmail.com",
  github: { url: "https://github.com/CratosCamilo", handle: "@CratosCamilo" },
  x: { url: "https://x.com/CamiloCratos", handle: "@CamiloCratos" },
  instagram: { url: "https://www.instagram.com/camilocratoss/", handle: "@camilocratoss" },
  source: "https://github.com/CratosCamilo/camilocastro",
  university: "Universidad Pontificia Bolivariana",
  city: "Bucaramanga",
  country: "Colombia",
} as const;
