// place files you want to import through the `$lib` alias in this folder.
import {toast} from '@zerodevx/svelte-toast'
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

export const getStyleStringOv = (gradientType: string, colorOne: string, colorTwo: string, colorThree: string|null = null, coordOne: number, coordTwo: number, coordThree: number|null = null, direction: string): string => {
    let {color1, coord1, color2, coord2, color3, coord3} = reorder(colorOne, coordOne, colorTwo, coordTwo, colorThree, coordThree)
    // RADIAL
    if (gradientType == "radial")
        return `radial-gradient(${colorOne} ${coordOne}%, ${
            colorThree ? colorThree + " " + coordThree + "%," : ""
        } ${colorTwo} ${coordTwo}%`;

    // LINEAR
    if (gradientType == "linear")
        
        return `linear-gradient(${directionMap.get(direction)}, ${colorOne} ${coordOne}%, ${
            colorThree ? colorThree + " " + coordThree + "%," : ""
        } ${colorTwo} ${coordTwo}%`;

    // CONIC
    if (gradientType == "conic")
        return `conic-gradient(${colorOne} ${coordOne}%, ${
            colorThree ? colorThree + " " + coordThree + "%," : ""
        } ${colorTwo} ${coordTwo}%`;

    // FALLBACK
    return ``;
};
type Position = [string, number] // [color, coord]

const reorder = (colorOne: string, coordOne: number, colorTwo: string, coordTwo: number, colorThree: string|null, coordThree: number|null) => {
    let array: Position[] = [[colorOne, coordOne], [colorTwo, coordTwo], [colorThree, coordThree]]
    let ordered: Position[] = array.sort((a, b) => {
        return a[1]-b[1]
    })
    return{
        color1: ordered[0][0],
        coord1: ordered[0][1],
        color2: ordered[1][0],
        coord2: ordered[1][1],
        color3: ordered[2][0], 
        coord3: ordered[2][1]
    }
}
// TAILWIND CLASSES BUILDER
const linear_tw_template = "DIRECTION from-[COLOR_1] from via-[COLOR_3] to-[COLOR_2]"
const radial_tw_template = "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[COLOR_1] from via-[COLOR_3] to-[COLOR_2]"
const conical_tw_template = "bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-[COLOR_1] from via-[COLOR_3] to-[COLOR_2]"




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