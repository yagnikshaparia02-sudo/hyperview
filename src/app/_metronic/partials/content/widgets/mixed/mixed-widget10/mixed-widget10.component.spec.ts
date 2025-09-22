import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MixedWidget10Component } from "./mixed-widget10.component";
import { SharedModule } from "../../../../../shared/shared.module";

describe("MixedWidget10Component", () => {
  let component: MixedWidget10Component;
  let fixture: ComponentFixture<MixedWidget10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget10Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget10Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize chartOptions on ngOnInit", () => {
    component.chartHeight = "300px";
    component.chartColor = "warning";

    component.ngOnInit();

    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.chart.height).toBe("300px");
    expect(component.chartOptions.series.length).toBe(1);
    expect(component.chartOptions.series[0].name).toBe("Net Profit");
  });

  it("should set correct data for the series", () => {
    component.chartHeight = "400px";
    component.chartColor = "info";

    component.ngOnInit();

    expect(component.chartOptions.series[0].data).toEqual([
      15, 25, 15, 40, 20, 50,
    ]);
  });
});
