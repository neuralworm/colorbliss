<script>
    import ExampleView from "../ExampleView.svelte";
    import {examples} from "../../data/examples/Examples"
</script>
<section id="gradient-examples" class="mx-auto py-16 mt-16">
    <div id="example-header" class="text-center">
        <!-- <h4>SOME INSPIRATION</h4> -->
        <h2 class="text-4xl tracking-tight font-extrabold bg-grad">GRADIENTS</h2>
    </div>
    <div class="max-w-screen-xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
        {#each examples as example}
            <ExampleView example={example}></ExampleView>
        {/each}
    </div>
</section>