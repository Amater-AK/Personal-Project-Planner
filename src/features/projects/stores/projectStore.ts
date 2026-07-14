import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { sharedStorage } from "@/shared/lib/sharedStorage";

import {
    type Project,
    type ProjectGet,
    type ProjectCreate,
    type ProjectUpdate,
    type ProjectDelete,
} from "../types/project.type";

interface ProjectState {
    projects: Project[];
    getProject: (data: ProjectGet) => Project;
    addProject: (data: ProjectCreate) => string;
    updateProject: (data: ProjectUpdate) => void;
    deleteProject: (data: ProjectDelete) => void;
}

export const useProjectStore = create<ProjectState>()(
    persist(
        immer((set, get) => ({
            projects: Array<Project>(),

            getProject: (data) => {
                const projects = get().projects;

                return projects.find((project) => project.id === data.id);
            },
            addProject: (data) => {
                const id = uuidv4();

                set((state) => state.projects.push({ id, ...data, createdAt: Date.now() }));

                return id;
            },
            updateProject: (data) => {
                set((state) => {
                    const project = state.projects.find((project) => project.id === data.id);
                    if (!project) return;

                    return { ...project, ...data };
                });
            },
            deleteProject: (data) =>
                set((state) => (state.projects = state.projects.filter((project) => project.id !== data.id))),
        })),
        { name: "project-slice", storage: createJSONStorage(() => sharedStorage) },
    ),
);
