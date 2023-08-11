<script lang="ts">
    import { onMount } from "svelte";
    import { draggable } from "@neodrag/svelte";
    import type { DefaultColor } from "$lib/data/DefaultColors";
    export let color: DefaultColor
    let defaultPixels: number
    export let selected: boolean
    export let select: Function
    export let index: number
    export let moveColor: Function
    onMount(()=>{
        let el = document.getElementById('gradient-track')
        defaultPixels = (el.offsetWidth) * (color.position / 100)
    })
</script>

<button
    id={`color-handle-${index}`}
    use:draggable={{
        axis: "x",
        bounds: "parent",
        position: {
            x: defaultPixels,
            y: 0
        },
        onDrag: ({offsetX, offsetY}) => {
                moveColor(offsetX)
        }
    }}
    on:mousedown={(e) => {
        select()
    }}
    class="items-center justify-center bg-white rounded-full shadow-md border-[3px]  border-opacity-100 flex absolute p-[6px] -top-[6px]"
    class:border-black={selected}
    >
    <!-- {defaultPixels} -->
    <div
        class="handle-body rounded-full h-4 w-4 px-2 {`bg-${color.color}-${color.step}`}"
    />
    
</button>

