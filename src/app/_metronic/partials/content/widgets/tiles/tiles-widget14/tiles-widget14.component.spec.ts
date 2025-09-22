import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TilesWidget14Component } from "./tiles-widget14.component";

describe("TilesWidget14Component", () => {
  let component: TilesWidget14Component;
  let fixture: ComponentFixture<TilesWidget14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TilesWidget14Component],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesWidget14Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default properties", () => {
    expect(component.cssClass).toBe("");
  });

  it("should accept input properties", () => {
    component.cssClass = "custom-class";
    fixture.detectChanges(); // Trigger change detection

    expect(component.cssClass).toBe("custom-class");
  });
});
