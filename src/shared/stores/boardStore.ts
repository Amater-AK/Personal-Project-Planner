import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { sharedStorage } from "@/shared/lib/sharedStorage";

import { type Column, type ColumnEdit } from "../types/column.type";
import { type BoardState as Board } from "../types/board.type";
import { type Card, type CardEdit } from "../types/card.type";

export interface BoardState {
    // Columns
    columns: Record<string, Column>;
    getColumns: (pId: string) => Column[];
    createColumn: (pId: string, data: ColumnEdit) => string;
    editColumn: (id: string, data: ColumnEdit) => void;
    deleteColumn: (id: string) => void;
    deleteColumns: (pId: string) => void;
    toggleColumnCollapse: (id: string) => void;
    addCardToColumn: (id: string, cardId: string) => void;
    deleteCardFromColumn: (id: string, cardId: string) => void;
    moveColumns: (ids: string[]) => void;
    moveCards: (boardState: Board) => void;
    // Cards
    cards: Record<string, Card>;
    createCard: (cId: string, data: CardEdit) => string;
    editCard: (id: string, data: CardEdit) => void;
    deleteCard: (id: string) => void;
}

export const useBoardStore = create<BoardState>()(
    persist(
        immer((set, get) => ({
            // Columns
            columns: {},
            getColumns: (pId) => {
                return Object.values(get().columns).filter((column) => column.projectId === pId);
            },
            createColumn: (pId, data) => {
                const id = uuidv4();

                set((state) => {
                    const columns = Object.values(state.columns).filter((column) => column.projectId === pId);
                    state.columns[id] = {
                        id,
                        position: columns.length,
                        projectId: pId,
                        cardIds: [],
                        isCollapsed: false,
                        ...data,
                    };
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
            toggleColumnCollapse: (id) => {
                set((state) => {
                    state.columns[id].isCollapsed = !state.columns[id].isCollapsed;
                });
            },
            addCardToColumn: (id, cardId) => {
                set((state) => {
                    state.columns[id].cardIds.push(cardId);
                });
            },
            deleteCardFromColumn: (id, cardId) => {
                set((state) => {
                    state.columns[id].cardIds = state.columns[id].cardIds.filter((cId) => cId !== cardId);
                });
            },
            moveColumns: (ids: string[]) => {
                set((state) => {
                    ids.forEach((columnId, index) => (state.columns[columnId].position = index));
                });
            },
            moveCards: (boardState) => {
                set((state) => {
                    Object.entries(boardState).forEach(
                        ([columnId, cardIds]) => (state.columns[columnId].cardIds = cardIds),
                    );
                });
            },
            // Cards
            cards: {},
            createCard: (cId, data) => {
                const id = uuidv4();

                set((state) => {
                    state.cards[id] = { id, columnId: cId, ...data, createdAt: Date.now() };
                });

                return id;
            },
            editCard: (id, data) => {
                set((state) => {
                    state.cards[id] = { ...state.cards[id], ...data };
                });
            },
            deleteCard: (id) => {
                set((state) => {
                    delete state.cards[id];
                });
            },
        })),
        { name: "board-slice", storage: createJSONStorage(() => sharedStorage) },
    ),
);
