import { GameState } from "../gameCore/gameState";
import { MoveCardsToEmptyColumnAction } from "./action";
import { removeCardsIncludingAndUnder } from "./removeCardsIncludingAndUnder";

export function doMoveCardsToEmptyColumn(
    gs: GameState,
    action: MoveCardsToEmptyColumnAction
) {
    const removed = removeCardsIncludingAndUnder(gs, action.topCard);
    const col = gs.columns[action.columnIx];
    col.push(...removed);
    gs.selectedCard = null;
}
