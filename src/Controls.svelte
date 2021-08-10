<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ReversedSlider from './ReversedSlider.svelte';

  const dispatch = createEventDispatcher();

  export let running: Boolean;
  export let animationSpeed: number;

  const toggleRunning = () => {
    running = !running;
  };

  const onClear = () => {
    running = false;
    dispatch('clear');
  };
</script>

<button on:click={() => dispatch('step')}>Step</button>
<div>
  <label for="speed_slider">Animation speed</label>
  <ReversedSlider id="speed_slider" min={10} max={500} step={10} bind:value={animationSpeed} />
</div>
<button on:click={toggleRunning}>{running ? 'Stop' : 'Run'}</button>
<button on:click={onClear}>Clear</button>

<style>
  button {
    width: 100%;
  }
</style>
