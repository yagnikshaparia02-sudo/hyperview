import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../../shared/shared.module";
import { MixedWidget8Component } from "./mixed-widget8.component";

describe("MixedWidget8Component", () => {
  let component: MixedWidget8Component;
  let fixture: ComponentFixture<MixedWidget8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget8Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget8Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize chartOptions on ngOnInit", () => {
    component.chartHeight = "300px";
    component.chartColor = "success";

    component.ngOnInit();

    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.chart.height).toBe("300px");
    expect(component.chartOptions.series.length).toBe(1);
    expect(component.chartOptions.series[0].name).toBe("Net Profit");
  });

  it("should refresh charts", () => {
    component.chartHeight = "400px";
    component.chartColor = "primary";

    const options = component.refreshCharts();

    expect(options).toBeDefined();
    expect(options.chart.height).toBe("400px");
    expect(options.series.length).toBe(1);
    expect(options.series[0].name).toBe("Net Profit");
  });
});
