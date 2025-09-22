import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TilesWidget10Component } from "./tiles-widget10.component";

describe("TilesWidget10Component", () => {
  let component: TilesWidget10Component;
  let fixture: ComponentFixture<TilesWidget10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TilesWidget10Component],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesWidget10Component);
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
