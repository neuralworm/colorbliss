<script lang="ts">
    import { onMount } from "svelte";
import { draggable } from "@neodrag/svelte";
    export let id: string;
    export let selected: boolean;
    export let hex: string;
    export let select: Function;
    export let pos: number
    export let color: Color
    export let moveColor: Function
    
    let defaultPixels: number
    onMount(()=>{
        let el = document.getElementById('gradient-track')
        let handle = document.getElementById(`color-handle-${id}`)
        console.log(document.getElementById('gradient-track')?.offsetWidth, color.pos, pos, id)
        defaultPixels = (el.offsetWidth - handle?.offsetWidth) * (color.pos / 100)
    })
</script>

<button
    id={`color-handle-${id}`}
    use:draggable={{
        axis: "x",
        bounds: "parent",
        position: {
            x: (document.getElementById('gradient-track').offsetWidth - document.getElementById(`color-handle-${id}`).offsetWidth) * (color.pos / 100),
            y: 0
        },
        onDrag: ({offsetX, offsetY}) => {
                moveColor(color, offsetX)
        }
    }}
    on:mousedown={(e) => {
        select()
        }}
    class="items-center justify-center bg-white rounded-full shadow-md border-[3px]  border-opacity-100 flex absolute"
    class:border-black={selected}
    >
    <!-- {defaultPixels} -->
    <div
        class="handle-body rounded-full h-4 w-4 px-2"
        style="background-color: {color.hex};"
    />
</button>

<!-- <button
    id={`color-handle-${id}`}
    class=" flex items-center justify-center p-2 bg-white rounded-md shadow-md border-[3px] border-slate-300 border-opacity-50"
    class:border-black={selected}
    on:mousedown={() => select()}
>
    <div
        class="handle-body rounded-sm w-[20px] h-6 px-2"
        style="background-color: {hex};"
    />
</button> -->
