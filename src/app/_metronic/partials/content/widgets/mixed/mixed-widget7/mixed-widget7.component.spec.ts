import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MixedWidget7Component } from "./mixed-widget7.component";
import { SharedModule } from "../../../../../shared/shared.module";

describe("MixedWidget7Component", () => {
  let component: MixedWidget7Component;
  let fixture: ComponentFixture<MixedWidget7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget7Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget7Component);
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
    expect(component.chartOptions.series[0]).toBe(74);
  });
});
