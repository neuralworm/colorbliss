<script lang="ts">
    import type { DefaultColor } from "$lib/data/DefaultColors";
    export let positionSteps: number[]
    export let onChange: Function
    export let color: DefaultColor
    export let position: number
</script>
<!-- @ts-ignore -->
<select id="position-select" name="" bind:value={position} class="p-2 px-4 rounded-lg bg-black/30 border-[1px] border-black/25 w-full" on:change={() => onChange()}>
    {#each positionSteps as step}
        <option value={step}>{step}%</option>
    {/each}
</select>