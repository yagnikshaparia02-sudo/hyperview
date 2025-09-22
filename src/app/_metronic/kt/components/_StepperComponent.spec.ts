import { StepperComponent, defaultStepperOptions } from "./_StepperComponent";
import { EventHandlerUtil } from "../_utils/EventHandlerUtil";

describe("StepperComponent", () => {
  let element: HTMLElement;
  let stepper: StepperComponent;

  beforeEach(() => {
    // Create a mock HTML element for testing
    element = document.createElement("div");
    element.setAttribute("data-kt-stepper", "");
    element.innerHTML = `
      <div data-kt-stepper-element="nav"><span>Step 1</span></div>
      <div data-kt-stepper-element="content">Content for Step 1</div>
      <div data-kt-stepper-element="nav"><span>Step 2</span></div>
      <div data-kt-stepper-element="content">Content for Step 2</div>
      <button data-kt-stepper-action="next">Next</button>
      <button data-kt-stepper-action="previous">Previous</button>
      <button data-kt-stepper-action="submit">Submit</button>
    `;
    document.body.appendChild(element);

    // Initialize StepperComponent
    stepper = new StepperComponent(element, defaultStepperOptions);
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.removeChild(element);
  });

  it("should initialize with default options", () => {
    expect(stepper).toBeTruthy();
    expect(stepper.options).toEqual(defaultStepperOptions);
    expect(stepper.currentStepIndex).toBe(1);
  });

  it("should go to a specified step", () => {
    stepper.goto(2);
    expect(stepper.currentStepIndex).toBe(2);
  });

  it("should not go to a step if it is already current", () => {
    stepper.goto(1);
    expect(stepper.currentStepIndex).toBe(1);
  });

  it('should trigger "kt.stepper.changed" event on step change', () => {
    const changeSpy = spyOn(EventHandlerUtil, "trigger");
    stepper.goto(2);
    expect(changeSpy).toHaveBeenCalledWith(element, "kt.stepper.changed");
  });

  it("should handle next button click", () => {
    const nextSpy = spyOn(EventHandlerUtil, "trigger");
    const nextButton = stepper.btnNext as HTMLElement;

    nextButton.click(); // Simulate click
    expect(nextSpy).toHaveBeenCalledWith(
      element,
      "kt.stepper.next",
      jasmine.any(Event)
    );
  });

  it("should handle previous button click", () => {
    stepper.goto(2); // Go to step 2 first
    const prevSpy = spyOn(EventHandlerUtil, "trigger");
    const prevButton = stepper.btnPrev as HTMLElement;

    prevButton.click(); // Simulate click
    expect(prevSpy).toHaveBeenCalledWith(
      element,
      "kt.stepper.previous",
      jasmine.any(Event)
    );
  });

  it("should get the next step index correctly", () => {
    expect(stepper.getNextStepIndex()).toBe(2);
    stepper.goto(2);
    expect(stepper.getNextStepIndex()).toBe(2); // No next step available
  });

  it("should get the previous step index correctly", () => {
    expect(stepper.getPrevStepIndex()).toBe(1); // At step 1
    stepper.goto(2);
    expect(stepper.getPrevStepIndex()).toBe(1); // From step 2, can go back to step 1
  });

  it("should set correct classes for pending steps", () => {
    stepper.goto(2);
    const elements = stepper.element.querySelectorAll(
      '[data-kt-stepper-element="nav"], [data-kt-stepper-element="content"]'
    );
    expect(elements[2].classList.contains("pending")).toBeTruthy();
  });

  it("should destroy the stepper instance", () => {
    const consoleSpy = spyOn(console, "log");
    stepper.destroy();
    expect(consoleSpy).toHaveBeenCalledWith("destroy stepper");
  });

  it("should create a new instance if one does not exist", () => {
    const newStepper = StepperComponent.createInsance(element);
    expect(newStepper).toBeTruthy();
  });

  it("should not create a new instance if one already exists", () => {
    const firstStepper = StepperComponent.createInsance(element);
    const secondStepper = StepperComponent.createInsance(element);
    expect(secondStepper).toBe(firstStepper);
  });

  it("should bootstrap instances correctly", () => {
    const bootstrapSpy = spyOn(StepperComponent, "createInstances");
    StepperComponent.bootstrap();
    expect(bootstrapSpy).toHaveBeenCalledWith("[data-kt-stepper]");
  });
});
