<script lang="ts">
    import type { Example } from "$lib/data/examples/Examples";
    import FavoriteButton from "../layout/FavoriteButton.svelte";
    import upload from "../../../assets/upload.png";
    export let example: Example;
    export let loadExample: Function|null;
    let exampleString = "";
    $: exampleString = getExampleString(example);
    const getExampleString = (example: Example) => {
        if (!example.via)
            return `bg-gradient-to-r from-${example.from} to-${example.to}`;
        else
            return `bg-gradient-to-r from-${example.from} via-${example.via} to-${example.to}`;
    };
</script>

<div class="relative mb-16">
    <div
        class="rounded-3xl shadow-lg h-[224px] relative w-full {exampleString}  cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group"
    >
        <button
            class="overlay opacity-0 transition-all group-hover:opacity-100 z-10 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center flex-col bg-slate-900/60 rounded-lg overflow-hidden gap-6 hover:animate-pulse w-full"
            on:click={()=> loadExample(example)}
        >
            <figure>
                <img class="invert w-8" src={upload} alt="" />
            </figure>
            <h4 class="relative font-extrabold text-2xl text-center">LOAD</h4>
        </button>
    </div>
    <div
        class="info bg-slate-900 p-2 px-4 rounded-lg absolute mx-2 left-2 right-2 shadow-lg border-[1px] border-black/10 font-semibold flex flex-row items-center justify-between group-hover:translate-y-2 transition-all"
    >
        <h5>
            {example.name.toUpperCase()}
        </h5>
        <div class="controls">
            <FavoriteButton gradient={example.name} active={false} />
        </div>
    </div>
</div>
