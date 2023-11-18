<script lang='ts'>
    export let toggleText: Function
    export let textActive: boolean
    export let string: string
</script>

<div class="flex flex-row rounded-md overflow-hidden">

    <button class="px-6 py-2 bg-black/30 rounded-md mx-1" on:click={() => toggleText()} disabled={!textActive} class:bg-indigo-700={!textActive} class:text-white={!textActive}>
        BACKGROUND
    </button>
    <button class="px-6 py-2 bg-black/30 rounded-md mx-1" on:click={() => toggleText()} disabled={textActive} class:bg-indigo-700={textActive} class:text-white={textActive}>
        TEXT
    </button>
    {#if textActive}
    <input type="text" placeholder="Default String" class="rounded-md shadow-md overflow-hidden p-2 ml-3 bg-black/30" bind:value={string} maxlength="20">
    {/if}
</div>