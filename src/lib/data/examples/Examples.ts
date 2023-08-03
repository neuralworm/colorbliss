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
        via: undefined
    },
    {
        name: "Peace and love",
        via: "fuchsia-500",
        to: "pink-300",
        from: "indigo-400"
    },
    {
        name: "Event Horizon",
        via: "indigo-950",
        to: "slate-900",
        from: "black"
    },
    {
        name: "Bavarian Hops",
        via: "green-800",
        to: "amber-800",
        from: "lime-700"
    },
    {
        name: "Coastal Cypress",
        via: "green-900",
        from: "green-950",
        to: "sky-900",
    },
    {
        name: "Starburst",
        from: "yellow-200",
        via: "indigo-200",
        to: "cyan-400",
    },
    {
        name: "Casper",
        from: "white",
        via: "purple-200",
        to: "indigo-200",
    },
    {
        name: "Autumn Harvest",
        from: "orange-800",
        via: undefined,
        to: "amber-500",
    },
]