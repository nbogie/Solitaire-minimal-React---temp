import { Dispatch } from "react";
import { Card, emojiForSuit, Suit } from "../gameCore/card";
import { Action } from "../reducer/action";
import { PlaceholderC } from "./PlaceholderC";

interface HomePileCProps {
    homePile: Card[];
    suit: Suit;
    dispatch: Dispatch<Action>;
}
export function HomePileC(props: HomePileCProps): JSX.Element {
    return (
        <div className={"homePile"}>
            <PlaceholderC>
                <span>{emojiForSuit(props.suit)}</span>
            </PlaceholderC>
        </div>
    );
}
