<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import OptionButton from "./OptionButton.svelte";
    import { setContext } from "svelte";
    // @ts-ignore
    import { toast, SvelteToast } from "@zerodevx/svelte-toast";
    import { draggable } from "svelte-drag";
    import {
        copyToClipboard,
        directionMap,
        getGradientLineStyle,
        getStyleStringOv,
    } from "$lib";
    import code from "../../assets/code.png";
    import tailwind from "../../assets/tailwind.svg";
    import DirectionButton from "./DirectionButton.svelte";
    import CodeBlock from "./CodeBlock.svelte";
    import ColorButton from "./ColorButton.svelte";
    import { validateHTMLColorHex } from "validate-color";
    import CPickerWrapper from "./CPickerWrapper.svelte";
    import AddColorButton from "./AddColorButton.svelte";
    // COLOR STATE
    let colorOne: string = "#40c9ff";
    let colorTwo: string = "#e81cff";
    let colorThree: string = "#ff930f";

    let selected: number = 1;

    // DRAG
    let dragOne: boolean = false;

    let coordOne: number = 0;
    let coordTwo: number = 100;
    let coordThree: number = 50;

    let picker: boolean = false;

    const setCoordOne = () => {
        let offset = getOffset("color-1-handle");
        coordOne =
            Math.ceil(Math.floor((offset / getCanvasLength()!) * 100) / 5) * 5;
    };
    const setCoordTwo = () => {
        let offset = getOffset("color-2-handle");
        coordTwo =
            Math.ceil(Math.floor((offset / getCanvasLength()!) * 100) / 5) * 5;
    };
    const setCoordThree = () => {
        let offset = getOffset("color-3-handle");
        coordThree =
            Math.ceil(Math.floor((offset / getCanvasLength()!) * 100) / 5) * 5;
    };

    // DRAG API
    const draggingOne = (e: DragEvent) => {
        console.log(e);
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
    $: coordThree ? (styleString = getStyleString(gradientType)) : null;
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
    $: lineGradientString = getGradientLineStyle(
        colorOne,
        colorTwo,
        colorThree,
        coordOne,
        coordTwo,
        coordThree,
        middleColor
    );

    // UTIL
    const getCanvasLength = () => {
        if (!document) return;
        return document.getElementById("gradient-line")?.offsetWidth!;
    };
    const getOffset = (handleID: string) => {
        let el = document.getElementById(handleID);
        let elOff = el?.getBoundingClientRect();
        let canvasLength = getCanvasLength();
        let line = document.getElementById("gradient-line");
        let lineRect = line?.getBoundingClientRect();
        let x = elOff!.left - lineRect!.left;
        return x;
    };
    const setColorFromInput = (hexString: string, slot: number) => {
        console.log("Setting color", hexString);
        let valid = validateHTMLColorHex(hexString);
        console.log(valid);
        if (validateHTMLColorHex(hexString)) {
            switch (slot) {
                case 1:
                    colorOne = valid ? hexString : colorOne;
                    return;
                case 2:
                    colorTwo = valid ? hexString : colorTwo;
                    return;
                case 3:
                    colorThree = valid ? hexString : colorThree;
                    return;
                default:
                    return;
            }
        }
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
    class="mx-auto flex items-center justify-center flex-col px-4 container max-w-5xl"
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div
            class="gradient-block-wrapper mx-2 lg:mx-0 min-h-[360px] bg-white shadow-md group rounded-xl relative mt-4 lg:mt-0"
        >
            <div
                id="gradient-color-canvas"
                class="absolute shadow-md rounded-xl top-0 bottom-0 left-0 right-0"
                style="background: {styleString}"
            />

            <!-- LEFT DIRECTIONS -->
            <div
                id="left-directions"
                class="absolute top-0 bottom-0 left-0 opacity-0 transition-all group-hover:opacity-100 flex flex-col justify-between p-2 "
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
                id="right-directions"
                class="absolute top-2 bottom-2 right-0 opacity-0 transition-all group-hover:opacity-100 flex flex-col justify-between pr-2 "
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
            <div
                id="top-direction"
                class="absolute top-0 left-0 right-0 opacity-0 transition-all group-hover:opacity-100 flex flex-row justify-center items-center pt-2 z-10 mx-12"
            >
                <DirectionButton
                    currentDirection={direction}
                    {setDirection}
                    direction={"bg-gradient-to-t"}
                />
            </div>
            <div
                id="bottom-direction"
                class="absolute bottom-0 left-0 right-0 opacity-0 transition-all group-hover:opacity-100 flex flex-row justify-center items-center pb-2 z-10 mx-12"
            >
                <DirectionButton
                    currentDirection={direction}
                    {setDirection}
                    direction={"bg-gradient-to-b"}
                />
            </div>
        </div>

        <!-- OPTION CARD -->
        <div
            id="gradient-options-wrapper"
            class="border-[1px] border-opacity-40 shadow-md border-indigo-300 w-full  bg-opacity-30 mt-10 lg:mt-0 rounded-xl p-4 box-border"
        >
            <div
                id="gradient-line"
                class="gradient-line mt-2 w-full lg:mx-0 relative"
            >
                <div
                    id="gradient-track"
                    class="h-[20px] w-full rounded-sm absolute top-1/2"
                    style="background: {lineGradientString}; transform: translate3d(0, -50%,0)"
                />

                <div
                    id="gradient-selectors"
                    class="w-full flex flex-row justify-between"
                >
                    <!-- COLOR HANDLE 1 -->
                    <button
                        id="color-1-handle"
                        draggable="true"
                        on:dragstart={(e) => {
                            dragOne = true;
                        }}
                        on:drag={() => {}}
                        on:dragend={(e) => {
                            dragOne = false;
                        }}
                        on:click={() => (selected = 1)}
                        class="relative z-10 flex items-center justify-center p-2 bg-indigo-950 rounded-md shadow-md border-[1px] border-indigo-900 border-opacity-50"
                        class:border-white={selected == 1}
                    >
                        <div
                            class="handle-body rounded-sm w-[20px] h-6 px-2"
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
                        on:click={() => (selected = 2)}
                        on:svelte-drag={() => setCoordTwo()}
                        class=" flex items-center justify-center p-2 bg-indigo-950 rounded-md shadow-md border-[1px] border-indigo-900 border-opacity-50"
                        class:border-white={selected == 2}
                        >
                        <div
                            class="handle-body rounded-sm w-[20px] h-6 px-2"
                            style="background-color: {colorTwo};"
                        />
                    </button>

                    {#if middleColor}
                        <!-- COLOR HANDLE 3 -->
                        <button
                            id="color-3-handle"
                            use:draggable={{
                                axis: "x",
                                bounds: "parent",
                                defaultPosition: {
                                    x: (getCanvasLength() / coordThree) * 100,
                                    y: 0,
                                },
                            }}
                            on:click={() => (selected = 3)}
                            on:svelte-drag={() => setCoordThree()}
                            class=" flex items-center justify-center p-2 bg-indigo-950 rounded-md shadow-md border-[1px] border-indigo-900 border-opacity-50"
                            class:border-white={selected == 3}
                            >
                            <div
                                class="handle-body rounded-sm w-[20px] h-6 px-2"
                                style="background-color: {colorThree};"
                            />
                        </button>
                    {/if}
                </div>

                {#if !middleColor}
                    <AddColorButton addThird={() => (middleColor = true)} />
                {/if}
            </div>

            <!-- HANDLE SPECIFIC -->
            <div class="mt-10">
                <ColorButton
                    openPicker={() => (picker = !picker)}
                    setColor={setColorFromInput}
                    {selected}
                    labelString={"Color"}
                    color={selected == 1 ? colorOne : colorTwo}
                />
            </div>
            {#if middleColor && selected == 3}
                <button class="" on:click={() => (middleColor = false)}>
                    DELETE
                </button>
            {/if}
            {#if picker}
                <ColorPicker
                    isInput={false}
                    isOpen={picker}
                    hex={selected == 1
                        ? colorOne
                        : selected == 2
                        ? colorTwo
                        : colorThree}
                    components={{ wrapper: CPickerWrapper }}
                    on:input={(e) => setColorFromInput(e.detail.hex, selected)}
                />
            {/if}
            <!-- GRADIENT TYPE SELECT -->
            <div
                id="gradient-type-select"
                class="flex flex-row justify-between mt-4 "
            >
                <select
                    name="gradient-type-select"
                    id=""
                    bind:value={gradientType}
                    class="rounded-lg px-4 flex items-center justify-center shadow-sm h-10 w-full border-[2px] bg-transparent"
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
                    class="rounded-lg px-4 flex items-center justify-center shadow-sm h-10 w-full border-[2px] bg-transparent"
                    bind:value={direction}
                >
                    {#each linearDirections as directionString}
                        <option value={directionString}
                            >{directionMap.get(directionString)}</option
                        >
                    {/each}
                </select>
            </div>

            <div class="css-code mt-4 gap-2 flex flex-col">
                <CodeBlock label={"CSS"} code={"background: " + styleString} />
                <CodeBlock
                    label={"TAILWIND CSS"}
                    code={"background: " + getTailwindBGString()}
                />
            </div>
        </div>
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
