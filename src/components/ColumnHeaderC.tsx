import { Dispatch } from "react";
import { useDrop } from "react-dnd";
import { Card } from "../gameCore/card";
import { canMoveCardsToTopOfColumn, Column } from "../gameCore/deck";
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
            return canMoveCardsToTopOfColumn(item, col);
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
