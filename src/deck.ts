export type Column = Card[];
export type Rank = number;
export const allSuits = ["d", "c", "s", "h"] as const;
export type Suit = typeof allSuits[number];

export interface Card {
    rank: Rank;
    suit: Suit;
    isFaceup: boolean;
}
export type SuitColour = "black" | "red"

export function isKing(card: Card) {
    return card.rank === 13;
}
export function makeDeck() {
    const deck = [];
    for (let suit of allSuits) {
        for (let rank = 1; rank <= 13; rank++) {
            const card: Card = {
                rank,
                suit,
                isFaceup: false
            };
            deck.push(card);
        }
    }
    deck.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
    return deck;
}
export function suitFullName(suit: Suit): string {
    const lookup: Record<Suit, string> = { d: 'Diamonds', c: 'Clubs', s: 'Spades', h: 'Hearts' };
    return lookup[suit];
}
export function cardToString(c: Card): string {
    return `${rankToWord(c.rank)} of ${suitFullName(c.suit)}`;
}
export function otherSuitColour(suit: Suit): SuitColour {
    return suitColour(suit) === 'red' ? 'black' : 'red';
}

export function suitColour(suit: Suit): SuitColour {
    const lookup: Record<Suit, SuitColour> = { d: 'red', h: 'red', s: 'black', c: 'black' };
    return lookup[suit];
}
export function higherRank(r: Rank): number | null {
    if (r < 13) {
        return r + 1;
    } else {
        return null;
    }
}

export function differentColourSuits(a: Suit, b: Suit): boolean {
    const [s1, s2] = [a, b].map(suitColour);
    return s1 !== s2;
}

export function rankToCharacter(rank: number): string {
    return 'A23456789TJQK'.split('')[rank - 1];
}

export function rankToWord(rank: number): string {
    return 'Ace 2 3 4 5 6 7 8 9 10 Jack Queen King'.split(' ')[rank - 1];
}

export function makeColumns() {
    const cols: Column[] = [[], [], [], [], [], [], []];
    const deck = makeDeck();
    for (let row = 0; row < 7; row++) {
        for (let colIx = 0; colIx < row + 1; colIx++) {
            const card: Card = deck.pop()!;
            cols[colIx].push(card);
        }
    }
    cols.reverse();
    cols.forEach(flipLastCard);
    return cols;
}

function flipLastCard(cards: Card[]) {
    cards[cards.length - 1].isFaceup = true;
}
