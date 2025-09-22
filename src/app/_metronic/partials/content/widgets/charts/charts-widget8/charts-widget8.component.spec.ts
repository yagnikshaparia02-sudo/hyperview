import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsWidget8Component } from "./charts-widget8.component";

describe("ChartsWidget8Component", () => {
  let component: ChartsWidget8Component;
  let fixture: ComponentFixture<ChartsWidget8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgApexchartsModule],
      declarations: [ChartsWidget8Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsWidget8Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
