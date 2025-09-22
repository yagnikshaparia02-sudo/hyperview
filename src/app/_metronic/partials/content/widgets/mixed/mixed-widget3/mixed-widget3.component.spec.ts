import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../../shared/shared.module";
import { MixedWidget3Component } from "./mixed-widget3.component";

describe("MixedWidget3Component", () => {
  let component: MixedWidget3Component;
  let fixture: ComponentFixture<MixedWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget3Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize chartOptions on ngOnInit", () => {
    component.chartHeight = "300px";
    component.ngOnInit();

    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.chart.height).toBe("300px");
    expect(component.chartOptions.series.length).toBe(2);
  });
});
