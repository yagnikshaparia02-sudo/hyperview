import {
  ScrollTopComponent,
  defaultScrollTopOptions,
} from "./_ScrollTopComponent";
import { ElementAnimateUtil } from "../_utils/index";

describe("ScrollTopComponent", () => {
  let element: HTMLElement;
  let scrollTopComponent: ScrollTopComponent;

  beforeEach(() => {
    // Create a mock HTML element
    element = document.createElement("button");
    element.setAttribute("data-kt-scrolltop", "true");
    document.body.appendChild(element);

    // Initialize the ScrollTopComponent with default options
    scrollTopComponent = new ScrollTopComponent(element, {
      offset: defaultScrollTopOptions.offset,
      speed: defaultScrollTopOptions.speed,
    });
  });

  afterEach(() => {
    // Clean up the DOM
    document.body.removeChild(element);
  });

  it("should initialize with default options", () => {
    expect(scrollTopComponent.options).toEqual(defaultScrollTopOptions);
  });

  it("should save the element reference", () => {
    expect(scrollTopComponent.getElement()).toBe(element);
  });

  it("should set data attribute on scroll", () => {
    // Mock getScrollTop to return a value greater than the offset
    spyOn(window, "scroll").and.callFake(() => {
      Object.defineProperty(document.body, "scrollTop", {
        value: 250,
        writable: true,
      });
    });

    // Call the _scroll method again
    scrollTopComponent["_scroll"]();

    expect(document.body.hasAttribute("data-kt-scrolltop")).toBeFalsy();
  });

  it("should scroll to top on click", () => {
    const speed = scrollTopComponent.options.speed;
    spyOn(ElementAnimateUtil, "scrollTop");

    // Simulate a click event
    scrollTopComponent["_go"]();

    expect(ElementAnimateUtil.scrollTop).toHaveBeenCalledWith(0, speed);
  });

  it("should handle custom options", () => {
    const customOptions = { offset: 300, speed: 800 };
    const customScrollTopComponent = new ScrollTopComponent(
      element,
      customOptions
    );

    expect(customScrollTopComponent.options).toEqual(customOptions);
  });

  it("should correctly return null for non-existent options", () => {
    expect(scrollTopComponent["_getOption"]("nonexistent")).toBeNull();
  });

  it("should create instances for selector", () => {
    const newElement = document.createElement("div");
    newElement.setAttribute("data-kt-scrolltop", "true");
    document.body.appendChild(newElement);

    // Create instances
    ScrollTopComponent.createInstances('[data-kt-scrolltop="true"]');

    const instance = ScrollTopComponent.getInstance(newElement);
    expect(instance).toBeDefined();

    // Clean up
    document.body.removeChild(newElement);
  });

  it("should reinitialize instances", () => {
    const newElement = document.createElement("div");
    newElement.setAttribute("data-kt-scrolltop", "true");
    document.body.appendChild(newElement);

    // Initialize instance
    ScrollTopComponent.createInstances('[data-kt-scrolltop="true"]');

    const instance = ScrollTopComponent.getInstance(newElement);
    expect(instance).toBeDefined();

    // Reinitialize
    ScrollTopComponent.reinitialization();

    const newInstance = ScrollTopComponent.getInstance(newElement);
    expect(newInstance).toBeDefined();

    // Clean up
    document.body.removeChild(newElement);
  });
});
