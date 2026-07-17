import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
    isOpen: boolean;
    content: React.ReactNode | null;
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
    immer((set) => ({
        isOpen: false,
        content: null as React.ReactNode | null, // fix: any type
        openModal: (content) =>
            set((state) => {
                state.isOpen = true;
                state.content = content;
            }),
        closeModal: () =>
            set((state) => {
                state.isOpen = false;
                state.content = null;
            }),
    })),
);
