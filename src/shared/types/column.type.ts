export interface Column {
    id: string;
    position: number;
    projectId: string;
    title: string;
}

export type ColumnEdit = Pick<Column, "title">;
