# WebGL Game of Life

A component for displaying and playing [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using WebGL run on the host system's GPU.

Implemented in TypeScript using [Lit](https://lit.dev) for compilation to native, reusable WebComponents.

## Dev

Ensure that you have Git and Node.js (version >= 11.0) installed.

Note that this project uses [pnpm](https://pnpm.io/) as its package manager. The commands below will work equally well if `pnpm` is replaced with `npm`. For npm users, the `pnpm-lock.yaml` file can be safely deleted following dependency installation.

Clone the repository:

`git clone https://github.com/JMicheli/webgl-gol`

Install dependencies:

`pnpm i`

Start development server:

`pnpm run dev`

## Controls

### Mouse

<kbd>LMB</kbd> - Place cells

<kbd>Ctrl</kbd> + <kbd>LMB</kbd> - Remove cells

### Keys

<kbd>space</kbd> - Pause/resume simulation

<kbd>s</kbd> - Step simulation (while paused)

<kbd>c</kbd> - Clear cells

<kbd>r</kbd> - Randomize cells

© Joseph W. Micheli 2021, all rights reserved. See `license.txt` for further information.
