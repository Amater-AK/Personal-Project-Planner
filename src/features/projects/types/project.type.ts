export interface Project {
    id: string;
    title: string;
    createdAt: number;
    lastOpenedAt: number | null;
}

export type ProjectEdit = Pick<Project, "title">;
