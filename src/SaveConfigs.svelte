<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { configs } from './configs';
  import type { Config } from './configs';

  const dispatch = createEventDispatcher();

  let selectedConfig: Config;
  let storedConfigs = configs;

  let showSaveInput = false;
  let saveInputName = '';

  onMount(() => {
    const savedConfig = localStorage.getItem('configs');
    if (savedConfig) storedConfigs = JSON.parse(savedConfig);
  });

  // Save to localstorage every time the storedConfigs is updated
  $: localStorage.setItem('configs', JSON.stringify(storedConfigs));
</script>

<div>
  <label for="stored_configs">Select a configuration:</label>
  <div class="row">
    <select id="stored_configs" bind:value={selectedConfig}>
      {#each storedConfigs as config, i (i)}
        <option value={config}>{config.name}</option>
      {/each}
    </select>
    <button on:click={() => dispatch('change', selectedConfig)}>Load config</button>
  </div>

  <button
    on:click={() => {
      showSaveInput = true;
      saveInputName = '';
    }}>Save current configuration</button
  >
  <div class="card" class:hidden={!showSaveInput}>
    <input type="text" placeholder="Enter configuration name" bind:value={saveInputName} />
    <div class="row">
      <button>Save</button>
      <button on:click={() => (showSaveInput = false)}>Cancel</button>
    </div>
  </div>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }

  .hidden {
    display: none !important;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 0.8rem;
    overflow: hidden;
  }

  .card > input {
    width: 90%;
  }

  label {
    text-align: left;
  }
</style>
