<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { configs } from './configs';
  import type { Config } from './configs';

  const dispatch = createEventDispatcher();

  let selectedConfig: Config;
  let storedConfigs = configs;

  let saveInputName = '';

  onMount(() => {
    const savedConfig = localStorage.getItem('configs');
    if (savedConfig) storedConfigs = JSON.parse(savedConfig);
  });

  export let getConfig: () => number[][];

  const saveConfig = () => {
    const currentConfig = {
      name: saveInputName,
      coords: getConfig(),
    };
    storedConfigs = [...storedConfigs, currentConfig];
    localStorage.setItem('configs', JSON.stringify(storedConfigs));
    saveInputName = '';
  };

  let saveButtonDisabled: boolean;
  $: saveButtonDisabled =
    !saveInputName || storedConfigs.some((config) => config.name === saveInputName);
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

  <details>
    <summary>Save current configuration</summary>
    <div>
      <input type="text" placeholder="Enter configuration name" bind:value={saveInputName} />
      <button on:click={saveConfig} disabled={saveButtonDisabled}>Save</button>
    </div>
  </details>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  label {
    text-align: left;
    padding: 0.8rem;
  }

  summary {
    margin-bottom: 10px;
  }
</style>
