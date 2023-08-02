<script lang="ts">
    import {defaultColors, defaultSteps} from '../data/DefaultColors'
    // import { Tooltip } from 'flowbite-svelte';
    export let setColor: Function
    let otherColors: string[] = ["black", "white", "transparent"]
</script>

<div class="border-[1px] p-[30px] border-black/10 shadow-md rounded-2xl overflow-hidden">
    <div class="content rounded-md overflow-hidden shadow-md border-[1px] border-black/10">
        <dif class="flex flex-row justify-between">
            <input type="text" placeholder="DEFAULT COLOR">
            <div class="flex flex-row other-colors w-1/2">
                {#each otherColors as otherColor}
                <div class={`bg-${otherColor} h-6 relative group grow cursor-pointer basis-1/3`} title={`${otherColor}`} on:click={()=>setColor(`${otherColor}`)}>
                    <div class="absolute top-0 left-0 right-0 bottom-0 border-2  border-transparent group-hover:border-white"></div>
                </div>
                {/each}
            </div>
        </dif>
        {#each defaultColors as color}
            <div class="flex flex-row">
                {#each defaultSteps as step}
                    <div class={`bg-${color}-${step} h-4 relative group grow cursor-pointer`} title={`${color}-${step}`} on:click={()=>setColor(`${color}-${step}`)}>
                        <div class="absolute top-0 left-0 right-0 bottom-0 border-2 border-transparent " class:group-hover:border-white={step > 400} class:group-hover:border-black={step <= 400}
                            ></div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
    
</div>