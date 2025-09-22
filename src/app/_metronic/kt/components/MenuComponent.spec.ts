// menuComponent.spec.ts
import { MenuComponent, defaultMenuOptions } from "./MenuComponent";

describe("MenuComponent", () => {
  let element: HTMLElement;
  let menu: MenuComponent;

  beforeEach(() => {
    // Create a mock HTML element for the menu
    element = document.createElement("div");
    element.setAttribute("id", "test-menu");
    document.body.appendChild(element);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(element);
  });

  it("should initialize with provided options", () => {
    const customOptions = {
      dropdown: {
        hoverTimeout: 300,
        zindex: 110,
      },
      accordion: {
        slideSpeed: 300,
        expand: true,
      },
    };

    menu = new MenuComponent(element, customOptions);
    expect(menu.options).toEqual(customOptions);
  });
});
