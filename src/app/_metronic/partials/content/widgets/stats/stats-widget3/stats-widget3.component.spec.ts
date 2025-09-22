import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatsWidget3Component } from "./stats-widget3.component";
import { ElementRef } from "@angular/core";

describe("StatsWidget3Component", () => {
  let component: StatsWidget3Component;
  let fixture: ComponentFixture<StatsWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsWidget3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsWidget3Component);
    component = fixture.componentInstance;

    // Mock ElementRef
    component.chartRef = new ElementRef(document.createElement("div"));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input properties", () => {
    expect(component.title).toBe("");
    expect(component.color).toBe("");
    expect(component.description).toBe("");
    expect(component.change).toBe("");
  });

  it("should set input properties correctly", () => {
    component.title = "Monthly Net Profit";
    component.color = "success"; // Example color variable
    component.description = "This widget shows the monthly net profit.";
    component.change = "+20%";

    fixture.detectChanges(); // Trigger change detection

    expect(component.title).toBe("Monthly Net Profit");
    expect(component.color).toBe("success");
    expect(component.description).toBe(
      "This widget shows the monthly net profit."
    );
    expect(component.change).toBe("+20%");
  });

  it("should initialize chart options on ngOnInit", () => {
    component.color = "success"; // Mocking color input
    component.ngOnInit();

    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.series[0].name).toBe("Net Profit");
    expect(component.chartOptions.series[0].data).toEqual([30, 45, 32, 70, 40]);
  });
});
