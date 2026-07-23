import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

import { sharedStorage } from "@/shared/lib/sharedStorage";

import { type Card, type CardEdit } from "../types/card.type";
import { type BoardState } from "../types/board.type";

interface MoveParams {
    startIndex: number;
    endIndex: number;
    startColumnId: string;
    endColumnId: string;
}

export interface CardState {
    cards: Record<string, Card>;
    createCard: (cId: string, data: CardEdit) => string;
    editCard: (id: string, data: CardEdit) => void;
    deleteCard: (id: string) => void;
    deleteCards: (cId: string) => void;
    // moveCard: (id: string, params: MoveParams) => void;
    // moveCardToEmpty: (id: string, cId: string) => void;
    moveCards: (boardState: BoardState, startColumnId: string, endColumnId: string) => void;
}

type ReIndexingState = Pick<CardState, "cards">;

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
                    const cards = Object.values(state.cards).filter((card) => card.columnId === cId);
                    const orderedcards = cards.toSorted((a, b) => a.position - b.position);
                    orderedcards.forEach((card, index) => (state.cards[card.id].position = index));
                });
            },
            deleteCards: (pId) => {
                set((state) => {
                    Object.values(state.cards).forEach((column) => {
                        if (column.columnId === pId) delete state.cards[column.id];
                    });
                });
            },
            moveCards: (boardState, startColumnId, endColumnId) => {
                set((state) => {
                    boardState[startColumnId].forEach((card, index) => {
                        state.cards[card.id].position = index;
                        state.cards[card.id].columnId = startColumnId;
                    });
                    boardState[endColumnId].forEach((card, index) => {
                        state.cards[card.id].position = index;
                        state.cards[card.id].columnId = endColumnId;
                    });
                });
            },
            // moveCard: (id: string, params: MoveParams) => {
            //     set((state) => {
            //         const { startIndex, endIndex, startColumnId, endColumnId } = params;
            //         state.cards[id].columnId = endColumnId;

            //         if (startColumnId === endColumnId) {
            //             console.log(1);
            //             const cards = Object.values(state.cards)
            //                 .filter((card) => card.columnId === endColumnId)
            //                 .sort((a, b) => a.position - b.position);
            //             const [movedCard] = cards.splice(startIndex, 1);
            //             cards.splice(endIndex, 0, movedCard);
            //             cards.forEach((card, index) => (state.cards[card.id].position = index));
            //         } else {
            //             console.log(2);
            //             const startCards = Object.values(state.cards)
            //                 .filter((card) => card.columnId === startColumnId)
            //                 .sort((a, b) => a.position - b.position);
            //             const endCards = Object.values(state.cards)
            //                 .filter((card) => card.columnId === endColumnId)
            //                 .sort((a, b) => a.position - b.position);
            //             const [movedCard] = startCards.splice(startIndex, 1);
            //             endCards.splice(endIndex, 0, movedCard);

            //             startCards.forEach((card, index) => (state.cards[card.id].position = index));
            //             endCards.forEach((card, index) => (state.cards[card.id].position = index));
            //         }

            //         // const cards = Object.values(state.cards)
            //         //     .filter((card) => card.columnId === columnId)
            //         //     .sort((a, b) => a.position - b.position);
            //         // const [movedColumn] = cards.splice(startIndex, 1);
            //         // cards.splice(endIndex, 0, movedColumn);
            //         // cards.forEach((card, index) => (state.cards[card.id].position = index));
            //     });
            // },
            // moveCardToEmpty: (id, cId) => {
            //     set((state) => {
            //         state.cards[id].columnId = cId;
            //     });
            // },
        })),
        { name: "card-slice", storage: createJSONStorage(() => sharedStorage) },
    ),
);

function reIndexingPositions(state: ReIndexingState, columnId: string) {
    const cards = Object.values(state.cards).filter((card) => card.columnId === columnId);
    const orderedCards = cards.toSorted((a, b) => a.position - b.position);
    orderedCards.forEach((card, index) => (state.cards[card.id].position = index));
}
