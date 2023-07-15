<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import OptionButton from "./OptionButton.svelte";
    import { setContext } from "svelte";
    // @ts-ignore
    import { toast, SvelteToast } from "@zerodevx/svelte-toast";
    import { draggable } from "svelte-drag";
    import { copyToClipboard, getStyleStringOv } from "$lib";
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
        coordOne = Math.floor((offset / 430) * 100);
    };
    const setCoordTwo = (offset: number) => {
        coordTwo = Math.floor((offset / 430) * 100);
    };
    const setCoordThree = (offset: number) => {
        coordThree = Math.floor((offset / 430) * 100);
    };

    let middleColor: boolean = false;

    let direction: string = "bg-gradient-to-r"
   
    const setDirection = (dirString: string) => {
        direction = dirString
    }

    type GradientTypes = "linear" | "radial" | "conic";
    let gradientType: string = "linear";

    const setGradientType = (string: string) => {
        gradientType = string.toLowerCase();
        styleString = getStyleString(gradientType);
    };
    setContext("setGradientType", { setGradientType });

    // SET STATE OF CURRENTLY DISPLAYED GRADIENT AS NORMAL CSS STYLE (NOT TAILWINDS CLASSES)
    const getStyleString = (gradientType: string): string => {
        // RADIAL
        if (gradientType == "radial")
            return `radial-gradient(${colorOne} ${coordOne}%, ${
                middleColor ? colorThree + " " + coordThree + "%," : ""
            } ${colorTwo} ${coordTwo}%`;

        // LINEAR
        if (gradientType == "linear")
            return `linear-gradient(to right, ${colorOne} ${coordOne}%, ${
                middleColor ? colorThree + " " + coordThree + "%," : ""
            } ${colorTwo} ${coordTwo}%`;

        // CONIC
        if (gradientType == "conic")
            return `conic-gradient(${colorOne} ${coordOne}%, ${
                middleColor ? colorThree + " " + coordThree + "%," : ""
            } ${colorTwo} ${coordTwo}%`;

        // FALLBACK
        return ``;
    };

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
    $: direction ? (styleString = getStyleStringOv(gradientType, colorOne, colorTwo, middleColor ? colorThree : null,coordOne, coordTwo, middleColor ? coordThree : null, direction)) : null;

    // UTIL
    const getLength = () => {
        if (!document) return;
        console.log(document.getElementById("gradient-line")?.scrollWidth);
        return document.getElementById("gradient-line")?.offsetWidth || 320;
    };
</script>

<section
    id="generator-wrapper"
    class="max-w-xl mx-auto flex items-center justify-center flex-col"
>
{styleString}
    <div
        id="top-row"
        class="flex flex-row items-center justify-between w-72 mb-3"
    >
        <!-- GRADIENT TYPE SELECT -->
        <div
            id="gradient-type-select"
            class="w-72 flex flex-row justify-between"
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
        class="gradient-block-wrapper w-72 h-48 bg-white shadow-md rounded-xl relative mt-12"
    >
        <div
            id="gradient-color-canvas"
            class="absolute shadow-md rounded-xl top-0 bottom-0 left-0 right-0"
            style="background: {styleString}"
        />

        <!-- LEFT DIRECTIONS -->
        <div id="left-directions" class="absolute -top-10 -bottom-10 -left-10 flex flex-col justify-between">
            <DirectionButton currentDirection={direction}  setDirection={setDirection} direction={'bg-gradient-to-tl'}></DirectionButton>
            <DirectionButton currentDirection={direction}  setDirection={setDirection} direction={'bg-gradient-to-l'}></DirectionButton>
            <DirectionButton currentDirection={direction}  setDirection={setDirection} direction={'bg-gradient-to-bl'}></DirectionButton>

        </div>
        <div id="left-directions" class="absolute -top-10 -bottom-10 -right-10 flex flex-col justify-between">
            <DirectionButton currentDirection={direction}  setDirection={setDirection} direction={'bg-gradient-to-tr'}></DirectionButton>
            <DirectionButton currentDirection={direction}  setDirection={setDirection} direction={'bg-gradient-to-r'}></DirectionButton>
            <DirectionButton currentDirection={direction}  setDirection={setDirection} direction={'bg-gradient-to-br'}></DirectionButton>

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
    <div class="toast-wrapper">
        <SvelteToast />
    </div>
</section>

<style>
    .toast-wrapper {
        text-align: center;
    }
</style>
