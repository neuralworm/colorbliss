<script lang="ts">
    export let styleString: string = "";
    export let tailwindString: string = "";
</script>

{#if styleString !== ""}
    <div
        id="gradient-color-canvas"
        class="absolute shadow-md rounded-2xl top-0 bottom-0 left-0 right-0"
        style="background: {styleString}"
    />
{/if}
{#if styleString === ""}
    <div
        id="gradient-color-canvas"
        class="absolute shadow-md rounded-2xl top-0 bottom-0 left-0 right-0 {tailwindString}"
    />
{/if}
