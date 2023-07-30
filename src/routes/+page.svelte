<script>
    import Background from "$lib/components/Background.svelte";
import Generator from "$lib/components/Generator.svelte";
    import Examples from "$lib/components/layout/Examples.svelte";

</script>
<main>
    <section id="splash" class="p-4 text-center flex flex-col justify-center py-16 relative  backdrop-blur-3xl">
        <div id="splash-content" class="mx-auto p-8">
            <h4 class="tracking-tight font-semibold  text-xs md:text-sm">TAILWIND GRADIENT GENERATOR</h4>
            <h1 class="text-3xl md:text-6xl tracking-tighter font-extrabold text-transparent bg-clip-text  bg-gradient-to-br relative from-[#40c9ff] to-[#e81cff] drop-shadow-md">
                COLOR-TAIL
            </h1>
            <p class="mt-8 max-w-md mx-auto tracking-wider text-sm font-semibold md:text-xl opacity-50">Beautiful Tailwind Gradients</p>
        </div>
        
    </section>
    <!-- <Background></Background> -->

    <Generator></Generator>
    <Examples></Examples>
</main>


