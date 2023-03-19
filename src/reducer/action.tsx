import { Card } from "../gameCore/card";

export type Action =
    | DrawCardAction
    | MoveCardsAction
    | MoveCardsToEmptyColumnAction
    | ResetGameAction
    | RevealCardAction;

export type CardMoveOrigin = { name: "column" } | { name: "discard-pile" };

export type MoveCardsAction = {
    name: "move-cards";
    destCard: Card;
    topCard: Card;
    origin: CardMoveOrigin;
};
export type MoveCardsToEmptyColumnAction = {
    name: "move-cards-to-empty-column";
    topCard: Card;
    columnIx: number;
    origin: CardMoveOrigin;
};
export type RevealCardAction = {
    name: "reveal-card";
    card: Card;
};
export type ResetGameAction = { name: "reset-game" };
export type DrawCardAction = { name: "draw-card" };
