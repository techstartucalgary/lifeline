// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
import projectConfig from "@tailwind.config";
import {
  extendTailwindMerge,
  getDefaultConfig,
  Config as TailwindMergeConfig,
  mergeConfigs,
} from "tailwind-merge";
import { ClassNameValue } from "tailwind-merge/dist/lib/tw-join";
import { Config as TailwindConfig } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";
import { createBreakpoint } from "react-use";

const classnames = (...args: ClassNameValue[]) => {
  const extract = (config: TailwindConfig): TailwindMergeConfig => {
    const defaultConfig: TailwindMergeConfig = getDefaultConfig();
    const extractedConfig: TailwindMergeConfig = {
      cacheSize: 0,
      theme: {},
      classGroups: {},
      conflictingClassGroups: {},
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
          extractedConfig.classGroups[keyz] = [
            { [keyzz]: [...first[keyzz], ...vals] },
          ];
        } else if (typeof first === "string") {
          extractedConfig.classGroups[keyz] = [
            ...defaultConfig.classGroups[keyz],
            ...vals,
          ];
        }
      }
    }

    return mergeConfigs(defaultConfig, extractedConfig);
  };

  const config = extract(projectConfig);
  const classnames = extendTailwindMerge(config);
  return classnames(...args);
};

const config = resolveConfig(projectConfig);

const screens = JSON.parse(JSON.stringify(config.theme?.screens));
for (const key in screens) {
  screens[key] = parseInt(screens[key]);
}

const useBreakpoint = createBreakpoint(screens);

export { classnames, config, useBreakpoint };
