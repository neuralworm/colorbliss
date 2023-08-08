<script lang="ts">
    import { favorites } from '$lib/state/store';
    import { addToFavorites, doesFavoriteExist, removeFavorite } from '$lib/storage/storage';
    import heart from '../../../assets/heart.svg'
    export let active: boolean
    export let gradient: string
    let favs: string[]|null
    favorites.subscribe((val)=>{
       favs = val
    })
    const isFavorited = () => {
        if(favs?.includes(gradient)) return true
        console.log('not faved')
        return false
    }
    const addRequest = () => {
        if(!isFavorited()) addToFavorites(gradient)
        else removeFavorite(gradient)
    }
</script>

<button class="bg-black rounded-full h-6 w-6 flex items-center justify-center" on:click={() => addRequest()}>
    <i>
        <img src={heart} class:invert={!active} class="w-3" alt="">
    </i>
</button>