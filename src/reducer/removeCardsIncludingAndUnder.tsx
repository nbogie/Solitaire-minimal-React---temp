import { Card } from "../gameCore/card";
import { GameState } from "../gameCore/gameState";

export function removeCardsIncludingAndUnder(gs: GameState, c: Card) {
    const { ix, column } = findColumnAndIndexOfCardOrFail(c, gs.columns);

    const removed = column.splice(ix);
    return removed;
}

export function findColumnAndIndexOfCardOrFail(
    c: Card,
    columns: Card[][]
): { column: Card[]; ix: number } {
    const column = columns.find((col) =>
        col.map((cd) => cd.id).includes(c.id)
    )!;
    const ix = column.findIndex((colCard) => colCard.id === c.id);

    if (ix === -1) {
        throw new Error(
            `can't find card with id: ${c.id} in column: ` +
                column.map((c) => c.id).join(", ")
        );
    }
    return { column, ix };
}
