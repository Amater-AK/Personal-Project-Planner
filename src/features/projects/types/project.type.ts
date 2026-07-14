export interface Project {
    id: string;
    title: string;
    createdAt: number;
}

export type ProjectGet = Pick<Project, "id">;
export type ProjectCreate = Pick<Project, "title">;
export type ProjectUpdate = Pick<Project, "id" | "title">;
export type ProjectDelete = Pick<Project, "id">;
