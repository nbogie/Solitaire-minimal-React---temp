import { GameState } from "../gameCore/gameState";
import { ClearSelectedCardAction } from "./action";

export function doClearSelectedCard(
    gs: GameState,
    action: ClearSelectedCardAction
) {
    gs.selectedCard = null;
}
