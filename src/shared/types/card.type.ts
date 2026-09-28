export interface Card {
    id: string;
    text: string;
    color: string;
    createdAt: number;
}

export type CardEdit = Pick<Card, "text" | "color">;
