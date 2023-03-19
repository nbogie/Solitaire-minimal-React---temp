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
import { Action, CardMoveOrigin } from "../reducer/action";

export interface DnDCardItem {
    card: Card;
    origin: CardMoveOrigin;
}
interface CardCProps {
    card: Card;
    handleClickedFaceDownCard: (card: Card) => void;
    cardOrigin: CardMoveOrigin;
    dispatch: Dispatch<Action>;
    isDragOrigin: boolean;
    isDropTarget: boolean;
}

export function CardC({
    card,
    handleClickedFaceDownCard,
    dispatch,
    cardOrigin,
    isDragOrigin,
    isDropTarget,
}: CardCProps) {
    const r = card.rank;
    const s = card.suit;

    const [, dragRef] = useDrag({
        type: "card",
        item: { card, origin: cardOrigin },
        collect: (monitor) => ({
            // myProp: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: "card",
        canDrop: (item: DnDCardItem) => {
            return canPlaceOn(card, item.card);
        },
        drop: (item: DnDCardItem) => {
            dispatch({
                name: "move-cards",
                destCard: card,
                topCard: item.card,
                origin: item.origin,
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
        isDragOrigin && dragRef(element);
        isDropTarget && dropRef(element);
    }

    if (card.isFaceup) {
        return (
            <div ref={attachRef} className={"card " + s}>
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
