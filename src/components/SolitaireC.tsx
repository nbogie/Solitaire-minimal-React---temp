import { useImmerReducer } from "use-immer";
import { Card, isKing } from "../gameCore/card";
import { createInitialGameState } from "../gameCore/gameState";
import { immerReducerFunction } from "../reducer/immerReducerFunction";
import { CardC } from "./CardC";
import { ColumnC } from "./ColumnC";

function SolitaireC() {
    const [gs, dispatch] = useImmerReducer(
        immerReducerFunction,
        createInitialGameState()
    );

    function handleClickedCard(card: Card) {
        if (gs.selectedCard) {
            dispatch({
                name: "move-cards",
                destCard: card,
                topCard: gs.selectedCard,
            });
        } else {
            dispatch({ name: "select-card", card });
        }
    }
    function handleClickedFaceDownCard(card: Card) {
        dispatch({ name: "reveal-card", card });
    }

    function handleClickedEmptyColumn(colIx: number) {
        if (gs.selectedCard && isKing(gs.selectedCard)) {
            dispatch({
                name: "move-cards-to-empty-column",
                topCard: gs.selectedCard,
                columnIx: colIx,
            });
        }
    }

    return (
        <div>
            <h1>Patience / Klondike / Solitaire (React)</h1>
            <div className="cardTable">
                {gs.columns.map((col, ix) => (
                    <ColumnC
                        {...{
                            col,
                            ix,
                            dispatch,
                            handleClickedCard,
                            handleClickedEmptyColumn,
                            handleClickedFaceDownCard,
                        }}
                    />
                ))}
                <div>
                    {gs.selectedCard && (
                        <div>
                            Selected card:{" "}
                            <CardC
                                card={gs.selectedCard}
                                handleClickedCard={() => {}}
                                handleClickedFaceDownCard={() => {}}
                                dispatch={dispatch}
                            />
                            <button
                                onClick={() =>
                                    dispatch({ name: "clear-selected-card" })
                                }
                            >
                                cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <h3>Messages:</h3>
            {[...gs.logMessages].reverse().map((m, ix) => (
                <p key={ix}>{m}</p>
            ))}
        </div>
    );
}

export default SolitaireC;
