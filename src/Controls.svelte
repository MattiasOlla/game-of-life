<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let running = false;

  const toggleRunning = () => {
    running = !running;
  };

  const onClear = () => {
    running = false;
    dispatch('clear');
  };
</script>

<main>
  <button on:click={() => dispatch('step')}>Step</button>
  <button on:click={toggleRunning}>{running ? 'Stop' : 'Run'}</button>
  <button on:click={onClear}>Clear</button>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }

  button {
    width: 100%;
  }
</style>
