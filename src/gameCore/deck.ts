import { Card, allSuits, allRanks, isKing } from "./card";

export type Column = Card[];

export function makeDeck(): Card[] {
    const deck = [];
    for (let suit of allSuits) {
        for (let rank of allRanks) {
            const card: Card = {
                id: rank + "_" + suit,
                rank,
                suit,
                isFaceup: false,
            };
            deck.push(card);
        }
    }
    return shuffle(deck);
}

export function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => (Math.random() > 0.5 ? -1 : 1));
}

export function makeColumns(): { columns: Column[]; drawPile: Card[] } {
    const columns: Column[] = [[], [], [], [], [], [], []];
    const deck = makeDeck();
    for (let row = 0; row < 7; row++) {
        for (let colIx = 0; colIx < row + 1; colIx++) {
            const card: Card = deck.pop()!;
            columns[colIx].push(card);
        }
    }
    columns.reverse();
    columns.forEach(flipLastCard);
    return { columns, drawPile: deck };
}

function flipLastCard(cards: Card[]) {
    cards[cards.length - 1].isFaceup = true;
}

export function canMoveCardsToTopOfColumn(
    cardOnTop: Card,
    col: Column
): boolean {
    return col.length === 0 && isKing(cardOnTop);
}
