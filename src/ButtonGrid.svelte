<script lang="ts">
  import { coords2list, getNextGeneration } from './game-of-life';
  import type { GridSize } from './game-of-life';

  export let size: GridSize;

  let cellsAlive: boolean[] = Array(size.columns * size.rows).fill(false);

  export const progressGeneration = () => {
    cellsAlive = getNextGeneration(cellsAlive, size);
  };

  export const reset = () => {
    cellsAlive = Array(size.columns * size.rows).fill(false);
  };

  export const setState = (coords: number[][]) => (cellsAlive = coords2list(coords, size));
</script>

<div style="--numCols: {size.columns}; --numRows: {size.rows}">
  {#each cellsAlive as cell, cellNum (cellNum)}
    <button
      class:alive={cell}
      on:click={() => {
        cell = !cell;
      }}
    />
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(var(--numCols), 1fr);
    gap: 2px;
    margin: 1rem;
    background-color: darkgray;
    padding: 0.5rem;
    border-radius: 2px;
  }

  button {
    --squareSize: min(calc(65vw / var(--numCols)), calc(65vh / var(--numRows)));
    width: var(--squareSize);
    height: var(--squareSize);
    transition: all 0.1s ease;
    margin: 0;
    padding: 0;
  }

  .alive {
    background-color: indianred;
  }
</style>
