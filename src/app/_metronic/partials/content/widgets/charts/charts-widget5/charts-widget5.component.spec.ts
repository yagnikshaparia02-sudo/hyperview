import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsWidget5Component } from "./charts-widget5.component";

describe("ChartsWidget5Component", () => {
  let component: ChartsWidget5Component;
  let fixture: ComponentFixture<ChartsWidget5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ChartsWidget5Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsWidget5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
