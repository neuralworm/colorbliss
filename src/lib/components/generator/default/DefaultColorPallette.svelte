<script lang="ts">
    import {defaultColors, defaultSteps, type DefaultColor} from '../../../data/DefaultColors'
    // import { Tooltip } from 'flowbite-svelte';
    export let setColor: Function
    export let currentColor: DefaultColor
    let otherColors: string[] = ["black", "white"]
</script>

<div class="border-[1px]  border-black/10 shadow-md rounded-2xl overflow-hidden">
    <div class="content rounded-md overflow-hidden shadow-md border-[1px] border-black/10">
        <dif class="flex flex-row justify-between">
            <!-- <input type="text" placeholder="DEFAULT COLOR"> -->
            <div class="{`bg-${currentColor.color}-${currentColor.step}`} p-1 px-2 grow">
                <span class="uppercase font-semibold" class:text-white={currentColor.step > 400}>
                    {currentColor.color}-{currentColor.step}
                </span>
            </div>
            <div class="flex flex-row other-colors w-1/2">
                {#each otherColors as otherColor}
                <button aria-roledescription="" class={`bg-${otherColor} relative group grow cursor-pointer basis-1/3`} title={`${otherColor}`} on:click={()=>setColor(`${otherColor}`)}>
                    <div class="absolute top-0 left-0 right-0 bottom-0 border-2  border-transparent group-hover:border-white" class:text-black={otherColor == "white"}
                    class:text-white={otherColor == "black"}
                    >
                        {otherColor}
                    </div>
                </button>
                {/each}
            </div>
        </dif>
        {#each defaultColors as color}
            <div class="flex flex-row">
                {#each defaultSteps as step}
                    <button id="pallette-{color}-{step}" aria-roledescription="" class={`bg-${color}-${step} h-4 relative group grow cursor-pointer`} title={`${color}-${step}`} on:click={()=>setColor(color, step)}>
                        <div class="absolute top-0 left-0 right-0 bottom-0 border-2 border-transparent " class:group-hover:border-white={step > 400} class:group-hover:border-black={step <= 400}
                            ></div>
                    </button>
                {/each}
            </div>
        {/each}
    </div>
    
</div>