<script lang="ts">
    import { loadFavorites } from "$lib/storage/storage";
    import {favorites} from '$lib/state/store'
    import { onMount } from "svelte";
    let favs: string[]|null
    onMount(()=>{
        loadFavorites()
    })
    favorites.subscribe((val)=>{
        favs = val
    })
</script>
<section id="favorites-page">
    {#each favs as fav}
        {fav}
    {/each}
</section>