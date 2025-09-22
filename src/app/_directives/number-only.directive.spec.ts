import { NumberOnlyDirective } from "./number-only.directive";
import { ElementRef } from "@angular/core";

describe("NumberOnlyDirective", () => {
  let directive: NumberOnlyDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    mockElementRef = new ElementRef(document.createElement("input"));
    directive = new NumberOnlyDirective(mockElementRef);
  });

  it("should create the directive", () => {
    expect(directive).toBeTruthy();
  });
});
