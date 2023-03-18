import { canPlaceOn, cardToString } from "../gameCore/card";
import { GameState } from "../gameCore/gameState";
import { MoveCardsAction } from "./action";
import { removeCardsIncludingAndUnder } from "./removeCardsIncludingAndUnder";

export function doMoveCard(gs: GameState, action: MoveCardsAction) {
    const { destCard, topCard } = action;
    if (destCard.id === topCard.id) {
        gs.logMessages.push("Can't place on self!");
        gs.selectedCard = null;
        return;
    }
    const columnEndingWithDestCard = gs.columns.find(
        (col) => col.length !== 0 && col[col.length - 1].id === destCard.id
    );

    if (!columnEndingWithDestCard) {
        gs.logMessages.push(
            "Can't place on non-end card: " + cardToString(destCard)
        );
        gs.selectedCard = null;
        return;
    }

    if (canPlaceOn(destCard, topCard)) {
        const removedCards = removeCardsIncludingAndUnder(gs, topCard);
        columnEndingWithDestCard.push(...removedCards);
        gs.selectedCard = null;
        return;
    } else {
        gs.logMessages.push(
            `Can't place ${cardToString(topCard)} on ${cardToString(destCard)}`
        );
        gs.selectedCard = null;
        return;
    }
}
