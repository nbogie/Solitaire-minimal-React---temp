import { Card, Suit } from "./card";
import { Column, makeColumns } from "./deck";

export interface GameState {
    columns: Column[];
    drawPile: Card[];
    discardPile: Card[];
    homePiles: Record<Suit, Card[]>;
    numDrawPilePassesRemaining: number;
}
export function createInitialGameState(): GameState {
    const { columns, drawPile } = makeColumns();
    return {
        columns,
        drawPile,
        discardPile: [],
        homePiles: { c: [], d: [], h: [], s: [] },
        numDrawPilePassesRemaining: 2,
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
export type WinState = "win" | "in-progress";

export function calculateWinState(gs: GameState): WinState {
    return gs.homePiles.c.length === 13 &&
        gs.homePiles.d.length === 13 &&
        gs.homePiles.h.length === 13 &&
        gs.homePiles.s.length === 13
        ? "win"
        : "in-progress";
}
