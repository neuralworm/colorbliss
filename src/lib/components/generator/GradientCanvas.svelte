<script lang="ts">
    export let styleString: string = "";
    export let tailwindString: string = "";
    export let textMode: boolean
    export let textString: string
</script>

{#if styleString !== ""}
    <div
        id="gradient-color-canvas"
        class="absolute shadow-md rounded-2xl top-0 bottom-0 left-0 right-0"
        style="background: {styleString};"
    />
{/if}
{#if styleString === ""}
    <div
        id="gradient-color-canvas"
        class="absolute border-2 shadow-md rounded-2xl top-0 bottom-0 left-0 right-0 {tailwindString} flex items-center justify-center text-3xl md:text-4xl lg:text-6xl uppercase font-bold"
        class:bg-clip-text={textMode}
        class:text-transparent={textMode}

    >
        {#if textMode}
            <p class="text-center">
                {textString}
            </p>
        {/if}
    </div>
{/if}
