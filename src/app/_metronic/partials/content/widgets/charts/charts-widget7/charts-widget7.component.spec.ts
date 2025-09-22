import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsWidget7Component } from "./charts-widget7.component";

describe("ChartsWidget7Component", () => {
  let component: ChartsWidget7Component;
  let fixture: ComponentFixture<ChartsWidget7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ChartsWidget7Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsWidget7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize chartOptions in ngOnInit", () => {
    component.ngOnInit();
    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.series.length).toBe(3); // Check the number of series
    expect(component.chartOptions.series[0].name).toBe("Net Profit"); // Check the first series name
    expect(component.chartOptions.series[1].name).toBe("Revenue"); // Check the second series name
    expect(component.chartOptions.series[2].name).toBe("Expenses"); // Check the third series name
  });
});
