import { Card } from "../gameCore/card";
import { findCardInColumns, GameState } from "../gameCore/gameState";
import { RevealCardAction } from "./action";

export function doRevealCard(gs: GameState, action: RevealCardAction) {
    const card: Card = findCardInColumns(action.card, gs);
    card.isFaceup = true;
}
