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
    let colors: DefaultColor[] = [];
    let selected: number = 0;
    let styleString: string = "linear-gradient(to right, from black, to white)";
</script>

<section id="default-colors-generator">
    <div class="default-generator-wrapper max-w-screen-xl mx-auto p-4">
        <div class="grid-container grid grid-cols-1 md:grid-cols-2 gap-10 grid-rows-2">
            <div class="cols-span-1 relative">
                <GradientCanvas styleString={styleString} />
            </div>
            <div class="col-span-1 relative">
                <DefaultColorPallette setColor={()=>{}}></DefaultColorPallette>
            </div>
            <div class="col-span-1">
                
            </div>
        </div>
        
    </div>
</section>
