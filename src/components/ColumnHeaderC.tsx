import { Dispatch } from "react";
import { useDrop } from "react-dnd";
import { canMoveCardsToTopOfColumn, Column } from "../gameCore/deck";
import { Action } from "../reducer/action";
import { DnDCardItem } from "./CardC";
import { PlaceholderC } from "./PlaceholderC";

interface ColumnHeaderCProps {
    col: Column;
    ix: number;
    dispatch: Dispatch<Action>;
}
export function ColumnHeaderC({ col, ix, dispatch }: ColumnHeaderCProps) {
    const [, dropRef] = useDrop({
        accept: "card",
        canDrop: (item: DnDCardItem) => {
            return canMoveCardsToTopOfColumn(item.card, col);
        },
        drop: (item: DnDCardItem) => {
            dispatch({
                name: "move-cards-to-empty-column",
                columnIx: ix,
                topCard: item.card,
                origin: item.origin,
            });
        },
    });

    return (
        <div ref={dropRef} className="columnHeader">
            {col.length === 0 ? <PlaceholderC /> : null}
        </div>
    );
}
