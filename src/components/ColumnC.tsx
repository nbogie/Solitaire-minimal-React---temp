import { Dispatch } from "react";
import { Card } from "../gameCore/card";
import { Column } from "../gameCore/deck";
import { Action } from "../reducer/action";
import { CardC } from "./CardC";
import { ColumnHeaderC } from "./ColumnHeaderC";

interface ColumnCProps {
    col: Column;
    ix: number;
    dispatch: Dispatch<Action>;
    handleClickedFaceDownCard: (card: Card) => void;
}
export function ColumnC({
    col,
    ix,
    dispatch,
    handleClickedFaceDownCard,
}: ColumnCProps): JSX.Element {
    return (
        <div className="column" key={ix}>
            <ColumnHeaderC col={col} ix={ix} dispatch={dispatch} />
            <div className="cardList">
                {col.map((card, ixc) => (
                    <CardC
                        card={card}
                        key={ixc}
                        handleClickedFaceDownCard={() => {
                            if (ixc === col.length - 1) {
                                handleClickedFaceDownCard(card);
                            }
                        }}
                        dispatch={dispatch}
                        cardOrigin={{ name: "column" }}
                        isDragOrigin={true}
                        isDropTarget={true}
                    />
                ))}
            </div>
        </div>
    );
}
