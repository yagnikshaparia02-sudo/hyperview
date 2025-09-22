import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TilesWidget3Component } from "./tiles-widget3.component";

describe("TilesWidget3Component", () => {
  let component: TilesWidget3Component;
  let fixture: ComponentFixture<TilesWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TilesWidget3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesWidget3Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default properties", () => {
    expect(component.cssClass).toBe("");
    expect(component.widgetHeight).toBe("130px");
  });

  it("should accept input properties", () => {
    component.cssClass = "custom-class";
    component.widgetHeight = "150px";
    fixture.detectChanges(); // Trigger change detection

    expect(component.cssClass).toBe("custom-class");
    expect(component.widgetHeight).toBe("150px");
  });
});
