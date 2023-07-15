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
export const getStyleStringOv = (gradientType: string, colorOne: string, colorTwo: string, colorThree: string|null = null, coordOne: number, coordTwo: number, coordThree: number|null = null, direction: string): string => {
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

// TAILWIND CLASSES BUILDER

// K: TAILWIND STRING, V: CSS STYLE VALUE
let directionMap: Map<string, string> = new Map<string,string>([
    ["bg-gradient-to-r", "to right"],
    ["bg-gradient-to-tr", "to top right"],
    ["bg-gradient-to-br", "to bottom right"],
    ["bg-gradient-to-l", "to left"],
    ["bg-gradient-to-tl", "to top left"],
    ["bg-gradient-to-bl", "to bottom left"],
    ["bg-gradient-to-t", "to top"],
    ["bg-gradient-to-b", "to bottom"],
])