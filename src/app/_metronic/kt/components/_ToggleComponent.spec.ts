// toggleComponent.spec.ts
import { ToggleComponent, defaultToggleOptions } from "./_ToggleComponent";
import { CookieComponent } from "./_CookieComponent";

describe("ToggleComponent", () => {
  let element: HTMLElement;
  let toggle: ToggleComponent;

  beforeEach(() => {
    // Create a mock HTML element
    element = document.createElement("button");
    element.setAttribute("data-kt-toggle-target", "#target");
    element.setAttribute("data-kt-toggle-name", "example");
    document.body.appendChild(element);

    // Create a target element
    const targetElement = document.createElement("div");
    targetElement.id = "target";
    document.body.appendChild(targetElement);

    // Create an instance of ToggleComponent
    toggle = new ToggleComponent(element, { saveState: true });
  });

  afterEach(() => {
    document.body.removeChild(element);
    const targetElement = document.getElementById("target");
    if (targetElement) {
      document.body.removeChild(targetElement);
    }
  });

  it("should initialize with default options", () => {
    expect(toggle.options).toEqual(defaultToggleOptions);
  });

  it("should correctly set the target element", () => {
    expect(toggle.target).toBeTruthy();
    expect(toggle.target?.id).toBe("target");
  });

  it("should disable the toggle correctly", () => {
    toggle.enable(); // Ensure it is enabled first
    toggle.disable();
    expect(toggle.isEnabled()).toBeFalse();
    expect(toggle.target?.getAttribute("data-kt-example")).toBeNull();
  });

  it("should save state to cookies if saveState is true", () => {
    const setSpy = spyOn(CookieComponent, "set");
    toggle.enable();
    expect(setSpy).toHaveBeenCalledWith("data-kt-example", "on", {});
  });

  it("should remove state from cookies when disabled", () => {
    toggle.enable(); // Ensure it is enabled first
    const deleteSpy = spyOn(CookieComponent, "delete");
    toggle.disable();
    expect(deleteSpy).toHaveBeenCalledWith("data-kt-example");
  });

  it("should correctly handle event binding", () => {
    const handler = jasmine.createSpy("handler");
    toggle.on("kt.toggle.change", handler);

    toggle.toggle(); // This should trigger the change event
    expect(handler).toHaveBeenCalled();
  });

  it("should return an existing instance with getInstance", () => {
    toggle = new ToggleComponent(element, { saveState: true });
    const instance = ToggleComponent.getInstance(element);
    expect(instance).toBe(toggle);
  });
});
