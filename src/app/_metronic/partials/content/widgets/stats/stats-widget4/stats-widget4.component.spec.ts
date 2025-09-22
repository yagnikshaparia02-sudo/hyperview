import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatsWidget4Component } from "./stats-widget4.component";
import { ElementRef } from "@angular/core";

describe("StatsWidget4Component", () => {
  let component: StatsWidget4Component;
  let fixture: ComponentFixture<StatsWidget4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsWidget4Component],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsWidget4Component);
    component = fixture.componentInstance;

    // Mock ElementRef
    component.chartRef = new ElementRef(document.createElement("div"));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input properties", () => {
    expect(component.svgIcon).toBe("");
    expect(component.color).toBe("");
    expect(component.description).toBe("");
    expect(component.change).toBe("");
  });

  it("should set input properties correctly", () => {
    component.svgIcon = "icon.svg";
    component.color = "primary"; // Example color variable
    component.description = "This widget shows the net profit.";
    component.change = "+15%";

    fixture.detectChanges(); // Trigger change detection

    expect(component.svgIcon).toBe("icon.svg");
    expect(component.color).toBe("primary");
    expect(component.description).toBe("This widget shows the net profit.");
    expect(component.change).toBe("+15%");
  });

  it("should initialize chart options on ngOnInit", () => {
    component.color = "primary"; // Mocking color input
    component.ngOnInit();

    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.series[0].name).toBe("Net Profit");
    expect(component.chartOptions.series[0].data).toEqual([
      40, 40, 30, 30, 35, 35, 50,
    ]);
  });
});
