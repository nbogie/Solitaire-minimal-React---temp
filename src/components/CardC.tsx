import {
    Card,
    emojiForSuit,
    higherRank,
    otherSuitColour,
    Rank,
    rankToCharacter,
    rankToWord,
    Suit,
    suitFullName,
} from "../gameCore/deck";

export function CardC(props: {
    card: Card;
    handleClickedCard: (card: Card) => void;
    handleClickedFaceDownCard: (card: Card) => void;
}) {
    const r = props.card.rank;
    const s = props.card.suit;

    function placementAdvice(r: Rank, s: Suit) {
        const higher = higherRank(r);
        const colour = otherSuitColour(s);
        if (higher) {
            return `Can be placed under a ${colour} ${rankToWord(higher)}`;
        } else {
            return "Can be placed under an empty column.";
        }
    }
    if (props.card.isFaceup) {
        return (
            <div
                className={"card " + s}
                onClick={() => props.handleClickedCard(props.card)}
            >
                {
                    <div
                        title={`${rankToWord(r)} of ${suitFullName(
                            s
                        )}.${placementAdvice(r, s)}`}
                    >
                        {rankToCharacter(r)} {emojiForSuit(s)}
                    </div>
                }
            </div>
        );
    } else {
        return (
            <div
                className="card faceDown"
                onClick={() => {
                    props.handleClickedFaceDownCard(props.card);
                }}
            ></div>
        );
    }
}
