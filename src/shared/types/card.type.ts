export interface Card {
    id: string;
    columnId: string;
    text: string;
    createdAt: number;
}

export type CardEdit = Pick<Card, "text">;
