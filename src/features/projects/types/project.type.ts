export interface Project {
    id: string;
    title: string;
    createdAt: number;
}

export type ProjectEdit = Pick<Project, "title">;
