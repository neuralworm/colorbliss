<script lang="ts">
    import { getContext } from "svelte";

    export let title: string
    export let currentType: string
    const {setGradientType} = getContext('setGradientType')
    
</script>

<button on:click={()=>setGradientType(title)} class="w-16 rounded-lg bg-indigo-900 text-white flex items-center justify-center text-sm py-1 font-semibold tracking-wider {title.toLowerCase()==currentType.toLowerCase() ? "opacity-100" : "opacity-50"} hover:opacity-80" class:text-neutral-400={title.toLowerCase()!=currentType.toLowerCase()}>
    {title}
</button>