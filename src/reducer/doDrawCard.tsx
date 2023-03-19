import { GameState } from "../gameCore/gameState";
import { DrawCardAction } from "./action";

export function doDrawCard(gs: GameState, action: DrawCardAction) {
    /* Pull the first three cards from the draw pile and lay them on the table face up so that only the third card is visible. If this card is playable, you may do so. If not, take the next three cards from the draw pile and lay them face-up on top of the cards previously turned over. When you reach the end of the deck, you may turn the face-up cards face down and go through it two more times.
     */
    const drawnCards = gs.drawPile.splice(-3);
    drawnCards.forEach((c) => (c.isFaceup = true));
    gs.discardPile.push(...drawnCards);

    if (gs.drawPile.length === 0) {
        console.log("draw pile empty: prepping");
        if (gs.numDrawPilePassesRemaining > 0) {
            gs.numDrawPilePassesRemaining--;
            gs.drawPile = gs.discardPile;
            gs.drawPile.reverse();
            gs.drawPile.forEach((c) => (c.isFaceup = false));
            gs.discardPile = [];
        }
    } else {
        console.log("draw pile not empty");
    }
}
