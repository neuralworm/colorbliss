<script lang="ts">
    import { loadFavorites } from "$lib/storage/storage";
    import {favorites} from '$lib/state/store'
    import { onMount } from "svelte";
    import ExampleView from "$lib/components/examples/ExampleView.svelte";
    import { examples, type Example } from "$lib/data/examples/Examples";
    let favs: string[]|null
    onMount(()=>{
        loadFavorites()
    })
    let favoritedExamples: Example[]
    favorites.subscribe((val)=>{
        favs = val
        favoritedExamples = examples.filter((val: Example) => {
            if(favs?.includes(val.name)) return true
            return false
        })
    })
</script>
<svelte:head>
    <title>
        Favorite Gradients - ColorBliss
    </title>
</svelte:head>
<section id="favorites-page">
    <section id="favorites-head" class="mx-auto max-w-screen-xl p-6 h-full">
        <h1 class="text-5xl md:text-5xl font-extrabold tracking-tight py-16">
            FAVORITES
        </h1>
    </section>
    {#if favoritedExamples.length == 0}
        <div>
            No Favorites Yet
        </div>
    {/if}
    <div class="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto mt-24 p-6">
        {#each favoritedExamples as fav}
        <ExampleView loadExample={null} example={fav}></ExampleView>
        {/each}
    </div>
</section>