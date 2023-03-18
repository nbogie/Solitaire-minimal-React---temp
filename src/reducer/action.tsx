import { Card } from "../gameCore/card";

export type Action =
    | MoveCardsAction
    | MoveCardsToEmptyColumnAction
    | SelectCardAction
    | ClearSelectedCardAction
    | ResetGameAction
    | RevealCardAction;
export type MoveCardsAction = {
    name: "move-cards";
    destCard: Card;
    topCard: Card;
};
export type MoveCardsToEmptyColumnAction = {
    name: "move-cards-to-empty-column";
    topCard: Card;
    columnIx: number;
};
export type RevealCardAction = {
    name: "reveal-card";
    card: Card;
};
export type SelectCardAction = {
    name: "select-card";
    card: Card;
};
export type ClearSelectedCardAction = {
    name: "clear-selected-card";
};
export type ResetGameAction = { name: "reset-game" };
