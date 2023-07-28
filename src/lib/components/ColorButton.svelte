<script lang="ts">
    export let color: string;
    export let labelString: string;
    export let selected: number;
    export let setColor: Function;
    export let openPicker: Function;
</script>

<div
    class="w-full border-[2px] rounded-md flex flex-row items-center justify-between p-2"
>
    <input
        on:submit={(e) => setColor(e.target.value, selected)}
        type="text"
        class="bg-transparent outline-none uppercase"
        name={labelString}
        value={color}
        id=""
        on:blur={(e) => setColor(e.target.value, selected)}
    />
    <div
        on:click={() => openPicker()}
        class="h-6 w-6 rounded-md cursor-pointer"
        style="background: {color};"
    />
</div>
