export interface Column {
    id: string;
    projectId: string;
    title: string;
}

export type ColumnEdit = Pick<Column, "title">;
