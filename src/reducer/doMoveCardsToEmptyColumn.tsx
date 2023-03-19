import { canMoveCardsToTopOfColumn } from "../gameCore/deck";
import { GameState } from "../gameCore/gameState";
import { MoveCardsToEmptyColumnAction } from "./action";
import { removeCardsIncludingAndUnder } from "./removeCardsIncludingAndUnder";

export function doMoveCardsToEmptyColumn(
    gs: GameState,
    action: MoveCardsToEmptyColumnAction
) {
    const col = gs.columns[action.columnIx];
    if (!canMoveCardsToTopOfColumn(action.topCard, col)) {
        return;
    }

    const cardsBeingMoved =
        action.origin.name === "column"
            ? removeCardsIncludingAndUnder(gs, action.topCard)
            : [gs.discardPile.pop()!];

    col.push(...cardsBeingMoved);
    gs.selectedCard = null;
}
