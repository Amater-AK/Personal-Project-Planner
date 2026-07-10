import { useParams } from "react-router";

export function ProjectPage() {
    const { pId } = useParams();

    return <div>Project id: {pId}</div>;
}
