<script lang="ts">
    import Background from "$lib/components/Background.svelte";
    import DefaultColorGenerator from "$lib/components/DefaultColorGenerator.svelte";
    import Generator from "$lib/components/CustomColorGenerator.svelte";
    import ModeToggle from "$lib/components/ModeToggle.svelte";
    import Examples from "$lib/components/layout/Examples.svelte";
    import CustomColorGenerator from "$lib/components/CustomColorGenerator.svelte";
    let mode: string = "default";
</script>

<svelte:head>
    <!-- <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0"> -->
</svelte:head>
<main>
    <section
        id="splash"
        class="p-4 text-center flex flex-col justify-center py-16 relative backdrop-blur-3xl"
    >
        <div id="splash-content" class="mx-auto p-8">
            <h4 class="tracking-tight font-semibold text-xs md:text-lg">
                TAILWIND GRADIENT GENERATOR
            </h4>
            <h1
                class="text-6xl md:text-8xl tracking-tighter font-extrabold text-transparent bg-clip-text bg-gradient-to-br relative from-[#40c9ff] to-[#e81cff] drop-shadow-md overflow-visible px-4 under"
            >
                <span class="text-indigo-400">COLOR</span>BLISS
            </h1>
            <p
                class="mt-12 max-w-md mx-auto tracking-wider text-sm font-semibold md:text-2xl opacity-50"
            >
                Beautiful Tailwind Gradients
            </p>
        </div>
    </section>
    <ModeToggle
        {mode}
        toggleMode={() => (mode = mode == "default" ? "custom" : "default")}
    />
    {#if mode == "default"}
        <DefaultColorGenerator />
    {/if}
    {#if mode == "custom"}
        <CustomColorGenerator />
    {/if}
    <Examples />
</main>
