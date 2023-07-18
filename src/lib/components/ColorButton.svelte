<script lang="ts">
    export let color: string
    export let labelString: string
    export let selected: number
</script>

<div class="w-full bg-indigo-900 rounded-md flex flex-row items-center justify-between p-2">
    <input type="text" class="bg-transparent outline-none" name={labelString} bind:value={color} id="">
    <div on:click={()=> {}} class="h-6 w-6 rounded-md cursor-pointer" style="background: {color};">

    </div>
</div>