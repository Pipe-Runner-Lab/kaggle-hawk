import { expect } from "chai";
import { push } from "../src/utils/queue";

describe("Queue utility function test", () => {
  let testArray: number[] = [1, 2, 3];

  it("pushes correctly if not full", () => {
    const output = push<number>(4, testArray, 4);
    expect(output).to.be.an("array").to.have.lengthOf(4);
  });

  it("pushes correctly if already full", () => {
    const output = push<number>(4, testArray, 3);
    expect(output)
      .to.be.an("array")
      .to.have.lengthOf(3)
      .to.deep.equal([2, 3, 4]);
  });
});
