import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { sharedStorage } from "@/shared/lib/sharedStorage";

import { type Column, type ColumnEdit } from "../types/column.type";

export interface ColumnState {
    columns: Record<string, Column>;
    getColumns: (pId: string) => Column[];
    createColumn: (pId: string, data: ColumnEdit) => string;
    editColumn: (id: string, data: ColumnEdit) => void;
    deleteColumn: (id: string) => void;
    deleteColumns: (pId: string) => void;
    moveColumn: (id: string, startIndex: number, endIndex: number) => void;
}

export const useColumnStore = create<ColumnState>()(
    persist(
        immer((set, get) => ({
            columns: {},
            getColumns: (pId) => {
                return Object.values(get().columns).filter((column) => column.projectId === pId);
            },
            createColumn: (pId, data) => {
                const id = uuidv4();

                set((state) => {
                    const columns = Object.values(state.columns).filter((column) => column.projectId === pId);
                    state.columns[id] = { id, position: columns.length, projectId: pId, ...data };
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
                    const pId = state.columns[id].projectId;

                    delete state.columns[id];

                    // re-indexing of positions
                    const columns = Object.values(state.columns).filter((column) => column.projectId === pId);
                    const orderedColumns = columns.toSorted((a, b) => a.position - b.position);
                    orderedColumns.forEach((column, index) => (state.columns[column.id].position = index));
                });
            },
            deleteColumns: (pId) => {
                set((state) => {
                    Object.values(state.columns).forEach((column) => {
                        if (column.projectId === pId) delete state.columns[column.id];
                    });
                });
            },
            moveColumn: (id, startIndex, endIndex) => {
                set((state) => {
                    if (startIndex === endIndex) return;

                    const pId = state.columns[id].projectId;
                    const columns = Object.values(state.columns)
                        .filter((column) => column.projectId === pId)
                        .sort((a, b) => a.position - b.position);

                    const [movedColumn] = columns.splice(startIndex, 1);
                    columns.splice(endIndex, 0, movedColumn);
                    columns.forEach((column, index) => (state.columns[column.id].position = index));
                });
            },
        })),
        { name: "column-slice", storage: createJSONStorage(() => sharedStorage) },
    ),
);
