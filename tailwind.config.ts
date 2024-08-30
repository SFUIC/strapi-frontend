import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customGray: "#d3d3d3",
        sfuLightRed: "#CC0633",
        sfuDarkRed: "#A6192E",
      },
      spacing: {
        "41": "11rem",
        "80": "20rem",
        "100": "25rem",
      },
    },
  },
  plugins: [],
  safelist: [
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "gap-4",
    "gap-6",
    // Add other classes you use dynamically
  ],
};
export default config;
