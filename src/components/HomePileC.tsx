import { Dispatch } from "react";
import { useDrop } from "react-dnd";
import { Card, emojiForSuit, Suit } from "../gameCore/card";
import { Action } from "../reducer/action";
import { CardC, DnDCardItem } from "./CardC";
import { PlaceholderC } from "./PlaceholderC";

interface HomePileCProps {
    cardsInPile: Card[];
    suit: Suit;
    dispatch: Dispatch<Action>;
}
export function HomePileC({
    dispatch,
    cardsInPile,
    suit,
}: HomePileCProps): JSX.Element {
    const [, dropRef] = useDrop({
        accept: "card",
        canDrop: (item: DnDCardItem) => item.card.suit === suit,
        drop: (item: DnDCardItem) =>
            dispatch({
                name: "move-card-to-home-pile",
                card: item.card,
                suit,
                origin: item.origin,
            }),
    });

    const topCard = cardsInPile.at(-1);
    return (
        <div className={"homePile"} ref={dropRef}>
            {topCard ? (
                <CardC
                    card={topCard}
                    handleClickedFaceDownCard={() => {}}
                    cardOrigin={{ name: "column" }}
                    dispatch={() => {}}
                    isDragOrigin={false}
                    isDropTarget={false}
                />
            ) : (
                <PlaceholderC>
                    <span>{emojiForSuit(suit)}</span>
                </PlaceholderC>
            )}
        </div>
    );
}
