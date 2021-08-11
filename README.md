# Game of Life

This is a pretty basic implementation of [John Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), a mathematical game played on a grid.
Each grid cell can be alive or dead, and for each generation a live cell can stay alive or die, and a dead cell can come alive, based on it's number of nearest neighbors (measured using [Chebyshev distance](https://en.wikipedia.org/wiki/Chebyshev_distance)).

A hosted version is available at [https://mattiasolla.github.io/game-of-life](https://mattiasolla.github.io/game-of-life).

These rules are parametrized in the constant `RULES` in [game-of-life.ts](src/game-of-life.ts), and are currently the standard configuration:

1. A live cell with fewer than 2 neighbors will die of loneliness.
2. A live cell with more than 3 neighbors will die of overpopulation.
3. A dead cell will come alive if it has exactly 3 neighbors.

## Implementation

This project is implemented as a pure frontend application using [Svelte](https://svelte.dev/) and [Typescript](https://www.typescriptlang.org/).
