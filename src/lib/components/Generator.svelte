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
    import CodeBlock from "./CodeBlock.svelte";

    // COLOR STATE
    let colorOne: string = "#40c9ff";
    let colorTwo: string = "#e81cff";
    let colorThree: string = "#ff930f";

    // SELECTED OPTIONS
    enum Color {
        one,
        two,
        three,
    }
    let selected: Color = Color.one;

    // DRAG
    let dragOne: boolean = false;

    let coordOne: number = 0;
    let coordTwo: number = 100;
    let coordThree: number = 50;

    const setCoordOne = () => {
        let offset = getOffset('color-1-handle')
        coordOne =
            Math.ceil(Math.floor((offset / getCanvasLength()!) * 100) / 5) * 5;
    };
    const setCoordTwo = () => {
        let offset = getOffset('color-2-handle')
        coordTwo =
            Math.ceil(Math.floor((offset / getCanvasLength()!) * 100) / 5) * 5;
    };
    const setCoordThree = () => {
        let offset = getOffset('color-3-handle')
        coordThree =
            Math.ceil(Math.floor((offset / getCanvasLength()!) * 100) / 5) * 5;
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
        let { color1, coord1, color2, coord2, color3, coord3 } = reorder(
            colorOne,
            coordOne,
            colorTwo,
            coordTwo,
            colorThree,
            coordThree
        );
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
    type Position = [string, number]; // [color, coord]
    // Reorders colors in ascending numeric order
    const reorder = (
        colorOne: string,
        coordOne: number,
        colorTwo: string,
        coordTwo: number,
        colorThree: string,
        coordThree: number
    ) => {
        let array: Position[] = [
            [colorOne, coordOne],
            [colorTwo, coordTwo],
            [colorThree, coordThree],
        ];
        let ordered: Position[] = array.sort((a, b) => {
            return a[1] - b[1];
        });
        return {
            color1: ordered[0][0],
            coord1: ordered[0][1],
            color2: ordered[1][0],
            coord2: ordered[1][1],
            color3: ordered[2][0],
            coord3: ordered[2][1],
        };
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
    const getCanvasLength = () => {
        if (!document) return;
        return document.getElementById("gradient-line")?.offsetWidth!;
    };
    const getOffset = (handleID: string) => {
        let el = document.getElementById(handleID)
        let elOff = el?.getBoundingClientRect()
        let canvasLength = getCanvasLength()
        let line = document.getElementById('gradient-line')
        let lineRect = line?.getBoundingClientRect()
        let x = elOff!.left - lineRect!.left
        return x
        
    }

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
    class="max-w-xl mx-auto flex items-center justify-center flex-col px-4"
>
    <div
        id="top-row"
        class="flex flex-row items-center justify-center mb-3 gap-4 max-w-full"
    >
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
        class="gradient-block-wrapper w-full mx-2 lg:mx-0 h-48 bg-white shadow-md group rounded-xl gr relative mt-4"
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

    <!-- OPTION CARD -->
    <div
        id="gradient-options-wrapper"
        class="border-[1px] border-opacity-20 shadow-md border-white w-full mt-10 rounded-xl p-4 box-border"
    >
        <div id="gradient-line" class="gradient-line mt-2  w-full lg:mx-0 relative">
            <div
            id="gradient-track"
                class="h-[20px] w-full rounded-sm absolute top-1/2"
                style="background: {styleString}; transform: translate3d(0, -50%,0)"
            />
            <!-- COLOR HANDLE 1 -->
            <div
                id="gradient-selectors"
                class="w-full flex flex-row justify-between "
            >
                <button
                id="color-1-handle"
                    use:draggable={{
                        axis: "x",
                        bounds: "parent",
                        defaultPosition: { x: coordOne, y: 0 },
                    }}
                    on:click={()=> selected = Color.one}
                    on:svelte-drag={() => setCoordOne()}
                    class=" flex items-center justify-center p-2 bg-indigo-950 rounded-md shadow-md"
                >
                    <div
                        class="handle-body rounded-sm w-[20px] h-10 px-2"
                        style="background-color: {colorOne};"
                    />
                    
                </button>

                <!-- COLOR HANDLE 2 -->
                <button
                id="color-2-handle"
                    use:draggable={{
                        axis: "x",
                        bounds: "parent",
                        defaultPosition: {
                            x: (getCanvasLength() / coordTwo) * 100,
                            y: 0,
                        },
                    }}
                    on:click={()=> selected = Color.two}
                    on:svelte-drag={() => setCoordTwo()}
                    class=" flex items-center justify-center p-2 bg-indigo-950 rounded-md shadow-md"
                >
                    <div
                        class="handle-body rounded-sm w-[20px] h-10 px-2"
                        style="background-color: {colorTwo};;"
                    />
                  
                </button>
           
            </div>
        </div>

        <!-- HANDLE SPECIFIC -->
        <div class="mt-10">
            {colorOne}

        </div>

        <!-- GRADIENT TYPE SELECT -->
        <div
            id="gradient-type-select"
            class="flex flex-row justify-between mt-4"
        >
            <select
                name="gradient-type-select"
                id=""
                bind:value={gradientType}
                class="bg-indigo-900 rounded-lg px-4 flex items-center justify-center shadow-md h-10 w-full"
            >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
                <option value="conic">Conic</option>
            </select>
        </div>
        <!-- DIRECTION SELECT -->
        <div id="gradient-direction-select" class="mt-4">
            <select
                name=""
                id=""
                class="bg-indigo-900 rounded-lg px-4 flex items-center justify-center shadow-md h-10 w-full"
                bind:value={direction}
            >
                {#each linearDirections as directionString}
                    <option value={directionString}
                        >{directionMap.get(directionString)}</option
                    >
                {/each}
            </select>
        </div>

        <div class="css-code mt-2">
            <CodeBlock label={"CSS"} code={"background: " + styleString} />
        </div>
    </div>

    <div
        id="third-color-toggle"
        class="mt-20 w-full mx-2 lg:mx-0 flex flex-row items-center justify-center"
    >
        <label for="third-color">Third Color</label>
        <input type="checkbox" name="third-color" id="" />
    </div>
    <div
        class="w-full mx-2 lg:mx-0 h-72 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
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
