<script>
    import Generator from "$lib/components/Generator.svelte";
    import Examples from "$lib/components/layout/Examples.svelte";

</script>
<main>
    <section id="splash" class="max-w-xl p-4 text-center flex flex-col justify-center mx-auto py-16">
        <h4 class="tracking-tight font-bold text-neutral-300 text-xs md:text-sm">TAILWIND GRADIENT GENERATOR</h4>
        <h1 class="text-3xl md:text-6xl tracking-tight font-extrabold text-transparent bg-clip-text  bg-gradient-to-br from-[#40c9ff] to-[#e81cff]">COLORWIND</h1>
        <p class="mt-8 font-semibold max-w-md mx-auto tracking-wider text-sm md:text-lg">Generate custom tailwind gradients using colors not provided by Tailwind's default library.</p>
    
    </section>

    <Generator></Generator>
    <Examples></Examples>
</main>


