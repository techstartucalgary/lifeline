# Contributing to the frontend

:+1::tada: Thanks for taking the time to contribute! :+1::tada:

The following is a set of guidelines/instructions for contributing to Lifeline frontend code.


### Running :airplane:
To run the frontend locally, use the following commands:
```bash
cd client
npm install
npm run
```

### Lint your code 
This project uses ESLint and Prettier to lint and format code. This can be done in two ways.

1. Linting in VS Code
    Install the following extensions:

    > Name: ESLint   
    > Id: dbaeumer.vscode-eslint     
    > Description: Integrates ESLint JavaScript into VS Code.     
    > Version: 2.2.6    
    > Publisher: Microsoft      
    > VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

    In a file, press F1 and select the command “ESLint: Fix all auto-fixable problems”
    
    If there are any code smells, ESLint will highlight these in VS Code. Hovering over them will show the problem and allow you to one-click fix them.

2. Linting in Terminal
    Use the following command:
    ```bash
    npm run lint
    ```

    This will also fix all the auto-fixable problems. If there are any code smells, it outputs in the terminal.


## Implementing from Design Prototype


### Color name translation

<img width="600" alt="Screenshot 2022-12-08 at 2 37 32 PM" src="https://user-images.githubusercontent.com/20573623/206572750-cf2218f8-5f7f-44b7-8aad-7366edac537b.png">

The codebase and prototype are sharing the same color palette. The colors are defined in `tailwind.config.cjs`.
They are originally named according to the **Material Design 3** standard but adopt the **Tailwind** naming convention here.

For example, the colour `M3/sys/light/primary` will simply be used as `primary`  ***or***  `sys-primary` in the code as the `className` for an element:
```html
<h1 className="text-primary">Lifeline</h1>
```


General rules:
1. The `M3` prefix is ignored to prevent redundancy as it is the prefix for every color.
2. The `light` is also ignored as the M3 system includes both `dark` and `light` colour schemes but this project only uses `light`.
3. For the rest of the name, each `/` is replaced with a `-`. 

Special cases:
1. If a color name ends with `opacity-**`, apply Tailwind's [color opacity rule](https://tailwindcss.com/docs/text-color#changing-the-opacity). For example, `M3/sys/light/on-primary/opacity-0.12` will become `bg-sys-on-primary/12`.
2. When a color name contains `sys` or `ref`, it is optional to include `sys` or `ref` in the classname. Eg for `M3/ref/secondary/secondary60`, both `bg-ref-secondary-60` and `bg-secondary-60` work.

A few more examples:
- Text color `M3/sys/light/on-primary` will become `text-sys-on-primary` or `text-on-primary`
- Background `M3/state-layers/light/on-surface/opacity-0.12` will become `bg-state-layers-on-surface/12`
- Background `M3/state-layers/light/primary/opacity-0.08` will become `bg-state-layers-primary/8`
- Border `M3/sys/light/secondary-container` will become `border-sys-secondary-container` or `border-secondary-container`

> **Note**: If you find any color in the color palette that's not defined in `tailwind.config.js`, feel free to add it to the file.


### React Hooks

This library imports [React Hooks](https://github.com/streamich/react-use) for more convenient frontend development. You can find so many useful hooks in this library, so please utilize these hooks over native js approaches. 
