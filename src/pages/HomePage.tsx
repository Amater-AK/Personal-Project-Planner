import { Button } from "@/shared/components/Button";
import { LinkButton } from "@/shared/components/LinkButton";

export function HomePage() {
    return (
        <div>
            <h1>Home</h1>
            <br />
            <Button intent="primary" onClick={() => alert(1)}>
                Button
            </Button>
            <br />
            <LinkButton to="p/42" intent="secondary">
                Link Button
            </LinkButton>
        </div>
    );
}
