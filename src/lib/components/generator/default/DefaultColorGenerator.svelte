<script lang="ts">
    import {
        directionMap,
        getBridgedColor,
        getSortedDefaultColors,
        getWidth,
    } from "$lib";
    import defaultColors, { specialColors } from "$lib/data/DefaultColors";
    import { defaultSteps } from "$lib/data/DefaultColors";
    import CopyButtons from "../../CopyButtons.svelte";
    import DefaultColorHandle from "./DefaultColorHandle.svelte";
    import DefaultColorPallette from "./DefaultColorPallette.svelte";
    import GradientCanvas from "../GradientCanvas.svelte";
    import FullScreen from "../FullScreen.svelte";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import PositionSelect from "./PositionSelect.svelte";
    import { toast } from "@zerodevx/svelte-toast";
    import DeleteColorButton from "../DeleteColorButton.svelte";
    import TextToggle from "../TextToggle.svelte";
    import ColorSelect from "./ColorSelect.svelte";
    import Randomize from "./Randomize.svelte";

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
    export let tailwindString: string = "bg-gradient-to-r from-black to-white";
    let lineGradientClasses: string = "bg-white";
    let linearDirection: string = linearDirections[0];
    let radialDirection: string = radialPositions[0];
    let conicalDirection: string = conicalPositions[0];

    // TAILWIND CLASSES FOR GRADIENT
    $: tailwindString = getTailwindString(colors);
    $: linearDirection || radialDirection || conicalDirection
        ? (tailwindString = getTailwindString(colors))
        : null;
    $: gradientType ? (tailwindString = getTailwindString(colors)) : null;
    $: textMode || !textMode
        ? (tailwindString = getTailwindString(colors))
        : null;
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
        let direction: string = linearDirection;
        let sorted: DefaultColor[] = getSortedDefaultColors(colors);
        let colorOne = sorted[0];
        if (sorted.length == 1)
            return `bg-${getColorString(colorOne)} ${
                textMode ? "text-transparent bg-clip-text" : ""
            }`;
        let colorTwo = sorted[1];
        if (sorted.length == 2)
            return `${direction} from-${getColorString(colorOne)} from-${
                colorOne.position
            }% to-${getColorString(colorTwo)} to-${colorTwo.position}% ${
                textMode ? "text-transparent bg-clip-text" : ""
            }`;
        let colorThree = sorted[2];
        return `${direction} from-${getColorString(colorOne)} from-${
            colorOne.position
        }% via-${getColorString(colorTwo)} via-${
            colorTwo.position
        }% to-${getColorString(colorThree)} to-${
            colorThree.position
        }% ${textMode ? "text-transparent bg-clip-text" : ""}`;
    };
    const getRadialTailwindString = (): string => {
        let direction: string = radialDirection;
        let sorted: DefaultColor[] = getSortedDefaultColors(colors);
        let colorOne = sorted[0];
        if (sorted.length == 1)
            return `bg-${getColorString(colorOne)} ${
                textMode ? "text-transparent bg-clip-text" : ""
            }`;
        let baseString: string = `bg-[radial-gradient(DIRECTION,_var(--tw-gradient-stops))] ${
            textMode ? "text-transparent bg-clip-text" : ""
        }`;
        baseString = baseString.replace("DIRECTION", direction);
        let colorTwo = sorted[1];
        if (sorted.length == 2)
            return (
                baseString +
                ` from-${getColorString(colorOne)} from-${colorOne.position}% to-${getColorString(colorTwo)} to-${colorTwo.position}%`
            );
        let colorThree = sorted[2];
        return (
            baseString +
            ` from-${getColorString(colorOne)} from-${colorOne.position}% via-${getColorString(colorTwo)} via-${colorTwo.position}% to-${getColorString(colorThree)} to-${colorThree.position}%`
        );
    };
    const getConicalTailwindString = (): string => {
        let direction: string = conicalDirection;
        let sorted: DefaultColor[] = getSortedDefaultColors(colors);
        let colorOne = sorted[0];
        if (sorted.length == 1)
            return `bg-${getColorString(colorOne)} ${
                textMode ? "text-transparent bg-clip-text" : ""
            }`;
        let baseString = `bg-[conic-gradient(DIRECTION,_var(--tw-gradient-stops))] ${
            textMode ? "text-transparent bg-clip-text" : ""
        }`;
        baseString = baseString.replace("DIRECTION", direction);
        let colorTwo = sorted[1];
        if (sorted.length == 2)
            return (
                baseString +
                ` from-${getColorString(colorOne)} from-${colorOne.position}% to-${getColorString(colorTwo)} to-${colorTwo.position}%`
            );
        let colorThree = sorted[2];
        return (
            baseString +
            ` from-${getColorString(colorOne)} from-${colorOne.position}% via-${getColorString(colorTwo)} via-${colorTwo.position}% to-${getColorString(colorThree)} to-${colorThree.position}%`
        );
    };
    const getColorString = (color: DefaultColor): string => {
        if(specialColors.includes(color.color)) return color.color
        return `${color.color}-${color.step}`
    }
    // TAILWIND CLASSES FOR TRACK GRADIENT
    $: lineGradientClasses = getLineGradientClasses(colors);
    const getLineGradientClasses = (colors: DefaultColor[]): string => {
        let sorted = getSortedDefaultColors(colors);
        let colorOne = sorted[0];
        if (sorted.length == 1) return `bg-${getColorString(colorOne)}`;
        let colorTwo = sorted[1];
        if (colors.length == 2)
            return `bg-gradient-to-r from-${getColorString(colorOne)} from-${colorOne.position}% to-${getColorString(colorTwo)} to-${colorTwo.position}%`;
        let colorThree = sorted[2];
        return `bg-gradient-to-r from-${getColorString(colorOne)} from-${colorOne.position}% via-${getColorString(colorTwo)} via-${colorTwo.position}% to-${getColorString(colorThree)} to-${colorThree.position}%`;
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
    const setHandlePosition = () => {
        // let trackWidth = document.getElementById("gradient-line")?.offsetWidth;
        // let handle = document.getElementById(
        //     `color-handle-${selected}`
        // )
        // let handleWidth = handle?.offsetWidth;
        // if (!trackWidth || !handleWidth || !handle) return
        // let pix = Math.round((trackWidth / 100) * colors[selected].position)
        // console.log(pix)
        // handle.style.transform = ""
        // handle.style.transform = `translate3d(${pix}px, 0px, 0px)`
        // console.log(handle.style.transform)
    };

    const addColor = (e) => {
        if (colors.length >= 3) return;

        let newColorArray: DefaultColor[] = JSON.parse(JSON.stringify(colors));
        let width = getWidth();
        let trackPositionX = document
            .getElementById("gradient-track")
            ?.getBoundingClientRect().left;
        if (!trackPositionX || !width) return;
        let mouseX = e.clientX;
        let diff: number = mouseX - trackPositionX;
        let clickedPosition: number = Math.round((diff / width) * 100);
        let bridgedColor = getBridgedColor(colors, clickedPosition);
        let newColor: DefaultColor = {
            color: bridgedColor.color,
            step: bridgedColor.step,
            position: clickedPosition,
            opacity: 1,
        };
        let newLength = newColorArray.push(newColor);
        colors = newColorArray;
        selected = newLength - 1;
    };
    const deleteColor = () => {
        if (colors.length <= 1) return;
        let newColors: DefaultColor[] = JSON.parse(JSON.stringify(colors));
        newColors.splice(selected, 1);
        colors = newColors;
        selected = 0;
    };
    let set = false;
    $: set;
    // CONICAL
    let conicalIncrement = 45;
    let concialAngles: number[] = [];
    for (let i = 0; i <= 360; i += conicalIncrement) {
        concialAngles.push(i);
    }

    const copyTWCSS = () => {
        let string: string = getTailwindString(colors);
        navigator.clipboard.writeText(string);
        toast.push("Tailwind classes copied to clipboard!");
    };
    const copyCSS = () => {
        let el = document.getElementById("gradient-color-canvas");
        let style = getComputedStyle(el, "backgroundImage");
        console.log(style.backgroundImage);
        if (!style) return;
        navigator.clipboard.writeText(style.backgroundImage);
        toast.push("CSS copied to clipboard!");
    };
    // POSITION STEPS
    let positionSteps: number[] = [];
    for (let i = 0; i <= 100; i += 5) {
        positionSteps.push(i);
    }

    // FULL SCREEN
    let fullscreen: boolean = false;
    // TEXT MODE
    let textMode: boolean = false;
    let textString: string = "TAILWINDCSS";

</script>

<section id="default-colors-generator">
    <div class="default-generator-wrapper max-w-screen-xl mx-auto p-4 md:p-12">
        <div class="grid-container grid grid-cols-1 md:grid-cols-2 gap-10">
            <div class="cols-span-1 relative flex flex-col gap-6">
                <!-- @ts-ignore -->
                <TextToggle
                    bind:string={textString}
                    toggleText={() => (textMode = !textMode)}
                    textActive={textMode}
                />
                <div class="relative grow min-h-[240px]">
                    <GradientCanvas
                        {textString}
                        bind:tailwindString
                        {textMode}
                    />
                </div>

                <div class="p-8 border-2 shadow-md rounded-xl">
                    <!-- LINE -->
                    <div
                        id="gradient-line"
                        class="gradient-line mt-8 w-full lg:mx-0 relative"
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
                                bind:position={colors[index].position}
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
                    <div class="mt-4">
                        <DeleteColorButton deleteAction={deleteColor} />

                    </div>
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 mt-4 items-start gap-4 justify-between"
                    >
                        <div class="sm:basis-1/2">
                            <p class="font-semibold mb-4">COLOR</p>
                            <ColorSelect
                                bind:currentColor={colors[selected].color}
                                bind:currentStep={colors[selected].step}
                            />
                        </div>
                        <div class="sm:basis-1/2">
                            <p class="font-semibold mb-4">POSITION</p>
                            <PositionSelect
                            bind:position={colors[selected].position}
                            color={colors[selected]}
                            {positionSteps}
                            onChange={setHandlePosition}
                        />
                        </div>
                        
                    </div>
                    <!-- TYPE AND DIRECTION -->
                    <div
                        id="gradient-type-controls"
                        class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8"
                    >
                    
                        <!-- TYPE SELECT -->
                        <div>
                            <p class="font-semibold mb-4">TYPE</p>
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
                        </div>
                        
                        <!-- DIRECTION SELECT -->
                        <div>
                            <p class="font-semibold mb-4">DIRECTION</p>
                             <!-- LINEAR -->
                        {#if gradientType == "linear"}
                        <select
                            bind:value={linearDirection}
                            name=""
                            id=""
                            class="rounded-lg border-[2px] border-black/10 p-2 px-4 bg-white"
                        >
                            {#each linearDirections as directionString}
                                <option value={directionString}
                                    >{directionMap.get(
                                        directionString
                                    )}</option
                                >
                            {/each}
                        </select>
                    {/if}
                    <!-- CONICAL -->
                    {#if gradientType == "conical"}
                        <select
                            name=""
                            id=""
                            class="rounded-lg border-[2px] border-black/10 p-2 px-4 bg-white"
                            bind:value={conicalDirection}
                        >
                            {#each conicalPositions as concialPosition}
                                <option value={concialPosition}
                                    >{concialPosition}</option
                                >
                            {/each}
                            <!-- {#if gradientType == "conical"}
                                {#each concialAngles as angle}
                                <option value={angle}>{angle}</option>
                                {/each}
                                {/if} -->
                        </select>
                    {/if}
                    <!-- RADIAL -->
                    {#if gradientType == "radial"}
                        <select
                            name=""
                            id=""
                            class="rounded-lg border-[2px] border-black/10 p-2 px-4 bg-white"
                            bind:value={radialDirection}
                        >
                            {#each radialPositions as radialPosition}
                                <option value={radialPosition}
                                    >{radialPosition}</option
                                >
                            {/each}
                        </select>
                    {/if}
                        </div>
                       
                    </div>
                    <div class="mt-10 grid grid-cols-2 gap-4">
                        <!-- RANDOMIZER -->
                        <Randomize></Randomize>
                        <!-- COPY -->
                        <CopyButtons {copyCSS} {copyTWCSS} />
                    </div>
                </div>
            </div>
            <div class="col-span-1 relative grid gap-6">
                <DefaultColorPallette
                    currentColor={colors[selected]}
                    {setColor}
                />
                <CodeBlock label={"TAILWIND CSS"} code={tailwindString} />
                <CodeBlock label={"CSS"} code={"background: " + "temp"} />
            </div>
        </div>
        <div id="class-embeddings" class="hidden">
            <div
                class="{`
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
                 from-black to-white`} h-8 w-8"
            />
        </div>
    </div>

    <FullScreen gradientString={tailwindString} open={fullscreen} />
</section>

<style>
    select{
        width: 100%;
    }
</style>