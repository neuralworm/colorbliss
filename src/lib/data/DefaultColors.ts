export const defaultColors: string[] = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
export const defaultSteps: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
export default defaultColors
export interface DefaultColor {
    color: string;
    step: number;
    position: number;
    opacity: number;
}