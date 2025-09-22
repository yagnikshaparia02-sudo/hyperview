import { TestBed } from "@angular/core/testing";
import { LayoutService, LayoutType } from "./layout.service";
import { DefaultLayoutConfig } from "./configs/default-layout.config";

describe("LayoutService", () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutService],
    });
    service = TestBed.inject(LayoutService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should initialize with default config", () => {
    service.initConfig();
    expect(service.getConfig()).toEqual(DefaultLayoutConfig);
  });

  it("should return CSS classes for a given path", () => {
    const path = "header";
    const cssClass = "header-class";
    service.setCSSClass(path, cssClass);

    expect(service.getCSSClasses(path)).toContain(cssClass);
  });

  it("should return HTML attributes for a given path", () => {
    const path = "headerContainer";
    const attrKey = "data-test";
    const attrValue = "test-value";

    service.setHTMLAttribute(path, attrKey, attrValue);

    const attributes = service.getHTMLAttributes(path);
    expect(attributes[attrKey]).toBe(attrValue);
  });

  it("should set CSS classes correctly", () => {
    const path = "aside";
    const classes = "aside-class";

    service.setCSSClass(path, classes);
    expect(service.getStringCSSClasses(path)).toBe(classes);
  });
});
