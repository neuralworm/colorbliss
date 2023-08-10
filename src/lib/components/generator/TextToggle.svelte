<script lang='ts'>
    export let toggleText: Function
    export let textActive: boolean
    export let string: string
</script>

<div class="flex flex-row">

    <button class="p-2 border-2 rounded-md" on:click={() => toggleText()} disabled={!textActive} class:bg-slate-300={textActive} class:text-white={textActive}>
        BACKGROUND
    </button>
    <button class="p-2 border-2 rounded-md" on:click={() => toggleText()} disabled={textActive} class:bg-slate-300={!textActive} class:text-white={!textActive}>
        TEXT
    </button>
    {#if textActive}
    <input type="text" placeholder="Default String" class="border-2 p-2 ml-3" bind:value={string} maxlength="20">
    {/if}
</div>