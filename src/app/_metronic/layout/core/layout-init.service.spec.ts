import { TestBed } from "@angular/core/testing";
import { LayoutInitService } from "./layout-init.service";
import { LayoutService } from "./layout.service";

describe("LayoutInitService", () => {
  let service: LayoutInitService;
  let layoutServiceMock: any;

  beforeEach(() => {
    layoutServiceMock = {
      initConfig: jasmine.createSpy("initConfig"),
      getProp: jasmine.createSpy("getProp").and.callFake((key: string) => {
        const props = {
          "main.body.backgroundImage": "background.jpg",
          "main.body.class": "class1 class2",
          "header.width": "fluid",
          "header.fixed.desktop": true,
          "pageTitle.display": true,
          "pageTitle.direction": "row",
          "toolbar.display": true,
          "toolbar.width": "fluid",
          "aside.display": true,
          "aside.theme": "light",
        };
        return props[key];
      }),
      setCSSClass: jasmine.createSpy("setCSSClass"),
      setHTMLAttribute: jasmine.createSpy("setHTMLAttribute"),
    };

    TestBed.configureTestingModule({
      providers: [
        LayoutInitService,
        { provide: LayoutService, useValue: layoutServiceMock },
      ],
    });

    service = TestBed.inject(LayoutInitService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should initialize the layout", () => {
    service.init();

    expect(layoutServiceMock.initConfig).toHaveBeenCalled();
    expect(document.body.getAttribute("id")).toBe("kt_body");
    expect(document.body.style.backgroundImage).toBe('url("background.jpg")');
    expect(document.body.classList.contains("class1")).toBeTrue();
    expect(document.body.classList.contains("class2")).toBeTrue();
  });

  it("should initialize the header", () => {
    service.init();

    expect(layoutServiceMock.setCSSClass).toHaveBeenCalledWith(
      "headerContainer",
      "container-fluid"
    );
    expect(document.body.classList.contains("header-fixed")).toBeTrue();
  });

  it("should initialize the page title", () => {
    service.init();

    expect(layoutServiceMock.setCSSClass).toHaveBeenCalledWith(
      "pageTitle",
      "align-items-center"
    );
    expect(layoutServiceMock.setCSSClass).toHaveBeenCalledWith(
      "pageTitle",
      "flex-wrap"
    );
  });

  it("should initialize the toolbar", () => {
    service.init();

    expect(document.body.classList.contains("toolbar-enabled")).toBeTrue();
    expect(layoutServiceMock.setCSSClass).toHaveBeenCalledWith(
      "toolbarContainer",
      "container-fluid"
    );
  });

  it("should initialize the aside", () => {
    service.init();

    expect(document.body.classList.contains("aside-enabled")).toBeTrue();
    expect(layoutServiceMock.setCSSClass).toHaveBeenCalledWith(
      "aside",
      "aside-light"
    );
  });
});
