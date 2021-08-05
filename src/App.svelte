<script lang="ts">
  import ButtonGrid from './ButtonGrid.svelte';
  import Controls from './Controls.svelte';

  let buttonGrid: ButtonGrid;

  let running = false;

  setInterval(() => running && buttonGrid.progressGeneration(), 300);
</script>

<main>
  <h1>Game of Life</h1>
  <div class="container">
    <ButtonGrid size={20} bind:this={buttonGrid} />
    <Controls
      on:clear={buttonGrid.reset}
      on:step={buttonGrid.progressGeneration}
      on:run={() => {
        running = !running;
      }}
    />
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .container {
    display: flex;
    margin: 0;
    padding: 0;
  }
</style>
