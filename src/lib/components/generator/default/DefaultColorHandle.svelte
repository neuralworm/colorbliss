<script lang="ts">
    import { onMount } from "svelte";
    import { draggable } from "@neodrag/svelte";
    import type { DefaultColor } from "$lib/data/DefaultColors";
    export let color: DefaultColor
    let currentPixelOffset: number
    export let selected: boolean
    export let select: Function
    export let index: number
    export let moveColor: Function
    export let position: number
    onMount(()=>{
        let trackWidth = document.getElementById("gradient-line")?.offsetWidth;
        let handleWidth = document.getElementById(
            `color-handle-${index}`
        )?.offsetWidth;
        currentPixelOffset = Math.round(position * (trackWidth! / 100) - (handleWidth! / 2))
        console.log(handleWidth)
    })
    export const setPosition = () => {
        // if(position % 5 == 0) return
        let trackWidth = document.getElementById("gradient-line")?.offsetWidth;
        let handleWidth = document.getElementById(
            `color-handle-${index}`
        )?.offsetWidth;
        currentPixelOffset = Math.round(position * (trackWidth! / 100) - (handleWidth! / 2))
        console.log(handleWidth)
    }
    $: position ? setPosition() : null;
</script>

<button
    id={`color-handle-${index}`}
    use:draggable={{
        axis: "x",
        bounds: "parent",
        position: {
            x: currentPixelOffset,
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
    <!-- <div>
        {position}
    </div> -->
    
</button>

