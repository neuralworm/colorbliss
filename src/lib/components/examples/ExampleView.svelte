<script lang="ts">
    import type { Example } from "$lib/data/examples/Examples";

    export let example: Example
    let exampleString = ""
    $: exampleString = getExampleString(example)
    const getExampleString = (example: Example) => {
        if(!example.via) return `bg-gradient-to-r from-${example.from} to-${example.to}`
        else return `bg-gradient-to-r from-${example.from} via-${example.via} to-${example.to}`
    }
</script>

<div class="rounded-3xl shadow-lg h-[184px] relative w-full {exampleString} mb-16 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group" >
    <div class="info  bg-slate-50 p-2 px-4 rounded-lg absolute -bottom-[24px] mx-2 left-2 right-2 shadow-lg border-[1px] border-black/10 font-semibold flex flex-row items-center justify-between group-hover:translate-y-2 transition-all">
        <h5>
            {example.name.toUpperCase()}

        </h5>
        <div class="controls">
            
        </div>
    </div>
    
</div>