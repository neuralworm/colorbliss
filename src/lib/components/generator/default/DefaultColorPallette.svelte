<script lang="ts">
    import {
        defaultColors,
        defaultSteps,
        type DefaultColor,
        specialColors,
    } from "../../../data/DefaultColors";
    // import { Tooltip } from 'flowbite-svelte';
    export let setColor: Function;
    export let currentColor: DefaultColor;
    let otherColors: string[] = ["black", "white"];
    const getColorString = (color: DefaultColor): string => {
        if (specialColors.includes(color.color)) return color.color;
        return `${color.color}-${color.step}`;
    };
</script>

<div class="p-2 shadow-lg border-black/10 bg-black/30 overflow-hidden">
    <div
        class="content rounded-md overflow-hidden shadow-md  border-black/10"
    >
        <!-- SPECIAL COLORS -->
        <dif class="flex flex-row justify-between gap-2 mb-4">
            <!-- <input type="text" placeholder="DEFAULT COLOR"> -->
            <div class="{`bg-${getColorString(currentColor)}`} p-1 px-2 grow mr-8 rounded-md overflow-hidden">
                <span
                    class="uppercase font-semibold"
                    class:text-white={(currentColor.step > 400 && !specialColors.includes(currentColor.color)) ||
                        currentColor.color == "black"}
                    class:text-black={currentColor.color == ("white" || "transparent")}
                >
                    {getColorString(currentColor)}
                </span>
            </div>
            <div class="flex flex-row other-colors w-1/2">
                {#each otherColors as otherColor}
                    <button
                        aria-roledescription=""
                        class={`bg-${otherColor} relative group grow cursor-pointer rounded-md overflow-hidden basis-1/3`}
                        title={`${otherColor}`}
                        on:click={() =>
                            setColor(`${otherColor}`, currentColor.step)}
                    >
                        <div
                            class="absolute top-0 left-0 right-0 bottom-0 border-2 border-transparent group-hover:border-white"
                            class:text-black={otherColor == "white"}
                            class:text-white={otherColor == "black"}
                        >
                            {otherColor}
                        </div>
                    </button>
                {/each}
            </div>
        </dif>
        <!-- MAIN COLORS -->
        <div class="grid grid-rows-22 grid-cols-11 gap-2">
            {#each defaultColors as color}
                {#each defaultSteps as step}
                    <button
                        id="pallette-{color}-{step}"
                        aria-roledescription=""
                        class={`bg-${color}-${step} w-10 h-10 relative group grow cursor-pointer rounded-md shadow-sm`}
                        title={`${color}-${step}`}
                        on:click={() => setColor(color, step)}
                    >
                        <div
                            class="absolute top-0 left-0 right-0 bottom-0 border-2 border-transparent rounded-md"
                            class:group-hover:border-white={step > 400}
                            class:group-hover:border-black={step <= 400}
                        />
                    </button>
                {/each}
        {/each}
        </div>
        
    </div>
</div>
