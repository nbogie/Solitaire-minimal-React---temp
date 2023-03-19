import { Card, Suit } from "./card";
import { Column, makeColumns } from "./deck";

export interface GameState {
    logMessages: string[];
    columns: Column[];
    drawPile: Card[];
    discardPile: Card[];
    homePiles: Record<Suit, Card[]>;
}
export function createInitialGameState(): GameState {
    const { columns, drawPile } = makeColumns();
    return {
        logMessages: [],
        columns,
        drawPile,
        discardPile: [],
        homePiles: { c: [], d: [], h: [], s: [] },
    };
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

export function isAtFrontOfAColumn(c: Card, columns: Column[]): boolean {
    return columns.some((col) => col.length > 0 && col.at(-1)?.id === c.id);
}
