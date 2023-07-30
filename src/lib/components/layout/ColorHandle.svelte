<script lang="ts">
    export let id: string
    export let selected: boolean
    export let hex: string
    export let select: Function
</script>
<button
    id={`color-handle-${id}`}
    class=" flex items-center justify-center p-2 bg-white rounded-md shadow-md border-[3px] border-slate-300 border-opacity-50"
    class:border-black={selected}
    on:mousedown={()=>select()}
>
    <div
        class="handle-body rounded-sm w-[20px] h-6 px-2"
        style="background-color: {hex};"
    />
</button>
