// stickyComponent.spec.ts
import { StickyComponent, defaultStickyOptions } from "./_StickyComponent";

describe("StickyComponent", () => {
  let element: HTMLElement;
  let sticky: StickyComponent;

  beforeEach(() => {
    // Create a mock HTML element
    element = document.createElement("div");
    document.body.appendChild(element);
    sticky = new StickyComponent(element, {
      offset: defaultStickyOptions.offset,
      reverse: defaultStickyOptions.reverse,
      animation: defaultStickyOptions.animation,
      animationSpeed: defaultStickyOptions.animationSpeed,
      animationClass: defaultStickyOptions.animationClass,
    });
  });

  it("should initialize with default options", () => {
    expect(sticky.options).toEqual(defaultStickyOptions);
  });

  it("should initialize with provided options", () => {
    const options = {
      offset: 100,
      reverse: true,
      animation: false,
      animationSpeed: "0.5s",
      animationClass: "test-animation",
    };
    const stickyWithOptions = new StickyComponent(element, options);
    expect(stickyWithOptions.options).toEqual({
      ...defaultStickyOptions,
      ...options,
    });
  });

  it("should correctly create instance and bootstrap", () => {
    StickyComponent.bootstrap('[data-kt-sticky="true"]');
    const instance = StickyComponent.getInstance(element);
    expect(instance).toBeTruthy();
  });
});
