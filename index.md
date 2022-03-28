# WebGL Game of Life

A component for displaying and playing [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using WebGL run on the host system's GPU.

Implemented in TypeScript using [Lit](https://lit.dev) for compilation to native, reusable WebComponents.

[A live demo of the application is available here](https://jmicheli.github.io/webgl-gol/app).

## Development

Ensure that you have Git and Node.js (version >= 11.0) installed as well as a package manager such as [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/). These instructions assume npm will be used.

Clone the repository:

`git clone https://github.com/JMicheli/webgl-gol`

Install dependencies:

`npm i`

Start development server:

`npm run dev`

## Controls

### Mouse

<kbd>LMB</kbd> - Place cells

<kbd>Ctrl</kbd> + <kbd>LMB</kbd> - Remove cells

### Keys

<kbd>space</kbd> - Pause/resume simulation

<kbd>s</kbd> - Step simulation (while paused)

<kbd>c</kbd> - Clear cells

<kbd>r</kbd> - Randomize cells

## Tooling and deployment

This project uses [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), and [Jekyll](https://jekyllrb.com/) in its build process. These have configuration files located in `tools/` to keep the root directory small.

The project is deployed as a GitHub page at [jmicheli.github.io/webgl-gol](https://jmicheli.github.io/webgl-gol) using GitHub Actions.

© Joseph W. Micheli 2021, all rights reserved. See `license.txt` for further information.
