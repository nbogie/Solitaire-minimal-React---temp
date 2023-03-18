import { GameState } from "../gameCore/gameState";
import { Action } from "./action";
import { doClearSelectedCard } from "./doClearSelectedCard";
import { doMoveCard as doMoveCards } from "./doMoveCard";
import { doMoveCardsToEmptyColumn } from "./doMoveCardsToEmptyColumn";
import { doRevealCard } from "./doRevealCard";
import { doSelectCard } from "./doSelectCard";

export function immerReducerFunction(gs: GameState, action: Action) {
    switch (action.name) {
        case "move-cards":
            doMoveCards(gs, action);
            return;
        case "move-cards-to-empty-column":
            doMoveCardsToEmptyColumn(gs, action);
            return;
        case "reveal-card":
            doRevealCard(gs, action);
            return;
        case "select-card":
            doSelectCard(gs, action);
            return;
        case "clear-selected-card":
            doClearSelectedCard(gs, action);
            return;
        case "reset-game":
            throw new Error("not implemented: reset-game");

        default:
            const x: never = action;
            return;
    }
}
