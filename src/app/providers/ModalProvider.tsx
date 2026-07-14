import { createPortal } from "react-dom";

import { useModalStore } from "@/shared/stores/modalStore";

import { BsX } from "react-icons/bs";

import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";

export function ModalProvider() {
    const isOpen = useModalStore((state) => state.isOpen);
    const content = useModalStore((state) => state.content);
    const closeModal = useModalStore((state) => state.closeModal);

    return createPortal(
        <Modal
            isOpen={isOpen}
            className="wrapper-modal text-text-primary bg-surface-primary border border-border rounded-medium"
            onClose={closeModal}
        >
            <div className="p-2">
                <header className="flex justify-end mb-2">
                    <Button intent="regular" onlyIcon={true} onClick={closeModal}>
                        <BsX />
                    </Button>
                </header>

                {content}
            </div>
        </Modal>,
        document.getElementById("modals"),
    );
}
