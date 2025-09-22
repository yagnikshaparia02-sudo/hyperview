import {
  PasswordMeterComponent,
  defaultPasswordMeterOptions,
  defaultPasswordMeterQueires,
} from "./_PasswordMeterComponent";

describe("PasswordMeterComponent", () => {
  let element: HTMLElement;
  let inputElement: HTMLInputElement;
  let visibilityElement: HTMLElement;
  let highlightElement: HTMLElement;
  let passwordMeter: PasswordMeterComponent;

  beforeEach(() => {
    // Set up DOM elements
    element = document.createElement("div");
    inputElement = document.createElement("input");
    inputElement.type = "password";
    visibilityElement = document.createElement("div");
    highlightElement = document.createElement("div");

    // Append them to element
    element.appendChild(inputElement);
    element.appendChild(visibilityElement);
    element.appendChild(highlightElement);

    document.body.appendChild(element);

    // Initialize the component
    passwordMeter = new PasswordMeterComponent(
      element,
      defaultPasswordMeterOptions,
      defaultPasswordMeterQueires
    );
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it("should calculate correct score for password with different criteria", () => {
    // Set input value and check score calculation
    inputElement.value = "Password1!";
    passwordMeter.check();
    expect(passwordMeter.getScore()).toBe(100); // Meets all criteria

    inputElement.value = "Pass";
    passwordMeter.check();
    expect(passwordMeter.getScore()).toBeLessThan(100); // Does not meet all criteria
  });

  it("should trigger reinitialization and update instance", () => {
    // Mock function for coverage
    PasswordMeterComponent.reinitialization();

    // Expect new instances to exist without duplication
    expect(PasswordMeterComponent.getInstance(element)).toBeDefined();
  });
});
