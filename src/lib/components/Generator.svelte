<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import OptionButton from "./OptionButton.svelte";
    import { onMount, setContext } from "svelte";
    // @ts-ignore
    import { toast, SvelteToast } from "@zerodevx/svelte-toast";
    import { draggable } from "svelte-drag";
    import {
        copyToClipboard,
        directionMap,
        getBetweenTwo,
        getGradientLineStyle,
        getOrdered,
        getStyleStringOv,
        getWidth,
    } from "$lib";
    import code from "../../assets/code.png";
    import tailwind from "../../assets/tailwind.svg";
    import DirectionButton from "./DirectionButton.svelte";
    import CodeBlock from "./CodeBlock.svelte";
    import ColorButton from "./ColorButton.svelte";
    import { validateHTMLColorHex } from "validate-color";
    import CPickerWrapper from "./CPickerWrapper.svelte";
    import AddColorButton from "./AddColorButton.svelte";
    import { v4 as uuid } from "uuid";
    import ColorHandle from "./layout/ColorHandle.svelte";

    // COLOR STATE
    let colorOne: string = "#40c9ff";
    let colorTwo: string = "#e81cff";
    let colorThree: string = "#ff930f";
    let defaultOne: Color = {
        hex: "#40c9ff",
        pos: 0,
        id: uuid(),
    };
    let defaultTwo: Color = {
        hex: "#e81cff",
        pos: 100,
        id: uuid(),
    };
    // MANAGE COLOR LIST
    let colors: Color[] = [defaultOne, defaultTwo];
    const lineClickHandler = (e: MouseEvent) => {
        if (colors.length >= 3) return;
        // Get click position and get color
        let width = getWidth();
        let trackPositionX = document
            .getElementById("gradient-track")
            ?.getBoundingClientRect().left;
        let mouseX = e.clientX;
        let diff: number = mouseX - trackPositionX;
        let position: number = Math.round((diff / width) * 100);

        // get side colors
        let ordered = getOrdered(colors);
        let hex1, hex2, ratio;
        if (position < ordered[0].pos) {
            hex1 = ordered[0].hex;
            hex2 = ordered[0].hex;
            ratio = position / ordered[0].pos;
        } else if (position > ordered[0].pos && position < ordered[1].pos) {
            hex1 = ordered[0].hex;
            hex2 = ordered[1].hex;
            ratio =
                (position - ordered[0].pos) / (ordered[1].pos - ordered[0].pos);
        } else {
            hex1 = ordered[1].hex;
            hex2 = ordered[1].hex;
            ratio = (position - ordered[1].pos) / (1 - ordered[1].pos);
        }
        console.log(hex1, hex2, ratio);
        let newHex = getBetweenTwo(hex1, hex2, ratio);
        console.log(newHex);

        addColor(newHex, position);
    };
    const addColor = (hex: string, position: number) => {
        if (colors.length >= 3) return;
        let newColor: Color = {
            hex: hex,
            pos: position,
            id: uuid()
        };
        let newColors = JSON.parse(JSON.stringify(colors))
        newColors.push(newColor);
        colors = newColors
    };
    const removeColor = (id: string) => {
        if(colors.length <= 1) return
        let newColors = JSON.parse(JSON.stringify(colors))
        let index = colors.map((color: Color) => color.id).indexOf(id);
        if (index < 0) return;
        newColors.splice(index, 1)
        colors = newColors
        selected = 0
    };

    const createHandleComponent = (color: Color) => {
        console.log('Creating handle for: ' + color.id)
        let newHandleRef = new ColorHandle({
            target: document.getElementById("color-handles")!,
            props: {
                id: color.id,
                selected: true,
                hex: color.hex,
                select: () => selected = colors.map((val: Color)=> val.id).indexOf(color.id),
                pos: color.pos,
                color: color
            },
        });
    };

    let selected: number = 0;

    let picker: boolean = false;

    let direction: string = "bg-gradient-to-r";

    const setDirection = (dirString: string) => {
        direction = dirString;
    };

    type GradientTypes = "linear" | "radial" | "conic";
    let gradientType: string = "linear";

    const setGradientType = (string: string) => {
        gradientType = string.toLowerCase();
        styleString = getStyleStringOv(gradientType, colors, direction);
    };
    setContext("setGradientType", { setGradientType });

    // SET STATE OF CURRENTLY DISPLAYED GRADIENT AS NORMAL CSS STYLE (NOT TAILWINDS CLASSES)

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

    // REACTIVE
    $: styleString = getStyleStringOv(gradientType, colors, direction);
    $: direction
        ? (styleString = getStyleStringOv(gradientType, colors, direction))
        : null;
    $: lineGradientString = getGradientLineStyle(colors);

    onMount(() => {
        document.ondragover = (e) => {
            mouseX = e.clientX;
        };

        // SETUP DEFAULT HANDLES
        // createHandleComponent(colors[0])
        // createHandleComponent(colors[1])


    });

    // UTIL
    const getCanvasLength = () => {
        if (!document) return;
        return document.getElementById("gradient-line")?.offsetWidth!;
    };
    const getOffsetPercent = (handleID: string, e: DragEvent): number => {
        let canvasLength = getCanvasLength();
        let line = document.getElementById("gradient-line");
        let lineRect = line?.getBoundingClientRect();
        let x = mouseX - lineRect!.left;
        x = (x / canvasLength!) * 100;
        if (x < 0) return 0;
        if (x > 100) return 100;
        return x;
    };
    const setColorFromInput = (hexString: string, slot: number) => {
        console.log("Setting color", hexString);
        let valid = validateHTMLColorHex(hexString);
        console.log(valid);
        if (validateHTMLColorHex(hexString)) {
            switch (slot) {
                case 0:
                    colors[0].hex = valid ? hexString : colors[0].hex;
                    return;
                case 1:
                    colors[1].hex = valid ? hexString : colors[1].hex;
                    return;
                case 2:
                    colors[2].hex = valid ? hexString : colors[2].hex;
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
                id="right-directions"
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
            class="border-[1px] border-opacity-40 shadow-md border-indigo-300 w-full bg-opacity-30 mt-10 lg:mt-0 rounded-xl p-4 box-border"
        >
            <div
                id="gradient-line"
                class="gradient-line mt-2 w-full lg:mx-0 relative"
            >
                <!-- LINE COMPONENT -->
                <div
                    id="gradient-track"
                    class="h-[14px] w-full rounded-md absolute top-1/2"
                    style="background: {lineGradientString}; transform: translate3d(0, -50%,0)"
                    on:mousedown={(e) => lineClickHandler(e)}
                />

                <!-- COMPONENT TARGET -->
                <div
                    id="color-handles"
                    class="w-full flex flex-row justify-between"
                >
                    {#each colors as color}
                        <ColorHandle id={color.id} color={color} hex={color.hex} selected={selected == colors.map(v=>v.id).indexOf(color.id)} select={()=> selected = colors.map((val)=> val.id).indexOf(color.id)} pos={color.pos}></ColorHandle>
                    {/each}
                </div>
            </div>

            <!-- HANDLE SPECIFIC -->
            <div class="mt-10">
                <ColorButton
                    openPicker={() => (picker = !picker)}
                    setColor={setColorFromInput}
                    {selected}
                    labelString={"Color"}
                    color={colors[selected].hex}
                />
            </div>
            <button on:click={() => removeColor(colors[selected].id)}>delete</button>
            {#if picker}
                <ColorPicker
                    isInput={false}
                    isOpen={picker}
                    hex={colors[selected].hex}
                    components={{ wrapper: CPickerWrapper }}
                    on:input={(e) => setColorFromInput(e.detail.hex, selected)}
                />
            {/if}
            <!-- GRADIENT TYPE SELECT -->
            <div
                id="gradient-type-select"
                class="flex flex-row justify-between mt-4"
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
