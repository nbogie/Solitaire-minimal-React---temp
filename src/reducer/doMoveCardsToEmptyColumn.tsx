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
    const cardsBeingMoved = removeCardsIncludingAndUnder(gs, action.topCard);
    col.push(...cardsBeingMoved);
    gs.selectedCard = null;
}
