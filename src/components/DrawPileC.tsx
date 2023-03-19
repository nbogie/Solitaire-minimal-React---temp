import { Dispatch } from "react";
import { Card } from "../gameCore/card";
import { Action } from "../reducer/action";
import { PlaceholderC } from "./PlaceholderC";

interface DrawPileCProps {
    dispatch: Dispatch<Action>;
    drawPile: Card[];
    numDrawPilePassesRemaining: number;
}
export function DrawPileC({
    dispatch,
    drawPile,
    numDrawPilePassesRemaining,
}: DrawPileCProps): JSX.Element {
    return (
        <div
            className="drawPile"
            onClick={() => dispatch({ name: "draw-card" })}
        >
            {drawPile.length > 0 ? (
                <div className="card faceDown"></div>
            ) : (
                <PlaceholderC>{numDrawPilePassesRemaining}</PlaceholderC>
            )}
        </div>
    );
}
