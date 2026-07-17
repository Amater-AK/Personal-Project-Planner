import { useParams } from "react-router";

import { ActionMenu } from "@/shared/components/ui/ActionMenu";
import { Button } from "@/shared/components/ui/Button";
import { buttonStyles } from "@/shared/styles/buttonStyles";

export function ProjectPage() {
    const { pId } = useParams();

    return (
        <div>
            <h1>Project id: {pId}</h1>
            <br />
            <ActionMenu
                trigger={
                    <Button intent="secondary" onlyIcon={true}>
                        ...
                    </Button>
                }
                className={(isOpen) =>
                    `top-0 left-full min-w-40 p-2 bg-stone-300 transition-all duration-300 z-10 ${isOpen ? "translate-y-0" : "translate-y-10 opacity-0"}`
                }
            >
                <ActionMenu.ActionButton
                    className={buttonStyles({ intent: "regular" })}
                    onClick={() => console.log("Action 1")}
                >
                    Action 1
                </ActionMenu.ActionButton>
                <ActionMenu.ActionButton className={buttonStyles({ intent: "regular" })}>
                    Action 2
                </ActionMenu.ActionButton>
                <ActionMenu.ActionButton className={buttonStyles({ intent: "regular" })}>
                    Action 3
                </ActionMenu.ActionButton>
            </ActionMenu>
        </div>
    );
}
