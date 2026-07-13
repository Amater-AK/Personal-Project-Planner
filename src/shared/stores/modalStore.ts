import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// import { sharedStorage } from "@/shared/lib/sharedStorage";
// import { STORAGE_KEY } from "../config/env";

interface ModalState {
    isOpen: boolean;
    content: React.ReactNode | null;
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
    // persist(
    immer((set) => ({
        isOpen: false,
        content: null,
        openModal: (content) => set({ isOpen: true, content }),
        closeModal: () => set({ isOpen: false, content: null }),
    })),
    //     { name: STORAGE_KEY, storage: createJSONStorage(() => sharedStorage) },
    // ),
);

// TODO: remove persist
