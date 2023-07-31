<script lang="ts">
    import { draggable } from "svelte-drag";
    export let id: string;
    export let selected: boolean;
    export let hex: string;
    export let select: Function;
    export let pos: number
    export let color: Color
</script>

<button
    id="color-1-handle"
    use:draggable={{
        axis: "x",
        bounds: "parent",
        defaultPosition: {
            x: pos,
            y: 0,
        },
    }}
    on:mousedown={() => select()}
    on:svelte-drag={(e) => {}}
    class=" flex items-center justify-center bg-white rounded-full shadow-md border-[3px]  border-opacity-100"
    class:border-black={selected}
>
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
