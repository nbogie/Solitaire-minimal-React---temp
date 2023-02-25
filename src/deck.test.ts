import { makeDeck } from "./deck";

test("Thing", () => {
  expect(3 + 7).toEqual(10);
  expect(makeDeck().length).toEqual(52);
});
