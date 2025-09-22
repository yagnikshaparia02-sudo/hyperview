import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TilesWidget1Component } from "./tiles-widget1.component";
import { LayoutService } from "../../../../../layout";
import { of } from "rxjs";

class MockLayoutService {
  getProp(key: string) {
    const mockProps = {
      "js.fontFamily": "Arial, sans-serif",
      "js.colors.gray.gray500": "#7d7d7d",
      "js.colors.gray.gray200": "#d3d3d3",
      "js.colors.gray.gray300": "#b0b0b0",
      "js.colors.theme.base.danger": "#ff0000",
      "js.colors.theme.base.primary": "#007bff",
      "js.colors.theme.light.primary": "#5bc0de",
    };
    return mockProps[key];
  }
}

describe("TilesWidget1Component", () => {
  let component: TilesWidget1Component;
  let fixture: ComponentFixture<TilesWidget1Component>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TilesWidget1Component],
      providers: [{ provide: LayoutService, useClass: MockLayoutService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesWidget1Component);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default properties", () => {
    expect(component.cssClass).toBe("");
    expect(component.chartColor).toBe("primary");
    expect(component.chartOptions).toEqual({});
  });

  it("should set up layout properties on init", () => {
    component.ngOnInit();

    expect(component.fontFamily).toBe("Arial, sans-serif");
    expect(component.colorsGrayGray500).toBe("#7d7d7d");
    expect(component.colorsGrayGray200).toBe("#d3d3d3");
    expect(component.colorsGrayGray300).toBe("#b0b0b0");
    expect(component.colorsThemeBaseDanger).toBe("#ff0000");
    expect(component.colorsThemeBaseColor).toBe("#007bff");
    expect(component.colorsThemeLightColor).toBe("#5bc0de");
  });

  it("should generate chart options", () => {
    component.ngOnInit();
    const chartOptions = component.getChartOptions();

    expect(chartOptions.series.length).toBe(1);
    expect(chartOptions.series[0].name).toBe("Net Profit");
    expect(chartOptions.series[0].data.length).toBe(12);
    expect(chartOptions.chart.height).toBe("120px");
    expect(chartOptions.colors[0]).toBe("#5bc0de"); // Light color based on default chartColor
  });

  it("should return correct tooltip formatter", () => {
    const chartOptions = component.getChartOptions();
    const tooltipValue = chartOptions.tooltip.y.formatter(25);

    expect(tooltipValue).toBe("$ 25 thousands");
  });
});
