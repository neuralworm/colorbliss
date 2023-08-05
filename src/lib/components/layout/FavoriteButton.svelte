<script lang="ts">
    import { addToFavorites } from '$lib/storage/storage';
    import heart from '../../../assets/heart.svg'
    export let active: boolean
    export let gradient: string
</script>

<button class="bg-black rounded-full h-6 w-6 flex items-center justify-center" on:click={() => addToFavorites(gradient)}>
    <i>
        <img src={heart} class:invert={!active} class="w-3" alt="">
    </i>
</button>