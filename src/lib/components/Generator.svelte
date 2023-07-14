<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import OptionButton from "./OptionButton.svelte";
    import { setContext } from "svelte";

    // COLOR STATE
    let colorOne: string = "#40c9ff";
    let colorTwo: string = "#ff930f";
    let colorThree: string = "#e81cff";

    let coordOne: number = 0;
    let coordTwo: number = 20;
    let coordThree: number = 100;

    let middleColor: boolean = false;

    let hex: string;

    
    type GradientTypes = "linear" | "radial" | "conic";
    let gradientType: string = "linear";
    
    const setGradientType = (string: string) => {
        (gradientType = string.toLowerCase())
        styleString = getStyleString()
    };
    setContext("setGradientType", { setGradientType });
    
    // SET STATE OF CURRENTLY DISPLAYED GRADIENT AS NORMAL CSS STYLE (NOT TAILWINDS CLASSES)
    const getStyleString = (): string => {
        // RADIAL
        if (gradientType == "radial")
        return `radial-gradient(${colorOne} ${coordOne}%, ${
            middleColor ? colorTwo + " " + coordTwo + "%," : ""
        } ${colorThree} ${coordThree}%`;
        
        // LINEAR
        if (gradientType == "linear")
        return `linear-gradient(to right, ${colorOne} ${coordOne}%, ${
            middleColor ? colorTwo + " " + coordTwo + "%," : ""
        } ${colorThree} ${coordThree}%`;

        // CONIC
        if (gradientType == "conic")
        return `conic-gradient(${colorOne} ${coordOne}%, ${
            middleColor ? colorTwo + " " + coordTwo + "%," : ""
        } ${colorThree} ${coordThree}%`;

        // FALLBACK
        return ``;
    };

    const getConicString = () => {

    }

    // For user to copy
    const getTailwindBGString = (): string => {
        return ``;
    };
    const getTailwindTextString = (): string => {
        return `bg-clip-text  bg-gradient-to-br from-[${colorOne}] ${
            middleColor ? `via-[#${colorTwo}]` : ""
        } to-[${colorThree}]"`;
    };
    
    let styleString = getStyleString()

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
    <!-- GRADIENT TYPE SELECT -->
    <div
        id="gradient-type-select"
        class="w-72 flex flex-row justify-between mb-3"
    >
        <OptionButton
            on:click={() => (gradientType = "linear")}
            currentType={gradientType}
            title={"Linear"}
        />
        <OptionButton
            on:click={() => (gradientType = "radial")}
            currentType={gradientType}
            title={"Radial"}
        />
        <OptionButton
            on:click={() => (gradientType = "conic")}
            currentType={gradientType}
            title={"Conic"}
        />
    </div>

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
    {styleString}
    <div id="gradient-line" class="gradient-line mt-4 w-72">
        <div
            class="h-2 w-full rounded-lg"
            style="background: {styleString}"
        />
    </div>
    <div
        id="gradient-selectors"
        class="w-72 flex flex-row justify-between mt-2 relative"
    >
        <button
            class="absolute rounded-md w-8 h-10 px-2"
            style="background-color: {colorOne};"
            style:transform={`translate3d(${coordOne}px, 0, 0)`}
        />
        <button
            class="absolute rounded-md w-8 h-10 px-2"
            style="background-color: {colorThree};"
            style:transform={`translate3d(${coordThree}px, 0, 0)`}
        />
        <!-- <div class="color-pickers">
            <ColorPicker bind:hex />
        </div> -->
    </div>
</section>
