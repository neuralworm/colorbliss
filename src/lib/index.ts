// place files you want to import through the `$lib` alias in this folder.
import {toast} from '@zerodevx/svelte-toast'
import hexrgb from 'hex-rgb'
import rgbhex from 'rgb-hex'

// DIMENSION
export const getWidth = (): number|undefined => {
    return document.getElementById('gradient-line')?.offsetWidth
}


// COPY FUNCTIONS
export const getTailwindBGString = (): string => {
    return `this`;
};
export const getTailwindTextString = (colorOne: string, colorTwo: string, colorThree: string|null = null, coordOne: number, coordTwo: number, coordThree: number|null = null): string => {
    return `bg-clip-text  bg-gradient-to-br from-[${colorOne}] ${
        colorThree ? `via-[#${colorThree}]` : ""
    } to-[${colorTwo}]"`;
};
export const copyToClipboard = (styleString: string) => {
    navigator.clipboard.writeText(styleString)
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

// CSS STYLE BUILDERS
const linear_css_template = "linear-gradient(DIRECTION, COLOR_1, COLOR_2, COLOR_3"
const radial_css_template = "radial-gradient(at COORD_1 COORD_2, COLOR_1, COLOR_2, COLOR_3)"
const conical_css_template = "conic-gradient(at COORD_1 COORD_2, COLOR_1, COLOR_2, COLOR_3)"

export const getStyleStringOv = (gradientType: string, colors: Color[], direction: string): string => {
    let ordered = getOrdered(colors)
    if(ordered.length == 1) return `${ordered[0].hex}`
    // RADIAL
    if (gradientType == "radial")
        return `radial-gradient(${ordered[0].hex} ${ordered[0].pos}%, ${
            ordered[2] ? ordered[2].hex + " " + ordered[2].pos + "%," : ""
        } ${ordered[1].hex} ${ordered[1].pos}%)`;

    // LINEAR
    if (gradientType == "linear")
        return `linear-gradient(${directionMap.get(direction)}, ${ordered[0].hex} ${ordered[0].pos}%, ${
            ordered[2] ? (ordered[1].hex + " " + ordered[1].pos + "%, " + ordered[2].hex + " " + ordered[2].pos + "%") : ` ${ordered[1].hex} ${ordered[1].pos}%)`}`;

    // CONIC
    if (gradientType == "conic")
        return `conic-gradient(${ordered[0].hex} ${ordered[0].pos}%, ${
            ordered[2] ? ordered[2].hex + " " + ordered[2].pos + "%," : ""
        } ${ordered[1].hex} ${ordered[1].pos}%)`;

    // FALLBACK
    return ``;
};
export const getOrdered = (colors: Color[]): Color[] => {
    return colors.sort((a: Color, b: Color) => a.pos - b.pos)
}
export const getGradientLineStyle = (colors: Color[]) => {
    let ordered: Color [] = getOrdered(colors)
    if(ordered.length == 1) return `${ordered[0].hex}`
    return `linear-gradient(to right, ${ordered[0].hex} ${ordered[0].pos}%, ${
        ordered[2] ? ordered[1].hex + " " + ordered[1].pos + "%," + ordered[2].hex + " " + ordered[2].pos + "%)" : ordered[1].hex + " " + ordered[1].pos + "%)"
    }`;
}

// TAILWIND CLASSES BUILDER
const linear_tw_template = "DIRECTION from-[COLOR_1] from via-[COLOR_3] to-[COLOR_2]"
const radial_tw_template = "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[COLOR_1] from via-[COLOR_3] to-[COLOR_2]"
const conical_tw_template = "bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-[COLOR_1] from via-[COLOR_3] to-[COLOR_2]"

const getFrom = (number: number): string => {
    if(number % 5 == 0) return `from-${number}%`
    return `from-[${number}%]`
}
const getVia = (number: number): string => {
    if(number % 5 == 0) return `via-${number}%`
    return `via-[${number}%]`
}
const getTo = (number: number): string => {
    if(number % 5 == 0) return `to-${number}%`
    return `to-[${number}%]`
}



// K: TAILWIND STRING, V: CSS STYLE VALUE
export const directionMap: Map<string, string> = new Map<string,string>([
    ["bg-gradient-to-r", "to right"],
    ["bg-gradient-to-tr", "to top right"],
    ["bg-gradient-to-br", "to bottom right"],
    ["bg-gradient-to-l", "to left"],
    ["bg-gradient-to-tl", "to top left"],
    ["bg-gradient-to-bl", "to bottom left"],
    ["bg-gradient-to-t", "to top"],
    ["bg-gradient-to-b", "to bottom"],
])


// RANDOM
const randomizeGradient = () => {
    
}
const getRandomHex = (): string => {
    let r: number = getRandom8bit()
    let g: number = getRandom8bit()
    let b: number = getRandom8bit()
    return r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0")
}
const getRandom8bit = () => {
    return Math.floor(Math.random() * 256)
}
// HEX
export const getBetweenTwo = (hex1: string, hex2: string, ratio: number): string => {
    // ratio should be between 0 and 1
    let rgb1 = hexrgb(hex1)
    let rgb2 = hexrgb(hex2)
    console.log(rgb1, rgb2)
    let redDiff = rgb1.red - rgb2.red
    let greenDiff = rgb1.green - rgb2.green
    let blueDiff = rgb1.blue - rgb2.blue
    console.log(redDiff, greenDiff, blueDiff)
    redDiff *= ratio
    greenDiff *= ratio
    blueDiff *= ratio
    let newHex: string = rgbhex(rgb1.red - redDiff, rgb1.green - greenDiff, rgb1.blue - blueDiff)
    return "#" + newHex
}


// SAVE
export const saveCurrentGradient = (colors: Color[]) => {
    localStorage.setItem('colorsCurrent', JSON.stringify(colors))
}
export const loadCurrentGradient = (): string|null => {
    let loaded: string|null = localStorage.getItem('colorsCurrent')
    return loaded
}