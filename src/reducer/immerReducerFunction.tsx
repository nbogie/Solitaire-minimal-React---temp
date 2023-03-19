import { GameState } from "../gameCore/gameState";
import { Action } from "./action";
import { doClearSelectedCard } from "./doClearSelectedCard";
import { doDrawCard } from "./doDrawCard";
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
        case "draw-card":
            doDrawCard(gs, action);
            return;
        case "reset-game":
            throw new Error("not implemented: reset-game");

        default:
            //alternatively:
            // const _exhaustiveCheck: never = action;
            throw new UnreachableCodeError(
                action,
                "Unexpected action: " + JSON.stringify(action)
            );
    }
}

class UnreachableCodeError extends Error {
    constructor(myNever: never, message: string) {
        super(message);
    }
}
