import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { sharedStorage } from "@/shared/lib/sharedStorage";

import { type Card, type CardEdit } from "../types/card.type";

export interface CardState {
    cards: Record<string, Card>;
    createCard: (cId: string, data: CardEdit) => string;
    editCard: (id: string, data: CardEdit) => void;
    deleteCard: (id: string) => void;
    deleteCards: (cId: string) => void;
    moveCards: (rearrangedCards: Card[]) => void;
}

export const useCardStore = create<CardState>()(
    persist(
        immer((set, get) => ({
            cards: {},
            createCard: (cId, data) => {
                const id = uuidv4();

                set((state) => {
                    const cards = Object.values(state.cards).filter((card) => card.columnId === cId);
                    state.cards[id] = { id, position: cards.length, columnId: cId, ...data, createdAt: Date.now() };
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
                    const cId = state.cards[id].columnId;

                    delete state.cards[id];

                    // re-indexing of positions
                    const cards = Object.values(state.cards).filter((column) => column.columnId === cId);
                    const orderedcards = cards.toSorted((a, b) => a.position - b.position);
                    orderedcards.forEach((column, index) => (state.cards[column.id].position = index));
                });
            },
            deleteCards: (pId) => {
                set((state) => {
                    Object.values(state.cards).forEach((column) => {
                        if (column.columnId === pId) delete state.cards[column.id];
                    });
                });
            },
            moveCards: (rearrangedColumns: Card[]) => {
                set((state) => {
                    rearrangedColumns.forEach(
                        (rearrangedColumn, index) => (state.cards[rearrangedColumn.id].position = index),
                    );
                });
            },
        })),
        { name: "card-slice", storage: createJSONStorage(() => sharedStorage) },
    ),
);
