import { ScrollComponent, defaultScrollOptions } from "./_ScrollComponent";

describe("ScrollComponent", () => {
  let element: HTMLElement;
  let scrollComponent: ScrollComponent;

  beforeEach(() => {
    // Create a mock HTML element
    element = document.createElement("div");
    element.setAttribute("id", "test-scroll");
    document.body.appendChild(element);

    // Initialize the ScrollComponent with default options
    scrollComponent = new ScrollComponent(element, {});
  });

  afterEach(() => {
    // Clean up the DOM
    document.body.removeChild(element);
  });

  it("should initialize with default options", () => {
    expect(scrollComponent.options).toEqual(defaultScrollOptions);
  });

  it("should save the element reference", () => {
    expect(scrollComponent.getElement()).toBe(element);
  });
});
