import { Dispatch } from "react";
import { Card } from "../gameCore/card";
import { Action } from "../reducer/action";
import { CardC } from "./CardC";
import { PlaceholderC } from "./PlaceholderC";

interface DiscardPileCProps {
    dispatch: Dispatch<Action>;
    discardPile: Card[];
}
export function DiscardPileC({
    dispatch,
    discardPile,
}: DiscardPileCProps): JSX.Element {
    const topCard = discardPile.at(-1);

    return (
        <div className="DiscardPile">
            {topCard ? (
                <CardC
                    {...{
                        card: topCard,
                        dispatch,
                        handleClickedFaceDownCard: () => {},
                        cardOrigin: { name: "discard-pile" },
                        isDragOrigin: true,
                        isDropTarget: false,
                    }}
                />
            ) : (
                <PlaceholderC />
            )}
        </div>
    );
}
