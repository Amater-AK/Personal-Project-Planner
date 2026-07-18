import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { sharedStorage } from "@/shared/lib/sharedStorage";

import { type Column, type ColumnEdit } from "../types/column.type";

export interface ColumnState {
    columns: Record<string, Column>;
    getColumn: (id: string) => Column;
    createColumn: (pId: string, data: ColumnEdit) => string;
    editColumn: (id: string, data: ColumnEdit) => void;
    deleteColumn: (id: string) => void;
}

export const useColumnStore = create<ColumnState>()(
    persist(
        immer((set, get) => ({
            columns: {},
            getColumn: (id) => {
                const columns = get().columns;

                return columns[id];
            },
            createColumn: (pId, data) => {
                const id = uuidv4();

                set((state) => {
                    state.columns[id] = { id, projectId: pId, ...data };
                });

                return id;
            },
            editColumn: (id, data) => {
                set((state) => {
                    state.columns[id] = { ...state.columns[id], ...data };
                });
            },
            deleteColumn: (id) => {
                set((state) => {
                    delete state.columns[id];
                });
            },
        })),
        { name: "column-slice", storage: createJSONStorage(() => sharedStorage) },
    ),
);
