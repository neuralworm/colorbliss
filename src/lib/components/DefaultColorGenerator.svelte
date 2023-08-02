<script lang="ts">
    import defaultColors from "$lib/data/DefaultColors";
    import { defaultSteps } from "$lib/data/DefaultColors";
    import DefaultColorPallette from "./DefaultColorPallette.svelte";
    import GradientCanvas from "./GradientCanvas.svelte";
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
    let types: "linear"|"radial"|"conic"
    let type: string = "linear"
    let tailwindString: string = "bg-gradient-to-r from-black to-white";

    $: tailwindString = getTailwindString(colors);
    const getTailwindString = (colors: DefaultColor[]): string => {
        let colorOne = colors[0];
        if (colors.length == 1) return `bg-${colorOne.color}-${colorOne.step}`;
        let colorTwo = colors[1];
        return `bg-gradient-to-r from-${colorOne.color}-${colorOne.step} to-${colorTwo.color}-${colorTwo.step}`;
    };
</script>

<section id="default-colors-generator">
    <div class="default-generator-wrapper max-w-screen-xl mx-auto p-12">
        <div
            class="grid-container grid grid-cols-1 md:grid-cols-2 gap-10 grid-rows-2"
        >
            <div class="cols-span-1 relative">
                <GradientCanvas {tailwindString} />
            </div>
            <div class="col-span-1 relative">
                <DefaultColorPallette setColor={() => {}} />
            </div>
            <div class="col-span-1" />
        </div>
    </div>
</section>
