import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../../shared/shared.module";
import { MixedWidget6Component } from "./mixed-widget6.component";

describe("MixedWidget6Component", () => {
  let component: MixedWidget6Component;
  let fixture: ComponentFixture<MixedWidget6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget6Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget6Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize chartOptions on ngOnInit", () => {
    component.chartHeight = "400px";
    component.chartColor = "success";

    component.ngOnInit();

    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.chart.height).toBe("400px");
    expect(component.chartOptions.series.length).toBe(1);
  });
});
