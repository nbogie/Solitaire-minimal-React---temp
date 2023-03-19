import { GameState } from "../gameCore/gameState";
import { DrawCardAction } from "./action";

export function doDrawCard(gs: GameState, action: DrawCardAction) {
    const drawnCard = gs.drawPile.pop();
    if (!drawnCard) {
        return;
    }
    gs.discardPile.push(drawnCard);
    drawnCard.isFaceup = true;
}
