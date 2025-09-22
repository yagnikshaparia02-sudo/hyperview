import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsWidget3Component } from "./charts-widget3.component";

describe("ChartsWidget3Component", () => {
  let component: ChartsWidget3Component;
  let fixture: ComponentFixture<ChartsWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ChartsWidget3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsWidget3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
