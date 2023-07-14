// place files you want to import through the `$lib` alias in this folder.
import {toast} from '@zerodevx/svelte-toast'
// DIMENSION
export const getWidth = (): number|undefined => {
    return document.getElementById('gradient-line')?.offsetWidth
}


// COPY FUNCTIONS
// For user to copy
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
export const getStyleString = (gradientType: string, colorOne: string, colorTwo: string, colorThree: string|null = null, coordOne: number, coordTwo: number, coordThree: number|null = null): string => {
        
    // RADIAL
    if (gradientType == "radial")
        return `radial-gradient(${colorOne} ${coordOne}%, ${
            colorThree ? colorThree + " " + coordThree + "%," : ""
        } ${colorTwo} ${coordTwo}%`;

    // LINEAR
    if (gradientType == "linear")
        return `linear-gradient(to right, ${colorOne} ${coordOne}%, ${
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