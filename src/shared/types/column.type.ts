export interface Column {
    id: string;
    position: number;
    projectId: string;
    cardIds: string[];
    title: string;
    isCollapsed: boolean;
}

export type ColumnEdit = Pick<Column, "title">;
