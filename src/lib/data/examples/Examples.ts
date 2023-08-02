interface DefaultColor {
    color: string;
    step: number;
    position: number;
    opacity: number;
}
export interface Example{
    name: string,
    from: string,
    to: string,
    via: string|undefined
}

export const examples: Example[] = [
    {
        name: "Pumpkin Spice",
        from: "yellow-300",
        to: "orange-400",
        via: "amber-400"
    },
    {
        name: "Coral",
        from: "sky-300",
        to: "lime-100",
        via: "rose-200"
    },
    {
        name: "FRANKENSTEIN",
        from: "lime-400",
        to: "purple-500",
        via: "slate-400"
    },
    {
        name: "OKTOBERFEST",
        from: "slate-800",
        to: "red-500",
        via: "a"
    },
    {
        name: "Peace and love",
        via: "fuchsia-500",
        to: "pink-300",
        from: "indigo-400"
    },
]