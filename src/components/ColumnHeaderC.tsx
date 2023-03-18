import { Dispatch } from "react";
import { useDrop } from "react-dnd";
import { Card, isKing } from "../gameCore/card";
import { Column } from "../gameCore/deck";
import { Action } from "../reducer/action";

interface ColumnHeaderCProps {
    col: Column;
    handleClickedEmptyColumn: (colIx: number) => void;
    ix: number;
    dispatch: Dispatch<Action>;
}
export function ColumnHeaderC({
    col,
    ix,
    handleClickedEmptyColumn,
    dispatch,
}: ColumnHeaderCProps) {
    const [, dropRef] = useDrop({
        accept: "card",
        canDrop: (item: Card) => {
            // return gs.selectedCard && isKing(gs.selectedCard);
            return true;
        },
        drop: (item: Card) => {
            dispatch({
                name: "move-cards-to-empty-column",
                columnIx: ix,
                topCard: item,
            });
        },
    });

    return (
        <div
            ref={dropRef}
            className="columnHeader"
            onClick={
                col.length === 0 ? () => handleClickedEmptyColumn(ix) : () => {}
            }
        >
            Column:
        </div>
    );
}
