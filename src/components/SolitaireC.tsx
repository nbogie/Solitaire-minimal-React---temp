import { useImmerReducer } from "use-immer";
import { Card, isKing } from "../gameCore/card";
import { createInitialGameState } from "../gameCore/gameState";
import { immerReducerFunction } from "../reducer/immerReducerFunction";
import { CardC } from "./CardC";
import { ColumnHeaderC } from "./ColumnHeaderC";

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
            <h1>Klondike / Solitaire (React prototype)</h1>
            <div className="cardTable">
                {gs.columns.map((col, ix) => (
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
