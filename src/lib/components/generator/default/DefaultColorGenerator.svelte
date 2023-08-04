<script lang="ts">
    import { directionMap } from "$lib";
    import defaultColors from "$lib/data/DefaultColors";
    import { defaultSteps } from "$lib/data/DefaultColors";
    import CopyButtons from "../../CopyButtons.svelte";
    import DefaultColorHandle from "./DefaultColorHandle.svelte";
    import DefaultColorPallette from "./DefaultColorPallette.svelte";
    import GradientCanvas from "../GradientCanvas.svelte";
    import AddColorButton from "$lib/components/AddColorButton.svelte";
    import FullScreen from "../FullScreen.svelte";
    const linearDirections: string[] = [
        "bg-gradient-to-r",
        "bg-gradient-to-tr",
        "bg-gradient-to-br",
        "bg-gradient-to-l",
        "bg-gradient-to-tl",
        "bg-gradient-to-bl",
        "bg-gradient-to-t",
        "bg-gradient-to-b",
    ];
    interface DefaultColor {
        color: string;
        step: number;
        position: number;
        opacity: number;
    }
    const defaultColorOne: DefaultColor = {
        color: "indigo",
        step: 500,
        position: 5,
        opacity: 100,
    };
    const defaultColorTwo: DefaultColor = {
        color: "rose",
        step: 400,
        position: 95,
        opacity: 100,
    };
    let colors: DefaultColor[] = [defaultColorOne, defaultColorTwo];
    let selected: number = 0;
    let types: "linear" | "radial" | "conical";
    let gradientType: string = "linear";
    let tailwindString: string = "bg-gradient-to-r from-black to-white";
    let lineGradientClasses: string = "bg-white";
    let currentDirection: "bg-gradient-to-r";
    // TAILWIND CLASSES FOR GRADIENT
    $: tailwindString = getTailwindString(colors);
    $: (currentDirection) ? (tailwindString = getTailwindString(colors)) : null;
    const getTailwindString = (colors: DefaultColor[]): string => {
        switch (gradientType) {
            case "linear":
                return getLinearTailwindString();
                break;
            case "radial":
                return getRadialTailwindString();
                break;
            case "conical":
                return getConicalTailwindString();
                break;
            default:
                return ``;
        }
    };
    const getLinearTailwindString = (): string => {
        let sorted: DefaultColor[] = getSorted();
        let colorOne = sorted[0];
        if (sorted.length == 1) return `bg-${colorOne.color}-${colorOne.step}`;
        let colorTwo = sorted[1];
        if (sorted.length == 2)
            return `${currentDirection} from-${colorOne.color}-${colorOne.step} from-${colorOne.position}% to-${colorTwo.color}-${colorTwo.step} to-${colorTwo.position}%`;
        let colorThree = sorted[2];
        return `${currentDirection} from-${colorOne.color}-${colorOne.step} from-${colorOne.position}% via-${colorTwo.color}-${colorTwo.step} via-${colorTwo.position}% to-${colorThree.color}-${colorThree.step} to-${colorThree.position}%`;
    };
    const getRadialTailwindString = (): string => {
        let sorted: DefaultColor[] = getSorted();
        let colorOne = sorted[0];
        if (sorted.length == 1) return `bg-${colorOne.color}-${colorOne.step}`;
        let baseString: string = `bg-[radial-gradient(DIRECTION,_var(--tw-gradient-stops))]`
        baseString = baseString.replace("DIRECTION", currentDirection)
        let colorTwo = sorted[1]
        if(sorted.length == 2) return baseString + ` from-${colorOne.color}-${colorOne.step} from-${colorOne.position}% to-${colorTwo.color}-${colorTwo.step} to-${colorTwo.position}%`
        let colorThree = sorted[2]
        return baseString + ` from-${colorOne.color}-${colorOne.step} from-${colorOne.position}% via-${colorTwo.color}-${colorTwo.step} via-${colorTwo.position}% to-${colorThree.color}-${colorThree.step} to-${colorThree.position}%`
    };
    const getConicalTailwindString = (): string => {
        let sorted: DefaultColor[] = getSorted();
        let colorOne = sorted[0];
        if (sorted.length == 1) return `bg-${colorOne.color}-${colorOne.step}`;
        let baseString = `bg-[conic-gradient(DIRECTION,_var(--tw-gradient-stops))]`
        baseString = baseString.replace("DIRECTION", currentDirection)
        let colorTwo = sorted[1]
        if(sorted.length == 2) return baseString + ` from-${colorOne.color}-${colorOne.step} from-${colorOne.position}% to-${colorTwo.color}-${colorTwo.step} to-${colorTwo.position}%`
        let colorThree = sorted[2]
        return baseString + ` from-${colorOne.color}-${colorOne.step} from-${colorOne.position}% via-${colorTwo.color}-${colorTwo.step} via-${colorTwo.position}% to-${colorThree.color}-${colorThree.step} to-${colorThree.position}%`

    };
    // TAILWIND CLASSES FOR TRACK GRADIENT
    $: lineGradientClasses = getLineGradientClasses(colors);
    const getLineGradientClasses = (colors: DefaultColor[]): string => {
        let sorted = getSorted();
        let colorOne = sorted[0];
        if (sorted.length == 1) return `bg-${colorOne.color}-${colorOne.step}`;
        let colorTwo = sorted[1];
        if(colors.length == 2) return `bg-gradient-to-r from-${colorOne.color}-${colorOne.step} from-${colorOne.position}% to-${colorTwo.color}-${colorTwo.step} to-${colorTwo.position}%`;
        let colorThree = sorted[2]
        return `bg-gradient-to-r from-${colorOne.color}-${colorOne.step} from-${colorOne.position}% via-${colorTwo.color}-${colorTwo.step} via-${colorTwo.position}% to-${colorThree.color}-${colorThree.step} to-${colorThree.position}%`
    };
    const setColor = (color: string, step: number) => {
        colors[selected].color = color;
        colors[selected].step = step;
    };
    const moveColor = (offset: number) => {
        let trackWidth = document.getElementById("gradient-line")?.offsetWidth;
        let handleWidth = document.getElementById(
            `color-handle-${selected}`
        )?.offsetWidth;
        if (!trackWidth || !handleWidth) return;
        colors[selected].position =
            Math.ceil(
                Math.floor((offset / (trackWidth - handleWidth)) * 100) / 5
            ) * 5;
        set = false;
    };
    const getSorted = (): DefaultColor[] => {
        let sortedColors = JSON.parse(JSON.stringify(colors)).sort(
            (a, b) => a.position - b.position
        );
        return sortedColors;
    };
    const addColor = (e) => {
        let newColorArray: DefaultColor[] = JSON.parse(JSON.stringify(colors));
        if (colors.length >= 3) return;
        let trackWidth = document.getElementById("gradient-line")?.offsetWidth;
        let handleWidth = document.getElementById(
            `color-handle-${selected}`
        )?.offsetWidth;
        let newColor: DefaultColor = {
            color: "",
            step: 50,
            position: 0,
            opacity: 1,
        };
        newColorArray.push(newColor);
        colors = newColorArray;
    };
    let set = false;
    $: set;
    // CONICAL
    let conicalIncrement = 45;
    let concialAngles: number[] = [];
    for (let i = 0; i <= 360; i += conicalIncrement) {
        concialAngles.push(i);
    }
    const conicalPositions: string[] = [
        "at_center",
        "at_top",
        "at_bottom",
        "at_left",
        "at_right",
        "at_top_left",
        "at_top_right",
        "at_bottom_left",
        "at_bottom_right",
    ];
    // RADIAL
    const radialPositions: string[] = [
        "ellipse_at_center",
        "ellipse_at_top",
        "ellipse_at_bottom",
        "ellipse_at_left",
        "ellipse_at_right",
        "ellipse_at_top_left",
        "ellipse_at_top_right",
        "ellipse_at_bottom_left",
        "ellipse_at_bottom_right",
    ];
    const copyTWCSS = () => {
        let string: string = getTailwindString(colors)
        navigator.clipboard.writeText(string)
    }
    const copyCSS = () => {
        let el = document.getElementById('gradient-color-canvas')
        let style = getComputedStyle(el, "backgroundImage")
        console.log(style.backgroundImage)
        if(!style) return
        navigator.clipboard.writeText(style.backgroundImage)
    }


    // FULL SCREEN
    let fullscreen: boolean = false
</script>

<section id="default-colors-generator">
    <div class="default-generator-wrapper max-w-screen-xl mx-auto p-12">
        <div class="grid-container grid grid-cols-1 md:grid-cols-2 gap-10">
            <div class="cols-span-1 relative flex flex-col gap-6">
                <div class="relative grow min-h-[240px]">
                    <GradientCanvas {tailwindString} />
                </div>
                
                <div id="gradient-type-controls" class="flex flex-row gap-4">
                    <!-- TYPE SELECT -->
                    <select
                        class="rounded-lg border-[2px] border-black/10 p-2 px-4 bg-white"
                        name=""
                        id=""
                        on:change={(e) => (gradientType = e.target.value)}
                    >
                        <option value="linear">linear</option>
                        <option value="radial">radial</option>
                        <option value="conical">conical</option>
                    </select>
                    <!-- DIRECTION SELECT -->
                    <select
                        bind:value={currentDirection}
                        name=""
                        id=""
                        class="rounded-lg border-[2px] border-black/10 p-2 px-4 bg-white"
                    >
                        <!-- LINEAR -->
                        {#if gradientType == "linear"}
                            {#each linearDirections as directionString}
                                <option value={directionString}
                                    >{directionMap.get(directionString)}</option
                                >
                            {/each}
                        {/if}
                        <!-- CONCIAL -->
                        {#if gradientType == "conical"}
                            {#each conicalPositions as concialPosition}
                                <option value={concialPosition}
                                    >{concialPosition}</option
                                >
                            {/each}
                        {/if}
                        <!-- {#if gradientType == "conical"}
                            {#each concialAngles as angle}
                                <option value={angle}>{angle}</option>
                            {/each}
                        {/if} -->
                        <!-- RADIAL -->
                        {#if gradientType == "radial"}
                            {#each radialPositions as radialPosition}
                                <option value={radialPosition}
                                    >{radialPosition}</option
                                >
                            {/each}
                        {/if}
                    </select>

                    <!-- COPY -->
                    <CopyButtons copyCSS={copyCSS} copyTWCSS={copyTWCSS} />
                </div>
            </div>
            <div class="col-span-1 relative grid gap-6">
                <DefaultColorPallette currentColor={colors[selected]} {setColor} />
                <div class="p-6 border-[1px] shadow-md rounded-xl">
                    <!-- LINE -->
                    <div
                        id="gradient-line"
                        class="gradient-line mt-2 w-full lg:mx-0 relative"
                    >
                        <!-- LINE COMPONENT -->
                        <div
                            role="progressbar"
                            id="gradient-track"
                            class="h-[14px] w-full rounded-md absolute top-1/2 cursor-copy {lineGradientClasses}"
                            style="transform: translate3d(0,-50%,0)"
                            on:mousedown={(e) => addColor(e)}
                        />
                        <!-- HANDLES -->
                        {#each colors as color, index}
                            <DefaultColorHandle
                                {index}
                                select={() => (selected = index)}
                                {color}
                                selected={index == selected}
                                {moveColor}
                            />
                        {/each}
                        <!-- {colors[selected].position} -->
                        <!-- BLANK FOR HEIGHT -->
                        <button
                            class="items-center justify-center bg-white rounded-full shadow-md border-[3px] border-opacity-100 flex invisible"
                            class:border-black={selected}
                        >
                            <!-- {defaultPixels} -->
                            <div
                                class="handle-body rounded-full h-4 w-4 px-2"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="class-embeddings" class="hidden">
                <div class="{`
                bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]
                bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))]
                bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]
                bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
                bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]
                bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
                bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
                bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_center,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_left,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_right,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))]
                bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))]
                 from-black to-white`} h-8 w-8"></div>
        </div>
    </div>
    <FullScreen gradientString={tailwindString} open={fullscreen}></FullScreen>
</section>
