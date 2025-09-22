// swapperComponent.spec.ts
import {
  SwapperComponent,
  SwapperStore,
  defaultSwapperOptions,
  defaultSwapperQueires,
} from "./_SwapperComponent";

describe("SwapperComponent", () => {
  let element: HTMLElement;
  let swapper: SwapperComponent;

  beforeEach(() => {
    // Create a mock HTML element
    element = document.createElement("div");
    element.id = "swapper-instance";
    document.body.appendChild(element);

    // Create an instance of SwapperComponent
    swapper = new SwapperComponent(
      element,
      { mode: "append" },
      defaultSwapperQueires
    );
  });

  afterEach(() => {
    document.body.removeChild(element);
    SwapperStore.remove(element.id);
  });

  it("should initialize with default options", () => {
    expect(swapper.options).toEqual(defaultSwapperOptions);
  });

  it("should handle event binding correctly", () => {
    const handler = jasmine.createSpy("handler");
    swapper.on("customEvent", handler);

    const event = new Event("customEvent");
    swapper.trigger("customEvent", event);

    expect(handler).toHaveBeenCalledWith(event);
  });

  it("should create instances correctly", () => {
    const instancesBefore = SwapperStore.getAllInstances().size;

    SwapperComponent.createInstances(defaultSwapperQueires.instanseQuery, {
      mode: "prepend",
    });

    const instancesAfter = SwapperStore.getAllInstances().size;

    expect(instancesAfter).toBeGreaterThanOrEqual(instancesBefore);
  });

  it("should remove an instance correctly", () => {
    expect(SwapperStore.has(element.id)).toBeTrue();
    SwapperStore.remove(element.id);
    expect(SwapperStore.has(element.id)).toBeFalse();
  });

  it("should correctly create a single instance with createInsance", () => {
    const instance = SwapperComponent.createInsance("#swapper-instance", {
      mode: "prepend",
    });
    expect(instance).toBeTruthy();
    expect(instance).toBe(swapper);
  });
});
