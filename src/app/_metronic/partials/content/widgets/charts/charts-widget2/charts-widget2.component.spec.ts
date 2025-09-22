import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsWidget2Component } from "./charts-widget2.component";

describe("ChartsWidget2Component", () => {
  let component: ChartsWidget2Component;
  let fixture: ComponentFixture<ChartsWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ChartsWidget2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
