import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatsWidget1Component } from "./stats-widget1.component";

describe("StatsWidget1Component", () => {
  let component: StatsWidget1Component;
  let fixture: ComponentFixture<StatsWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsWidget1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsWidget1Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input properties", () => {
    expect(component.title).toBe("");
    expect(component.time).toBe("");
    expect(component.description).toBe("");
  });

  it("should set input properties correctly", () => {
    component.title = "Sales Report";
    component.time = "Last Month";
    component.description = "This report summarizes the sales performance.";

    fixture.detectChanges(); // Trigger change detection

    expect(component.title).toBe("Sales Report");
    expect(component.time).toBe("Last Month");
    expect(component.description).toBe(
      "This report summarizes the sales performance."
    );
  });
});
