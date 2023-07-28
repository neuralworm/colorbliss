<script lang="ts">
    import chevron from '../../assets/chevron.png'
    export let direction: string
    export let currentDirection: string
    export let setDirection: Function

    let directionMap: Map<string, string> = new Map<string,string>([
        ["bg-gradient-to-r", ""],
        ["bg-gradient-to-tr", "-rotate-45"],
        ["bg-gradient-to-br", "rotate-45"],
        ["bg-gradient-to-l", "rotate-180"],
        ["bg-gradient-to-tl", "rotate-225"],
        ["bg-gradient-to-bl", "to bottom left"],
        ["bg-gradient-to-t", "to top"],
        ["bg-gradient-to-b", "to bottom"],
    ])
</script>

<button class="w-8 h-8 rounded-lg bg-indigo-500 hover:opacity-60 shadow-md flex items-center justify-center" on:click={()=>setDirection(direction)} class:opacity-50={direction == currentDirection}>
    <img src={chevron} class="invert h-4  {directionMap.get(direction)}" alt="">
</button>