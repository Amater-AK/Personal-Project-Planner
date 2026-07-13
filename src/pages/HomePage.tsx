import { useModalStore } from "@/shared/store/modalStore";

import { Button } from "@/shared/components/Button";

export function HomePage() {
    const openModal = useModalStore((state) => state.openModal);

    function handleTestModal() {
        openModal(<p>Test text</p>);
    }

    return (
        <div>
            <h1>Home</h1>
            <br />
            <Button intent="primary" onClick={handleTestModal}>
                Open modal
            </Button>
        </div>
    );
}
