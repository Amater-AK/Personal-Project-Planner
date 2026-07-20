export interface Card {
    id: string;
    position: number;
    columnId: string;
    text: string;
    createdAt: number;
}

export type CardEdit = Pick<Card, "text">;
