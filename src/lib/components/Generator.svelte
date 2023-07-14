<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import OptionButton from "./OptionButton.svelte";
    import { setContext } from "svelte";
    // @ts-ignore
    import { toast, SvelteToast } from '@zerodevx/svelte-toast'
    import {draggable} from 'svelte-drag'

    // COLOR STATE
    let colorOne: string = "#40c9ff";
    let colorTwo: string = "#e81cff";
    let colorThree: string = "#ff930f";

    // DRAG 
    let dragOne: boolean = false

    let coordOne: number = 0;
    let coordTwo: number = 20;
    let coordThree: number = 100;

    const setCoordOne = (offset: number) => {
        coordOne = Math.floor((offset / 430) * 100)
    }
    const setCoordTwo = (offset: number) => {
        coordTwo = Math.floor((offset / 430) * 100)
    }
    const setCoordThree = (offset: number) => {
        coordThree = Math.floor((offset / 430) * 100)
    }






    let middleColor: boolean = false;

    let hex: string;

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getTailwindBGString())
        toast.push("Copied to clipboard.", {
            duration: 3000,
            dismissable: false,
            theme: {
                '--toastBarHeight': 0,
                "--toastBackground": "rgb(49, 46, 129)",
                "--toastColor": "white",
                "--toastBorderRadius": "20px"
            }
        })
    }

    $: styleString = getStyleString(gradientType);
    $: coordOne ? styleString = getStyleString(gradientType) : null;
    $: coordTwo ? styleString = getStyleString(gradientType) : null;



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
    <div id="top-row" class="flex flex-row items-center justify-between w-72 mb-3">
        <!-- GRADIENT TYPE SELECT -->
        <div
            id="gradient-type-select"
            class="w-72 flex flex-row justify-between "
        >
            <select
                name="gradient-type-select"
                id=""
                bind:value={gradientType}
                class="bg-indigo-900 rounded-lg px-4 py-1 flex items-center justify-center"
            >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
                <option value="conic">Conic</option>
            </select>
        </div>
        <!-- COPY BUTTONS -->
        <div id="copy-buttons"  class="flex flex-row gap-2">
            <button class="w-10 h-10 bg-indigo-900 rounded-xl hover:opacity-60" on:click={()=> copyToClipboard()}>
CT
            </button>
            <button class="w-10 h-10 bg-indigo-900 rounded-xl hover:opacity-60" on:click={()=> copyToClipboard()}>
CS
            </button>
        </div>
    </div>

    <!-- {styleString} -->
    <!-- MAIN DISPLAY -->
    <div
        class="gradient-block-wrapper w-72 h-48 bg-white overflow-hidden rounded-xl relative"
    >
        <div
            id="gradient-color-canvas"
            class="absolute top-0 bottom-0 left-0 right-0"
            style="background: {styleString}"
        />
    </div>
    <div id="gradient-line" class="gradient-line mt-4 w-72">
        <div class="h-2 w-full rounded-lg" style="background: {styleString}" />
    </div>
    <div
        id="gradient-selectors"
        class="w-[470px] flex flex-row justify-between mt-2 relative"
    >
        <button
            use:draggable={{axis: 'x', bounds: 'parent', defaultPosition: {x: coordOne, y: 0}}}
            on:svelte-drag={(e)=> setCoordOne(e.detail.offsetX)}
            class="absolute rounded-md w-[40px] h-10 px-2"
            style="background-color: {colorOne};"
            style:transform={`translate3d(${coordOne}px, 0, 0)`}
        />
        <button
            use:draggable={{axis: 'x', bounds: 'parent', defaultPosition: {x: coordOne, y: 0}}}
            on:svelte-drag={(e)=> setCoordTwo(e.detail.offsetX)}
            class="absolute rounded-md w-[40px] h-10 px-2"
            style="background-color: {colorTwo};"
            style:transform={`translate3d(${coordTwo}px, 0, 0)`}
        />
        <!-- <div class="color-pickers">
            <ColorPicker bind:hex />
        </div> -->
    </div>
    <div id="third-color-toggle" class="mt-12 w-72 flex flex-row items-center justify-center">
        <label for="third-color">Third Color</label>
        <input type="checkbox" name="third-color" id="">
    </div>
    <div class="toast-wrapper">

        <SvelteToast />
    </div>
</section>

<style>
       .toast-wrapper{
        text-align: center;
       }
</style>