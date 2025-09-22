import {
  FeedbackComponent,
  defaultFeedbackOptions,
} from "./_FeedbackComponent";
import { ElementStyleUtil, EventHandlerUtil, DataUtil } from "../_utils/index";

describe("FeedbackComponent", () => {
  let feedbackComponent: FeedbackComponent;
  let mockElement: HTMLElement;

  beforeEach(() => {
    // Create a mock HTML element to pass to the FeedbackComponent
    mockElement = document.createElement("div");
    document.body.appendChild(mockElement); // Add to DOM for testing
    feedbackComponent = new FeedbackComponent(mockElement, {
      content: "Test feedback",
    });
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(mockElement);
  });

  it("should initialize with default options", () => {
    expect(feedbackComponent.options).toEqual(defaultFeedbackOptions);
    expect(feedbackComponent.shown).toBeFalse();
  });
});
