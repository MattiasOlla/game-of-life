<script lang="ts">
  import { getNextGeneration } from './game-of-life';
  import type { GridSize } from './game-of-life';

  export let size: GridSize;

  let cellsAlive: boolean[] = Array(size.columns * size.rows).fill(false);

  export const progressGeneration = () => {
    cellsAlive = getNextGeneration(cellsAlive, size);
  };

  export const reset = () => {
    cellsAlive = Array(size.columns * size.rows).fill(false);
  };
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
    grid-template-columns: repeat(var(--size), 1fr);
    gap: 2px;
    margin: 1rem;
    width: min(70vw, 70vh);
    height: min(70vw, 70vh);
    background-color: darkgray;
    padding: 0.5rem;
    border-radius: 2px;
  }

  button {
    width: 100%;
    height: 100%;
    transition: all 0.1s ease;
  }

  .alive {
    background-color: indianred;
  }
</style>
