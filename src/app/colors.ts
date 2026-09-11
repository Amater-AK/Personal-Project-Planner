interface Color {
    id: string;
    value: string;
}

// https://chir.ag/projects/name-that-color/

export const COLORS: Color[] = [
    { id: "Azalea", value: "#F6C2D9" },
    { id: "Picasso", value: "#FFF69B" },
    { id: "Edgewater", value: "#BCDFC9" },
    { id: "Cornflower", value: "#A1C8E9" },
    { id: "Lola", value: "#E4dAE2" },
] as const;
