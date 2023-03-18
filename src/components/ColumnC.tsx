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
    handleClickedEmptyColumn: (columnIx: number) => void;
    handleClickedCard: (card: Card) => void;
    handleClickedFaceDownCard: (card: Card) => void;
}
export function ColumnC({
    col,
    ix,
    dispatch,
    handleClickedEmptyColumn,
    handleClickedCard,
    handleClickedFaceDownCard,
}: ColumnCProps): JSX.Element {
    return (
        <div className="column" key={ix}>
            <ColumnHeaderC
                col={col}
                ix={ix}
                handleClickedEmptyColumn={handleClickedEmptyColumn}
                dispatch={dispatch}
            />
            <div className="cardList">
                {col.map((card, ixc) => (
                    <CardC
                        card={card}
                        key={ixc}
                        handleClickedCard={handleClickedCard}
                        handleClickedFaceDownCard={() => {
                            if (ixc === col.length - 1) {
                                handleClickedFaceDownCard(card);
                            }
                        }}
                        dispatch={dispatch}
                    />
                ))}
            </div>
        </div>
    );
}
