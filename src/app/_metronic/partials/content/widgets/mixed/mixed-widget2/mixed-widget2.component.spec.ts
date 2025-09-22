import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../../shared/shared.module";
import { MixedWidget2Component } from "./mixed-widget2.component";

describe("MixedWidget2Component", () => {
  let component: MixedWidget2Component;
  let fixture: ComponentFixture<MixedWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget2Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize chartOptions on ngOnInit", () => {
    component.chartHeight = "400px";
    component.chartColor = "primary";
    component.strokeColor = "red";

    component.ngOnInit();

    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.chart.height).toBe("400px");
    expect(component.chartOptions.stroke.colors).toEqual(["red"]);
  });
});
