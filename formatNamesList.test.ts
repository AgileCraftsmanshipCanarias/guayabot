import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { formatNamesList } from "./formatNamesList.ts";

describe("formatNamesList", () => {
  it("formats a single name", () => {
    const names = ["Alice"];

    const result = formatNamesList(names);

    expect(result).toBe("Alice");
  });

  it("formats two names", () => {
    const names = ["Alice", "Bob"];

    const result = formatNamesList(names);

    expect(result).toBe("Alice y Bob");
  });

  it("formats any amount of names", () => {
    const names = ["Alice", "Bob", "Charlie"];

    const result = formatNamesList(names);

    expect(result).toBe("Alice, Bob y Charlie");
  });
});
