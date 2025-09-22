import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TilesWidget12Component } from "./tiles-widget12.component";

describe("TilesWidget12Component", () => {
  let component: TilesWidget12Component;
  let fixture: ComponentFixture<TilesWidget12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TilesWidget12Component],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesWidget12Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default properties", () => {
    expect(component.cssClass).toBe("");
    expect(component.widgetHeight).toBe("150px");
    expect(component.iconColor).toBe("success");
    expect(component.svgCSSClass).toBe("");
  });

  it("should compute SVG class on init", () => {
    component.ngOnInit();
    expect(component.svgCSSClass).toBe("svg-icon--success");
  });

  it("should accept input properties", () => {
    component.cssClass = "custom-class";
    component.widgetHeight = "180px";
    component.iconColor = "danger";
    fixture.detectChanges(); // Trigger change detection
    component.ngOnInit(); // Call ngOnInit to recompute classes

    expect(component.cssClass).toBe("custom-class");
    expect(component.widgetHeight).toBe("180px");
    expect(component.svgCSSClass).toBe("svg-icon--danger");
  });
});
