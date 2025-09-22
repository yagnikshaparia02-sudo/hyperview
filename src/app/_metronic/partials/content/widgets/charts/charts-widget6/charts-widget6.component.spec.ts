import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsWidget6Component } from "./charts-widget6.component";

describe("ChartsWidget6Component", () => {
  let component: ChartsWidget6Component;
  let fixture: ComponentFixture<ChartsWidget6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ChartsWidget6Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsWidget6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
