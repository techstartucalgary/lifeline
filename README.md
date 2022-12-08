<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/70448914/202774114-d8db6cf5-6e94-467b-a0a3-833bfec376be.png">
  <img alt="lifeline logo" src="https://user-images.githubusercontent.com/70448914/202774123-f98c4b27-3452-483c-9750-50766867dcfa.png">
</picture>

## A much needed lifeline to help students never miss a deadline!

<div style="height: 4rem;"></div>

# Frontend Development

## Running
Run the following command to run frontend locally:
```
npm install
npm run
```

## Linting
Make sure to lint your code before commiting. We are using ESLint and Prettier. There are two ways to lint your code.

### 1. Linting in VS Code
Install the following extensions:

> Name: ESLint   
> Id: dbaeumer.vscode-eslint     
> Description: Integrates ESLint JavaScript into VS Code.     
> Version: 2.2.6    
> Publisher: Microsoft      
> VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

On a file, press F1 and select the command to run "ESLint: Fix all auto-fixable problems".

If there are any code smells, ESLint plugin will also highlight it for you in VS Code. You can hover on it and it will tell you what the problem is, and one-click fix it.

### 2. Linting in Terminal
Run the following command to lint your code:
```
npm run lint
```

It will also fix all the auto-fixable problems. If there are any code smells, it will tell you in the terminal.

## Implementing from Design Prototype

### Translating colors

The codebase and prototype are sharing the same color palette.The colors are defined in `tailwind.config.js`.
The naming are following the Material Design 3 standard but adopting Tailwind naming convention.

Example of constructing classname: When seeing color `M3/sys/light/primary` for background for an element, in implementation, one should put `bg-primary` or `bg-sys-primary` in `className` field of the element (both works). 

Rules:
1. We ignore `M3` prefix as everything in color palette is `M3` to reduce repetition. 
2. And we ignore `light` as there are `light` and `dark` theme in the original M3 system, but we only use `light`.
3. For the rest of the name, replace every `/` with `-`.
4. When a color name ends with `opacity-**`, apply Tailwind's [color opacity rule](https://tailwindcss.com/docs/text-color#changing-the-opacity). For example, `M3/sys/light/on-primary/opacity-0.12` -> `bg-sys-on-primary/12`.

More examples:
Text color `M3/sys/light/on-primary` -> `text-sys-on-primary`
Background `M3/state-layers/light/on-surface/opacity-0.12` -> `bg-state-layers-on-surface/12`
Background `M3/state-layers/light/primary/opacity-0.08` -> `bg-state-layers-primary/8`
Border `M3/sys/light/secondary-container` -> `border-sys-secondary-container`

(If you find any color that's not defined in `tailwind.config.js`, feel free to add it to the file)
