import {
  DrawerComponent,
  DrawerStore,
  defaultDrawerOptions,
} from "./_DrawerComponent";

describe("DrawerComponent", () => {
  let element: HTMLElement;
  let drawer: DrawerComponent;

  beforeEach(() => {
    // Set up mock DOM element
    element = document.createElement("div");
    element.setAttribute("data-kt-drawer", "true");
    element.setAttribute("id", "drawer1");
    document.body.appendChild(element);

    // Initialize DrawerComponent with mock element and default options
    drawer = new DrawerComponent(element, defaultDrawerOptions);
  });

  afterEach(() => {
    document.body.removeChild(element);
    DrawerStore.remove("drawer1"); // Clear store after each test
  });

  it("should initialize DrawerComponent and set it in DrawerStore", () => {
    expect(DrawerStore.get("drawer1")).toBe(drawer); // Check if DrawerComponent is stored
  });

  it("should show the drawer", () => {
    drawer.show();
    expect(drawer.isShown()).toBe(true);
    expect(element.classList.contains("drawer-on")).toBe(true);
  });

  it("should hide the drawer", () => {
    drawer.show(); // First show
    drawer.hide(); // Then hide
    expect(drawer.isShown()).toBe(false);
    expect(element.classList.contains("drawer-on")).toBe(false);
  });

  it("should toggle the drawer state", () => {
    drawer.toggle();
    expect(drawer.isShown()).toBe(true);
    drawer.toggle();
    expect(drawer.isShown()).toBe(false);
  });

  it("should remove instance from DrawerStore when remove is called", () => {
    DrawerStore.remove("drawer1");
    expect(DrawerStore.get("drawer1")).toBeUndefined();
  });

  it("should apply the overlay if specified in options", () => {
    drawer.show();
    expect(
      document.querySelector(`.${defaultDrawerOptions.overlayClass}`)
    ).not.toBeNull();
  });
});
