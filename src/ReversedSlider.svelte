<script lang="ts">
  export let id: string;
  export let min: number;
  export let max: number;
  export let step: number;

  export let value: number;
  let sliderValue = max - value + step;
  $: value = max + step - sliderValue;
</script>

<input type="range" {id} {min} {max} {step} bind:value={sliderValue} />
