import { useRef, useEffect } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function Modal({ children, className, isOpen, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    function handleBackdropDown(event: React.PointerEvent) {
        if (event.target === dialogRef.current) {
            onClose();
        }
    }

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    // return createPortal(
    //     <dialog ref={dialogRef} className="m-auto" onPointerDown={handleBackdropDown} onClose={onClose}>
    //         {isOpen ? children : null}
    //     </dialog>,
    //     document.getElementById("modals"),
    // );
    return (
        <dialog ref={dialogRef} className={`m-auto ${className}`} onPointerDown={handleBackdropDown} onClose={onClose}>
            {isOpen ? children : null}
        </dialog>
    );
}
