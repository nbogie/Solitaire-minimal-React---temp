import { useImmerReducer } from "use-immer";
import { Card } from "../gameCore/card";
import { createInitialGameState } from "../gameCore/gameState";
import { immerReducerFunction } from "../reducer/immerReducerFunction";
import { ColumnC } from "./ColumnC";
import { DiscardPile } from "./DiscardPile";
import { DrawPile } from "./DrawPile";

function SolitaireC() {
    const [gs, dispatch] = useImmerReducer(
        immerReducerFunction,
        createInitialGameState()
    );

    function handleClickedFaceDownCard(card: Card) {
        dispatch({ name: "reveal-card", card });
    }

    return (
        <div>
            <h1>Patience / Klondike / Solitaire (React)</h1>
            <div className="cardTable">
                <div className="drawAndDiscardPiles">
                    <DrawPile drawPile={gs.drawPile} dispatch={dispatch} />
                    <DiscardPile
                        discardPile={gs.discardPile}
                        dispatch={dispatch}
                    />
                </div>
                {gs.columns.map((col, ix) => (
                    <ColumnC
                        {...{
                            col,
                            ix,
                            dispatch,
                            handleClickedFaceDownCard,
                        }}
                        key={ix}
                    />
                ))}
            </div>

            <h3>Messages:</h3>
            {[...gs.logMessages].reverse().map((m, ix) => (
                <p key={ix}>{m}</p>
            ))}
        </div>
    );
}

export default SolitaireC;
