import { ConnectableElement, useDrag, useDrop } from "react-dnd";
import {
    canPlaceOn,
    Card,
    emojiForSuit,
    higherRank,
    otherSuitColour,
    Rank,
    rankToCharacter,
    rankToWord,
    Suit,
    suitFullName,
} from "../gameCore/card";

interface CardCProps {
    card: Card;
    handleClickedCard: (card: Card) => void;
    handleClickedFaceDownCard: (card: Card) => void;
}

export function CardC(props: CardCProps) {
    const r = props.card.rank;
    const s = props.card.suit;

    const [{ myProp }, dragRef] = useDrag({
        type: "card",
        item: props.card,
        collect: (monitor) => ({
            myProp: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: "card",
        canDrop: (item: Card) => {
            return canPlaceOn(props.card, item);
        },
        drop: (item: Card) => {
            console.log("dropped", item);
        },
    });

    function attachRef(element: ConnectableElement) {
        dragRef(element);
        dropRef(element);
    }
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
                ref={attachRef}
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
