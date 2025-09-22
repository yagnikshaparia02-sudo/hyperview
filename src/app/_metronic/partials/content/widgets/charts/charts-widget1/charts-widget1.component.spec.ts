import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsWidget1Component } from "./charts-widget1.component";

describe("ChartsWidget1Component", () => {
  let component: ChartsWidget1Component;
  let fixture: ComponentFixture<ChartsWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ChartsWidget1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
