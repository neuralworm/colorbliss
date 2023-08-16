<script lang="ts">
    import {defaultColors, defaultSteps} from '../../../data/DefaultColors'
    export let currentColor: string
    export let currentStep: number

</script>
<div class="flex flex-row items-center rounded-xl">
    <select class="p-2 rounded-lg" name="" id="" bind:value={currentColor} >
        {#each defaultColors as defColor}
            <option value="{defColor}">{defColor}</option>
        {/each}
    </select>
    <span class="inline-block rounded-md p-2">
        -
    </span>
    <select class="p-2 rounded-lg" name="" id="" bind:value={currentStep}>
        {#each defaultSteps as defStep}
            <option value="{defStep}">{defStep}</option>
        {/each}
    </select>
    <div class="color-indicator w-8 h-8 rounded-md ml-4 bg-{currentColor}-{currentStep} shadow-md">

    </div>
</div>

    <style>
    select{
        background-color: white;
        border-color: rgba(0,0,0,.14);
        border-width: 2px;
    }
</style>