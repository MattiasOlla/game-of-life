<script lang="ts">
  import { getNextGeneration } from './game-of-life';

  export let size: number = 10;

  let cellsAlive: boolean[] = Array(size ** 2).fill(false);

  export const progressGeneration = () => {
    cellsAlive = getNextGeneration(cellsAlive);
  };

  export const reset = () => {
    cellsAlive = Array(size ** 2).fill(false);
  };
</script>

<div style="--size: {size}">
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
  }

  .alive {
    background-color: indianred;
  }
</style>
