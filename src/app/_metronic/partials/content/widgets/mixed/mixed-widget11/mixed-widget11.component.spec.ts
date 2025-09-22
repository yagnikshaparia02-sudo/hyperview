import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MixedWidget11Component } from "./mixed-widget11.component";
import { getCSSVariableValue } from "../../../../../kt/_utils";
import { SharedModule } from "../../../../../shared/shared.module";

describe("MixedWidget11Component", () => {
  let component: MixedWidget11Component;
  let fixture: ComponentFixture<MixedWidget11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget11Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget11Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize chartOptions on ngOnInit", () => {
    component.chartHeight = "300px";
    component.chartColor = "primary";

    component.ngOnInit();

    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.chart.height).toBe("300px");
    expect(component.chartOptions.series.length).toBe(2);
    expect(component.chartOptions.series[0].name).toBe("Net Profit");
    expect(component.chartOptions.series[1].name).toBe("Revenue");
  });

  it("should set correct data for the series", () => {
    component.chartHeight = "400px";
    component.chartColor = "success";

    component.ngOnInit();

    expect(component.chartOptions.series[0].data).toEqual([
      50, 60, 70, 80, 60, 50, 70, 60,
    ]);
    expect(component.chartOptions.series[1].data).toEqual([
      50, 60, 70, 80, 60, 50, 70, 60,
    ]);
  });

  it("should use the correct colors", () => {
    component.chartColor = "warning";
    component.ngOnInit();

    const baseColor = getCSSVariableValue("--bs-warning");
    const secondaryColor = getCSSVariableValue("--bs-gray-300");

    expect(component.chartOptions.colors).toEqual([baseColor, secondaryColor]);
  });
});
