#!/usr/bin/env node
// setup symlinks

const { exec } = require('child_process');

// add scripts
const cliInput = [
  `npm pkg set 'scripts.lint'='eslint src/**/*{.ts,.tsx}'`,
  `npm pkg set 'scripts.lint:fix'='eslint --ignore-path .gitignore --fix src/**/*{.ts,.tsx}'`,
  `npm pkg set 'scripts.prepare'='husky install'`,
  `npm pkg set 'scripts.install:config'='node ./node_modules/eslint-config-webp-stencil/lib/generateLinks'`,
  `rm -rf ./.vscode && mkdir .vscode`,
  // symlinks would be nicer, but the bamboo build doesn't like them
  `cp ./node_modules/eslint-config-webp-stencil/.vscode/settings.json .vscode/settings.json`,
  `cp ./node_modules/eslint-config-webp-stencil/.editorconfig .editorconfig`,
  `cp ./node_modules/eslint-config-webp-stencil/.prettierrc.json .prettierrc.json`,
  `cp ./node_modules/eslint-config-webp-stencil/tsconfig.json tsconfig.json`,
  // `ln -sf ./node_modules/eslint-config-webp-stencil/.vscode/settings.json .vscode/settings.json`,
  // `ln -sf ./node_modules/eslint-config-webp-stencil/.editorconfig .editorconfig`,
  // `ln -sf ./node_modules/eslint-config-webp-stencil/.prettierrc.json .prettierrc.json`,
  // `ln -sf ./node_modules/eslint-config-webp-stencil/tsconfig.json tsconfig.json`,
  `npx husky install`,
  `npx husky-init && pnpm i`,
  `npx husky set ./.husky/pre-commit "npm run lint"`,
];

// convert array to string
const cliInputString = cliInput.join(' && ');

exec(cliInputString, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`Successfully installed symlinks!`);
});
