<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';
    import OptionButton from './OptionButton.svelte';
    import { setContext } from 'svelte';

    // COLOR STATE
    let colorOne: string = "#40c9ff"
    let colorTwo: string = "#ff930f"
    let colorThree: string = "#e81cff"

    let coordOne: number = 0
    let coordTwo: number = 20
    let coordThree: number = 100

    let middleColor: boolean = false
    
    let hex: string

    type GradientTypes = 'linear'|'radial'|'conic'
    let gradientType: string = "linear"

    const setGradientType = (string: string) => gradientType = string
    setContext('setGradientType', {setGradientType})
  
    // To dispaly accurate gradient in this app
    const getStyleString = (): string => {
        return `linear-gradient(to right, ${colorOne} ${coordOne}%, ${middleColor ? colorTwo + " " + coordTwo + "%," : ""} ${colorThree} ${coordThree}%`
    }
    // For user to copy
    const getTailwindBGString = (): string => {
        return ``
    }
    const getTailwindTextString = (): string => {
        return `bg-clip-text  bg-gradient-to-br from-[${colorOne}] ${middleColor ? `via-[#${colorTwo}]` : ""} to-[${colorThree}]"`
    }
</script>

<section id="generator-wrapper" class="max-w-xl mx-auto flex items-center justify-center flex-col">
    <!-- GRADIENT TYPE SELECT -->
    <div id="gradient-type-select" class="w-72 flex flex-row justify-between mb-3">
        <OptionButton on:click={()=>gradientType = "linear"} currentType={gradientType} title={"Linear"}></OptionButton>
        <OptionButton on:click={()=>gradientType = "radial"} currentType={gradientType} title={"Radial"}></OptionButton>
        <OptionButton on:click={()=>gradientType = "conic"} currentType={gradientType} title={"Conic"}></OptionButton>

    </div>

    <!-- MAIN DISPLAY -->
    <div class="gradient-block-wrapper w-72 h-48 bg-white overflow-hidden rounded-lg relative">
        <div id="gradient-color-canvas" class="absolute top-0 bottom-0 left-0 right-0" style="background: {getStyleString()}">

        </div>
    </div>


    <div class="gradient-line mt-4 w-72">
        <div class="h-2 w-full rounded-lg" style="background: {getStyleString()}"></div>
    </div>
    <div id="gradient-selectors" class="w-72 flex flex-row justify-between mt-6">
        <button class="rounded-md px-2" style="background-color: {colorOne};">
            ONE
        </button>
        <button class="rounded-md px-2" style="background-color: {colorThree};">
            TWO
        </button>
        <div class="color-pickers">
            <ColorPicker bind:hex />
        </div>
    </div>
</section>