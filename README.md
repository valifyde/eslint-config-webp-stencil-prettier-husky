<h1 align="center">
  <img width="500" src="assets/banner.png" alt="banner" />
</h1>

# ESLint + Prettier + Husky Config for Stencil

> Config for [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/), aimed to be used in Stencil projects, tested with vscode.

## Overview

This configuration is using [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) ESLint config and Prettier integration via the ESLint [plugin](https://github.com/prettier/eslint-plugin-prettier). Additionally, a few default rules are overriden to provide a more relaxed development experience in Stencil.js applications out of the box.

Install the package (and RTFM ⬇️!):

```shell
$ npm install -D eslint-config-webp-stencil-prettier-husky
```

This will install the shared config files into the node_modules folder. But we have to do some more steps to get it working.

## Prerequisites

Since we want to manage the configuration in a central location in our multi-repos, we have to copy some files in the project directory. (symlinks doesn't work -> bamboo build will fail). Unfortunately, this does not work with PNPM and a postinstall script within this repo `(package.json > scripts.postinstall)` and problems with `Bamboo builds` (missing symlinks), but this is not tragic, because we need this only at the first use.

For the **very first** setup, run the following command to setup the config files:

```shell
# shell
$ npm pkg set 'scripts.install:config'='node ./node_modules/eslint-config-webp-stencil-prettier-husky/lib/generateLinks'
```

Alternative, add this line to your scripts in the **package.json**:

```jsx
// package.json
{
  "scripts": {
    "install:config": "node ./node_modules/eslint-config-webp-stencil-prettier-husky/lib/generateLinks"
  }
}
```

And run:

```shell
$ npm run install:config
```

The node script is copying all the config files now. pnpm can be regularly used.
Symlinks would be nicer, but Bamboo builds will fail.

### Script for deployment

```jsx
// package.json
{
  "scripts": {
    "build": "export NODE_ENV=production && npm run lint &&  stencil build --docs",
  }
}
```

## Usage

To start using this shared config in vscode, add `eslint-config-webp-stencil-prettier-husky` (or just `webp-stencil-prettier-husky`) to your `package.json`:

```jsx
// package.json
{
  "eslintConfig": {
    "extends": ["webp-stencil-prettier-husky"]
  }
}
```

## Prettier

This config supports Prettier integration out of the box. Rules that may conflict with ESLint are disabled via recommended configuration in [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier).

## Husky

The hooks should be installed automatically. Otherwise, run:

```shell
# shell
npx husky install
npx husky-init && npm i
npx husky set ./.husky/pre-commit "npm run lint"
```

Further reading for git tower users: [Getting Started with Git Hooks and Husky](https://www.git-tower.com/blog/git-hooks-husky/)

```shell
# If you want to use NVM:
# https://github.com/typicode/husky/issues/390#issuecomment-545855628
touch ~/.huskyrc

# ~/.huskyrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Known issues / things to improve / side notes

- Dont change the `compilerOptions.lib` and `.target` in your `./tsconfig.json` to `es2022`. This will break the stencil component(s).

- If linting does not work after installation, simply restart vscode.

- If you want to use pnpm instead of npm, run the following command after installation:
  `npm i && rm -rf node_modules && rm package-lock.json && pnpm i`

- Update local linting settings in vscode, after a new version of this package is released:
  `npm run install:config`

- 2do: Better handling with symlinks and bamboo builds

## License

Licensed under MIT License.

## NPM updates

1. Add a new version number to `package.json`, otherwise you will get an 403 error
2. Commit changes
3. run `npm publish`
