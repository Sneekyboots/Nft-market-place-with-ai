import type { Config } from "tailwindcss";
import { shadcnPreset } from "./src/lib/shadcn-preset";

const config: Config = {
  presets: [shadcnPreset],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;

export default config;

// extend: {
//       colors: {
//         primary: { ...indigo, DEFAULT: indigo[600] },
//         base: { ...indigo, DEFAULT: indigo[950] },
//         base_light: { ...indigo, DEFAULT: indigo[900] },
//         seconday: { ...slate, DEFAULT: slate[300] },
//         dark: { ...slate, DEFAULT: slate[950] },
//       },
// },
