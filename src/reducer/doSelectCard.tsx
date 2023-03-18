import { GameState } from "../gameCore/gameState";
import { SelectCardAction } from "./action";

export function doSelectCard(gs: GameState, action: SelectCardAction) {
    gs.selectedCard = action.card;
}
