<script lang="ts">
    import {
        defaultColors,
        defaultSteps,
        specialColors,
    } from "../../../data/DefaultColors";
    export let currentColor: string;
    export let currentStep: number;
</script>

<div class="flex flex-row items-center rounded-xl">
    <select class="p-2 rounded-lg bg-black/30" name="" id="" bind:value={currentColor}>
        <!-- NORMAL COLORS -->
        {#each defaultColors as defColor}
            <option value={defColor}>{defColor}</option>
        {/each}
        <!-- SPECIAL COLORS -->
        {#each specialColors as specialColor}
            <option value={specialColor}>{specialColor}</option>
        {/each}
    </select>
    <span class="inline-block rounded-md p-2" />
    <select class="p-2 rounded-lg bg-black/30" name="" id="" bind:value={currentStep}>
        <!-- COLOR RANGES -->
        {#if !specialColors.includes(currentColor)}
            {#each defaultSteps as defStep}
                <option value={defStep}>{defStep}</option>
            {/each}
        {/if}
    </select>
    <div
        class="color-indicator w-8 h-8 rounded-md ml-4 bg-{currentColor}-{currentStep} shadow-md"
    />
</div>

<style>
    select {
        border-color: rgba(0, 0, 0, 0.14);
        border-width: 2px;
    }
</style>
