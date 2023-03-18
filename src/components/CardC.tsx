import { Dispatch } from "react";
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
import { Action } from "../reducer/action";

interface CardCProps {
    card: Card;
    handleClickedCard: (card: Card) => void;
    handleClickedFaceDownCard: (card: Card) => void;
    dispatch: Dispatch<Action>;
}

export function CardC({
    card,
    handleClickedCard,
    handleClickedFaceDownCard,
    dispatch,
}: CardCProps) {
    const r = card.rank;
    const s = card.suit;

    const [, dragRef] = useDrag({
        type: "card",
        item: card,
        collect: (monitor) => ({
            // myProp: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: "card",
        canDrop: (item: Card) => {
            return canPlaceOn(card, item);
        },
        drop: (item: Card) => {
            dispatch({
                name: "move-cards",
                destCard: card,
                topCard: item,
            });
        },
    });

    function placementAdvice(r: Rank, s: Suit) {
        const higher = higherRank(r);
        const colour = otherSuitColour(s);
        if (higher) {
            return `Can be placed under a ${colour} ${rankToWord(higher)}`;
        } else {
            return "Can be placed under an empty column.";
        }
    }
    function attachRef(element: ConnectableElement) {
        dragRef(element);
        dropRef(element);
    }

    if (card.isFaceup) {
        return (
            <div
                ref={attachRef}
                className={"card " + s}
                onClick={() => handleClickedCard(card)}
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
                    handleClickedFaceDownCard(card);
                }}
            ></div>
        );
    }
}
