import { cardGoesNextOnPile } from "../gameCore/card";
import { GameState, isAtFrontOfAColumn } from "../gameCore/gameState";
import { MoveCardToHomePileAction } from "./action";
import { removeCardsIncludingAndUnder } from "./removeCardsIncludingAndUnder";

export function doMoveCardToHomePile(
    gs: GameState,
    action: MoveCardToHomePileAction
) {
    const cardsInPile = gs.homePiles[action.suit];

    if (action.card.suit !== action.suit) {
        return;
    }
    if (!cardGoesNextOnPile(action.card, cardsInPile)) {
        return;
    }

    if (action.origin.name === "column") {
        //should only be able to drag ONE card to home pile at a time
        if (!isAtFrontOfAColumn(action.card, gs.columns)) {
            return;
        }
    }

    const cardsRemovedFromOrigin =
        action.origin.name === "column"
            ? removeCardsIncludingAndUnder(gs, action.card)
            : [gs.discardPile.pop()!];

    cardsInPile.push(...cardsRemovedFromOrigin);
    return;
}
