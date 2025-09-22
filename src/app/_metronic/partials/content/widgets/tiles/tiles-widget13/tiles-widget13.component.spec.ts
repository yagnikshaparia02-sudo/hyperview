import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TilesWidget13Component } from "./tiles-widget13.component";

describe("TilesWidget13Component", () => {
  let component: TilesWidget13Component;
  let fixture: ComponentFixture<TilesWidget13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TilesWidget13Component],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesWidget13Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default properties", () => {
    expect(component.cssClass).toBe("");
    expect(component.widgetHeight).toBe("225px");
  });

  it("should accept input properties", () => {
    component.cssClass = "custom-class";
    component.widgetHeight = "300px";
    fixture.detectChanges(); // Trigger change detection

    expect(component.cssClass).toBe("custom-class");
    expect(component.widgetHeight).toBe("300px");
  });
});
