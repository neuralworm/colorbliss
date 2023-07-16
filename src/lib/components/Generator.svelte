<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import OptionButton from "./OptionButton.svelte";
    import { setContext } from "svelte";
    // @ts-ignore
    import { toast, SvelteToast } from "@zerodevx/svelte-toast";
    import { draggable } from "svelte-drag";
    import { copyToClipboard, directionMap, getStyleStringOv } from "$lib";
    import code from "../../assets/code.png";
    import tailwind from "../../assets/tailwind.svg";
    import DirectionButton from "./DirectionButton.svelte";

    // COLOR STATE
    let colorOne: string = "#40c9ff";
    let colorTwo: string = "#e81cff";
    let colorThree: string = "#ff930f";

    // DRAG
    let dragOne: boolean = false;

    let coordOne: number = 0;
    let coordTwo: number = 100;
    let coordThree: number = 50;

    const setCoordOne = (offset: number) => {
        coordOne = Math.ceil(Math.floor((offset / 430) * 100) / 5) * 5;
    };
    const setCoordTwo = (offset: number) => {
        coordTwo = Math.ceil(Math.floor((offset / 430) * 100) / 5) * 5;
    };
    const setCoordThree = (offset: number) => {
        coordThree = Math.ceil(Math.floor((offset / 430) * 100) / 5) * 5;
    };

    let middleColor: boolean = false;

    let direction: string = "bg-gradient-to-r";

    const setDirection = (dirString: string) => {
        direction = dirString;
    };

    type GradientTypes = "linear" | "radial" | "conic";
    let gradientType: string = "linear";

    const setGradientType = (string: string) => {
        gradientType = string.toLowerCase();
        styleString = getStyleString(gradientType);
    };
    setContext("setGradientType", { setGradientType });

    // SET STATE OF CURRENTLY DISPLAYED GRADIENT AS NORMAL CSS STYLE (NOT TAILWINDS CLASSES)
    const getStyleString = (gradientType: string): string => {
        let {color1, coord1, color2, coord2, color3, coord3} = reorder(colorOne, coordOne, colorTwo, coordTwo, colorThree, coordThree)
        // console.log(color1, coord1, color2, coord2, color3, coord3)
        // RADIAL
        if (gradientType == "radial")
            return `radial-gradient(${color1} ${coord1}%, ${
                middleColor ? color3 + " " + coord3 + "%," : ""
            } ${color2} ${coord2}%`;

        // LINEAR
        if (gradientType == "linear")
            return `linear-gradient(to right, ${color1} ${coord1}%, ${
                middleColor ? color3 + " " + coord3 + "%," : ""
            } ${color2} ${coord2}%`;

        // CONIC
        if (gradientType == "conic")
            return `conic-gradient(${color1} ${coord1}%, ${
                middleColor ? color3 + " " + coord3 + "%," : ""
            } ${color2} ${coord2}%`;

        // FALLBACK
        return ``;
    };
    type Position = [string, number] // [color, coord]
    // Reorders colors in ascending numeric order
    const reorder = (colorOne: string, coordOne: number, colorTwo: string, coordTwo: number, colorThree: string, coordThree: number) => {
        let array: Position[] = [[colorOne, coordOne], [colorTwo, coordTwo], [colorThree, coordThree]]
        let ordered: Position[] = array.sort((a, b) => {
            return a[1]-b[1]
        })
        return{
            color1: ordered[0][0],
            coord1: ordered[0][1],
            color2: ordered[1][0],
            coord2: ordered[1][1],
            color3: ordered[2][0], 
            coord3: ordered[2][1]
        }
    }
    const getConicString = () => {};

    // For user to copy
    const getTailwindBGString = (): string => {
        return `this`;
    };
    const getTailwindTextString = (): string => {
        return `bg-clip-text  bg-gradient-to-br from-[${colorOne}] ${
            middleColor ? `via-[#${colorTwo}]` : ""
        } to-[${colorThree}]"`;
    };

    $: styleString = getStyleString(gradientType);
    $: coordOne ? (styleString = getStyleString(gradientType)) : null;
    $: coordTwo ? (styleString = getStyleString(gradientType)) : null;
    $: direction
        ? (styleString = getStyleStringOv(
              gradientType,
              colorOne,
              colorTwo,
              middleColor ? colorThree : null,
              coordOne,
              coordTwo,
              middleColor ? coordThree : null,
              direction
          ))
        : null;

    // UTIL
    const getLength = () => {
        if (!document) return;
        console.log(document.getElementById("gradient-line")?.scrollWidth);
        return document.getElementById("gradient-line")?.offsetWidth || 320;
    };

    // DIRECTION MAP
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
</script>

<section
    id="generator-wrapper"
    class="max-w-xl mx-auto flex items-center justify-center flex-col"
>
    {styleString}
    <div
        id="top-row"
        class="flex flex-row items-center justify-center mb-3 gap-4"
    >
        <!-- GRADIENT TYPE SELECT -->
        <div
            id="gradient-type-select"
            class="flex flex-row justify-between"
        >
            <select
                name="gradient-type-select"
                id=""
                bind:value={gradientType}
                class="bg-indigo-900 rounded-lg px-4 flex items-center justify-center shadow-md h-10"
            >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
                <option value="conic">Conic</option>
            </select>
        </div>
        <!-- DIRECTION SELECT -->
        <div id="gradient-direction-select">
            <select name="" id="" class="bg-indigo-900 rounded-lg px-4 flex items-center justify-center shadow-md h-10" bind:value={direction}>
                {#each linearDirections as directionString}
                    <option value={directionString}
                        >{directionMap.get(directionString)}</option
                    >
                {/each}
            </select>
        </div>

        <!-- COPY BUTTONS -->
        <div id="copy-buttons" class="flex flex-row gap-2">
            <button
                class="w-10 h-10 shadow-md flex items-center justify-center bg-indigo-900 rounded-xl hover:opacity-60"
                on:click={() => copyToClipboard(getTailwindBGString())}
            >
                <img src={tailwind} class="w-6 invert" alt="" />
            </button>
            <button
                class="w-10 h-10 shadow-md flex items-center justify-center bg-indigo-900 rounded-xl hover:opacity-60"
                on:click={() => copyToClipboard(getStyleString(gradientType))}
            >
                <img src={code} class="w-6" alt="" />
            </button>
        </div>
    </div>

    <!-- {styleString} -->

    <!-- MAIN DISPLAY -->
    <div
        class="gradient-block-wrapper w-72 h-48 bg-white shadow-md group rounded-xl gr relative mt-12"
    >
        <div
            id="gradient-color-canvas"
            class="absolute shadow-md rounded-xl top-0 bottom-0 left-0 right-0"
            style="background: {styleString}"
        />

        <!-- LEFT DIRECTIONS -->
        <div
            id="left-directions"
            class="absolute top-0 bottom-0 left-0 opacity-0 transition-all group-hover:opacity-100 flex flex-col justify-between p-2"
        >
            <DirectionButton
                currentDirection={direction}
                {setDirection}
                direction={"bg-gradient-to-tl"}
            />
            <DirectionButton
                currentDirection={direction}
                {setDirection}
                direction={"bg-gradient-to-l"}
            />
            <DirectionButton
                currentDirection={direction}
                {setDirection}
                direction={"bg-gradient-to-bl"}
            />
        </div>
        <div
            id="left-directions"
            class="absolute top-2 bottom-2 right-0 opacity-0 transition-all group-hover:opacity-100 flex flex-col justify-between pr-2"
        >
            <DirectionButton
                currentDirection={direction}
                {setDirection}
                direction={"bg-gradient-to-tr"}
            />
            <DirectionButton
                currentDirection={direction}
                {setDirection}
                direction={"bg-gradient-to-r"}
            />
            <DirectionButton
                currentDirection={direction}
                {setDirection}
                direction={"bg-gradient-to-br"}
            />
        </div>
    </div>
    <div id="gradient-line" class="gradient-line mt-12 w-72">
        <div
            class="h-[2px] w-full rounded-lg"
            style="background: {styleString}"
        />
    </div>

    <!-- COLOR HANDLE 1 -->
    <div
        id="gradient-selectors"
        class="w-[470px] flex flex-row justify-between mt-2 relative"
    >
        <button
            use:draggable={{
                axis: "x",
                bounds: "parent",
                defaultPosition: { x: coordOne, y: 0 },
            }}
            on:svelte-drag={(e) => setCoordOne(e.detail.offsetX)}
            class="absolute flex items-center justify-center"
        >
            <div
                class="handle-body rounded-md w-[40px] h-10 px-2"
                style="background-color: {colorOne}; clip-path: polygon(50% 0%, 100% 44%, 100% 100%, 0% 100%, 0% 44%);"
            />
            <div class="slider-tab-position text-xs font-bold" />
            <div
                class="absolute -bottom-10 left-0 right-0 flex items-center justify-center font-bold text-sm"
            >
                {colorOne.substring(1).toUpperCase()}
                {coordOne}%
            </div>
        </button>

        <!-- COLOR HANDLE 2 -->
        <button
            use:draggable={{
                axis: "x",
                bounds: "parent",
                defaultPosition: { x: (430 / coordTwo) * 100, y: 0 },
            }}
            on:svelte-drag={(e) => setCoordTwo(e.detail.offsetX)}
            class="absolute flex items-center justify-center"
        >
            <div
                class="handle-body rounded-md w-[40px] h-10 px-2"
                style="background-color: {colorTwo}; clip-path: polygon(50% 0%, 100% 44%, 100% 100%, 0% 100%, 0% 44%);"
            />
            <div class="slider-tab-position text-xs font-bold" />
            <div
                class="absolute -bottom-10 left-0 right-0 flex items-center justify-center font-bold text-sm"
            >
                {colorTwo.substring(1).toUpperCase()}
                {coordTwo}%
            </div>
        </button>
        <!-- <div class="color-pickers">
            <ColorPicker bind:hex />
        </div> -->
    </div>
    <div
        id="third-color-toggle"
        class="mt-20 w-72 flex flex-row items-center justify-center"
    >
        <label for="third-color">Third Color</label>
        <input type="checkbox" name="third-color" id="" />
    </div>
    <div
        class="w-72 h-72 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    />
    <div class="toast-wrapper">
        <SvelteToast />
    </div>
</section>

<style>
    .toast-wrapper {
        text-align: center;
    }
</style>
