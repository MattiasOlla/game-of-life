<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { configs } from './configs';
  import type { Config } from './configs';

  const dispatch = createEventDispatcher();

  let selectedConfig: Config | null = null;
  let storedConfigs = configs;

  onMount(() => {
    const savedConfig = localStorage.getItem('configs');
    if (savedConfig) storedConfigs = JSON.parse(savedConfig);
  });

  // Save to localstorage every time the storedConfigs is updated
  $: localStorage.setItem('configs', JSON.stringify(storedConfigs));
  $: console.log(storedConfigs);
</script>

<main>
  <label for="stored_configs">Select a configuration:</label>
  <div>
    <select id="stored_configs" bind:value={selectedConfig}>
      {#each storedConfigs as config, i (i)}
        <option value={config}>{config.name}</option>
      {/each}
    </select>
    <button on:click={() => dispatch('change', selectedConfig)}>Load config</button>
  </div>
  <button on:click>Save current configuration</button>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }

  main > div {
    flex-direction: row;
  }

  label {
    text-align: left;
  }
</style>
