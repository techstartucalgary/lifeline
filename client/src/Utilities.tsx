import AspectRatio from "@tailwindcss/aspect-ratio";
import Forms from "@tailwindcss/forms";
import LineClamp from "@tailwindcss/line-clamp";
import Typography from "@tailwindcss/typography";
import { Config as TailwindConfig } from "tailwindcss";
import { extendTailwindMerge, getDefaultConfig, Config as TailwindMergeConfig, mergeConfigs } from "tailwind-merge";
import { ClassNameValue } from "tailwind-merge/dist/lib/tw-join";

const sys = {
  "primary": {
    100: "#FFFFFF",
    99: "#FFFBFF",
    95: "#FFECED",
    90: "#FFD9DD",
    80: "#FFB2BC",
    70: "#FF869B",
    60: "#FC527A",
    50: "#D93761",
    40: "#B7194A",
    30: "#910035",
    20: "#670023",
    10: "#400013",
    0: "#000000",
    DEFAULT: "#B7194A",
  },
  // "primary": "#B7194A",
  "on-primary": "#FFFFFF",
  "primary-container": "#FFD9DD",
  "on-primary-container": "#400013",
  "secondary": "#8B4483",
  "on-secondary": "#FFFFFF",
  "secondary-container": "#FFD7F4",
  "on-secondary-container": "#380037",
  // "tertiary": "#7B4998",
  "on-tertiary": "#FFFFFF",
  "tertiary-container": "#F5D9FF",
  "on-tertiary-container": "#30004B",
  "error": "#BA1A1A",
  "error-container": "#FFDAD6",
  "on-error": "#FFFFFF",
  "on-error-container": "#410002",
  "background": "#FFFBFF",
  "on-background": "#400013",
  "surface": "#FFFBFF",
  "on-surface": "#400013",
  "surface-variant": "#F3DDDF",
  "on-surface-variant": "#524345",
  "outline": "#847374",
  "outline-variant": "#CAC4D0",
  "inverse-on-surface": "#FFECED",
  "inverse-surface": "#670023",
  "surface-tint": "B7194A",
  "surface-tint-color": "#B7194A",
  "inverse-primary": "#FFB2BC",
};
const ref = {
  "primary": {
    100: "#FFFFFF",
    99: "#FFFBFF",
    95: "#FFECED",
    90: "#FFD9DD",
    80: "#FFB2BC",
    70: "#FF869B",
    60: "#FC527A",
    50: "#D93761",
    40: "#B7194A",
    30: "#910035",
    20: "#670023",
    10: "#400013",
    0: "#000000",
    DEFAULT: "#B7194A",
  },
  "secondary": {
    100: "#FFFFFF",
    99: "#FFFBFF",
    95: "#FFEBF7",
    90: "#FFD7F4",
    80: "#FFABF1",
    70: "#E190D5",
    60: "#C476B9",
    50: "#A75C9E",
    40: "#8B4483",
    30: "#702C6A",
    20: "#551352",
    10: "#380037",
    0: "#000000",
    DEFAULT: "#8B4483",
  },
  "tertiary": {
    100: "#FFFFFF",
    99: "#FFFBFF",
    95: "#FCEBFF",
    90: "#F5D9FF",
    80: "#E5B4FF",
    70: "#CD96EB",
    60: "#B07CCF",
    50: "#9562B3",
    40: "#7B4998",
    30: "#61317E",
    20: "#491866",
    10: "#30004B",
    0: "#000000",
    DEFAULT: "#7B4998",
  },
  "neutral": {
    100: "#FFFFFF",
    99: "#FFFBFF",
    95: "#FFECED",
    90: "#FFD9DD",
    80: "#FFB2BC",
    70: "#FF869B",
    60: "#FC527A",
    50: "#D93761",
    40: "#B7194A",
    30: "#910035",
    20: "#670023",
    10: "#400013",
    0: "#000000",
    DEFAULT: "#B7194A",
  },
  "neutral-variant": {
    100: "#FFFFFF",
    99: "#FFFBFF",
    95: "#FFECED",
    90: "#F3DDDF",
    80: "#D7C1C3",
    70: "#BAA6A8",
    60: "#9F8C8E",
    50: "#847374",
    40: "#6B5A5C",
    30: "#524345",
    20: "#3A2D2F",
    10: "#24181A",
    0: "#000000",
    DEFAULT: "#847374",
  },
};
const stateLayers = {
  "surface-tine": "#6750A4",
  "surface-tint-color": "#6750A4",
  "on-error-container": "#410E0B",
  "on-error": "#FFFFFF",
  "error-container": "#F9DEDC",
  "on-tertiary-container": "#31111D",
  "on-tertiary": "#FFFFFF",
  "tertiary-container": "#FFD8E4",
  "tertiary": "#7D5260",
  "error": "B3261E",
  "outline": "#79747E",
  "on-background": "#1C1B1F",
  "background": "#FFFBFE",
  "inverse-on-surface": "#F4EFF4",
  "inverse-surface": "#313033",
  "on-surface-variant": "#49454F",
  "on-surface": "#1C1B1F",
  "surface-variant": "#E7E0EC",
  "surface": "#FFFBFE",
  "on-secondary-container": "#1D192B",
  "on-secondary": "#FFFFFF",
  "secondary-container": "#E8DEF8",
  // "secondary": "#625B71",
  "inverse-primary": "#D0BCFF",
  "on-primary-container": "#21005D",
  "on-primary": "#FFFFFF",
  "primary-container": "#EADDFF",
  "primary": "#6750A4",
};

const projectConfig = {
  content: ["./**/src/**/*.{tsx, ts, jsx, js}"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Google Sans Text", "ui-sans-serif", "system-ui"],
        "display": ["Google Sans", "system-ui"],
        "body": ["Google Sans Text", "system-ui"],
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        16: "0.16",
      },
      colors: {
        ...sys,
        ...ref,
        "sys": sys,
        "ref": ref,
        "state-layers": stateLayers,
      },
      fontSize: {
        "1.5xl": "1.36rem",
      },
      transitionTimingFunction: {
        "standard": "cubic-bezier(0.2, 0.0, 0, 1.0)",
        "standard-decelerate": "cubic-bezier(0, 0, 0, 1)",
        "standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
        "emphasized": "cubic-bezier(0.2, 0.0, 0, 1.0)",
        "emphasized-decelerate": "cubic-bezier(0.05, 0.7, 0.1, 1.0)",
        "emphasized-accelerate": "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      scale: {
        "105": "1.05",
        "110": "1.1",
      }
    },
  },
  plugins: [AspectRatio, Forms, LineClamp, Typography],
};


const classnames = (...args: ClassNameValue[]) => {

  const extract = (config: TailwindConfig): TailwindMergeConfig => {
    const defaultConfig: TailwindMergeConfig = getDefaultConfig();
    const extractedConfig: TailwindMergeConfig = {
      cacheSize: 0,
      theme: {},
      classGroups: {},
      conflictingClassGroups: {}
    };

    if (!config.theme?.extend) return defaultConfig;

    for (const [key, values] of Object.entries(config.theme.extend)) {
      const keyz = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

      let vals = [];

      if (typeof values === "object") {
        vals = Object.keys(values);
      } else {
        vals = values;
      }

      extractedConfig.theme[key] = vals;

      if (defaultConfig.classGroups[keyz]) {
        const first = defaultConfig.classGroups[keyz][0];

        if (typeof first === "object") {
          const keyzz = Object.keys(first)[0];
          extractedConfig.classGroups[keyz] = [{ [keyzz]: [...first[keyzz], ...vals] }];
        } else if (typeof first === "string") {
          extractedConfig.classGroups[keyz] = [...defaultConfig.classGroups[keyz], ...vals];
        }
      }
    }

    return mergeConfigs(defaultConfig, extractedConfig);
  };

  const config = extract(projectConfig);
  const classnames = extendTailwindMerge(config);
  return classnames(...args);
};

export { classnames };

