<script lang="ts">
  import ButtonGrid from './ButtonGrid.svelte';
  import Controls from './Controls.svelte';
  import SaveConfigs from './SaveConfigs.svelte';

  let buttonGrid: ButtonGrid;

  let running = false;
  let animationSpeed = 300;

  let interval: NodeJS.Timer;
  $: {
    clearInterval(interval);
    interval = setInterval(() => running && buttonGrid.progressGeneration(), animationSpeed);
  }
</script>

<main>
  <h1>Game of Life</h1>
  <div class="container">
    <ButtonGrid size={{ columns: 40, rows: 20 }} bind:this={buttonGrid} />
    <div>
      <Controls
        on:clear={buttonGrid.reset}
        on:step={buttonGrid.progressGeneration}
        bind:running
        bind:animationSpeed
      />
      <hr />
      <SaveConfigs
        on:change={(event) => buttonGrid.setState(event.detail.coords)}
        getConfig={() => buttonGrid.getState()}
      />
    </div>
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

  hr {
    width: 100%;
    height: 1px;
    border: none;
    background-color: black;
  }
</style>
