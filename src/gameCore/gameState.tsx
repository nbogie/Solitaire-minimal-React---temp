import { Card } from "./card";
import { Column, makeColumns } from "./deck";

export interface GameState {
    logMessages: string[];
    selectedCard: Card | null;
    columns: Column[];
}
export function createInitialGameState(): GameState {
    return { logMessages: [], selectedCard: null, columns: makeColumns() };
}

export function findCardInColumns(card: Card, gs: GameState): Card {
    for (let col of gs.columns) {
        const foundCard = col.find((colCard) => colCard.id === card.id);
        if (foundCard) {
            return foundCard;
        }
    }
    throw new Error(
        "Can't find card: " +
            card.id +
            " in any column: " +
            JSON.stringify(gs.columns)
    );
}
