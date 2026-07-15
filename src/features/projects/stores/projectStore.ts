import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { sharedStorage } from "@/shared/lib/sharedStorage";

import { type Project, type ProjectEdit } from "../types/project.type";

interface ProjectState {
    projects: Project[];
    getProject: (id: string) => Project;
    createProject: (data: ProjectEdit) => string;
    editProject: (id: string, data: ProjectEdit) => void;
    deleteProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>()(
    persist(
        immer((set, get) => ({
            projects: Array<Project>(),

            getProject: (id) => {
                const projects = get().projects;

                return projects.find((project) => project.id === id);
            },
            createProject: (data) => {
                const id = uuidv4();

                set((state) => {
                    state.projects.push({ id, ...data, createdAt: Date.now() });
                });

                return id;
            },
            editProject: (id, data) => {
                set((state) => {
                    const index = state.projects.findIndex((project) => project.id === id);
                    if (index < 0) return;

                    state.projects[index] = { ...state.projects[index], ...data };
                });
            },
            deleteProject: (id) =>
                set((state) => {
                    state.projects = state.projects.filter((project) => project.id !== id);
                }),
        })),
        { name: "project-slice", storage: createJSONStorage(() => sharedStorage) },
    ),
);
