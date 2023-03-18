import { makeDeck } from "./deck";

test("makeDeck", () => {
    expect(makeDeck().length).toEqual(52);
});
