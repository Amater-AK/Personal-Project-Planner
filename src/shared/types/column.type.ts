export interface Column {
    id: string;
    position: number;
    projectId: string;
    cardIds: string[];
    title: string;
}

export type ColumnEdit = Pick<Column, "title">;
