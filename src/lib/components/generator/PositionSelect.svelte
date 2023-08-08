<script lang="ts">
    import type { DefaultColor } from "$lib/data/DefaultColors";
    export let positionSteps: number[]
    export let onChange: Function
    export let color: DefaultColor
</script>
<select id="position-select" name="" on:change={(e) => onChange(e)} class="p-2 px-4 rounded-md bg-transparent border-[1px] border-black/25">
    {#each positionSteps as step}
        <option value="step">{step}%</option>
    {/each}
</select>