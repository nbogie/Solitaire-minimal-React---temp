import { useImmerReducer } from "use-immer";
import { allSuits, Card } from "../gameCore/card";
import {
    calculateWinState,
    createInitialGameState,
} from "../gameCore/gameState";
import { immerReducerFunction } from "../reducer/immerReducerFunction";
import { ColumnC } from "./ColumnC";
import { DiscardPileC } from "./DiscardPileC";
import { DrawPileC } from "./DrawPileC";
import { HomePileC } from "./HomePileC";

function SolitaireC() {
    const [gs, dispatch] = useImmerReducer(
        immerReducerFunction,
        createInitialGameState()
    );

    function handleClickedFaceDownCard(card: Card) {
        dispatch({ name: "reveal-card", card });
    }

    return (
        <div className="game">
            <h1>Patience / Klondike / Solitaire (React)</h1>
            <div className="cardTable">
                <div className="drawAndDiscardPiles">
                    <DrawPileC
                        drawPile={gs.drawPile}
                        dispatch={dispatch}
                        numDrawPilePassesRemaining={
                            gs.numDrawPilePassesRemaining
                        }
                    />
                    <DiscardPileC
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
                <div className="homePiles">
                    {allSuits.map((suit, ix) => (
                        <HomePileC
                            key={suit}
                            cardsInPile={gs.homePiles[suit]}
                            suit={suit}
                            dispatch={dispatch}
                        />
                    ))}
                </div>
            </div>

            {calculateWinState(gs) === "win" && (
                <div className="gameOver">You Win!</div>
            )}
        </div>
    );
}

export default SolitaireC;
