import { useBoardStore } from "@/shared/stores/boardStore";

import { toDate } from "@/shared/utils/datetime";

interface Props {
    cardId: string;
}

export function OverlayCard({ cardId }: Props) {
    const card = useBoardStore((state) => state.cards[cardId]);
    const datetime = toDate(card.createdAt);

    return (
        <article className="group/card relative p-2 bg-input-bg border border-input-border rounded-medium cursor-grab">
            <div className="whitespace-pre-wrap">{card.text}</div>
            <footer>
                <time className="grow text-xs text-text-info" dateTime={datetime}>
                    {datetime}
                </time>
            </footer>
        </article>
    );
}
