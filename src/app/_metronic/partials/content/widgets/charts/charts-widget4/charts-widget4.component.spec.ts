import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsWidget4Component } from "./charts-widget4.component";

describe("ChartsWidget4Component", () => {
  let component: ChartsWidget4Component;
  let fixture: ComponentFixture<ChartsWidget4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ChartsWidget4Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsWidget4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
