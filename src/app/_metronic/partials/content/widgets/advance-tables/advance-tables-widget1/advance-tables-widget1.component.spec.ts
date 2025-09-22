import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { SharedModule } from "../../../../../shared/shared.module";
import { AdvanceTablesWidget1Component } from "./advance-tables-widget1.component";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";

describe("AdvanceTablesWidget1Component", () => {
  let component: AdvanceTablesWidget1Component;
  let fixture: ComponentFixture<AdvanceTablesWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, InlineSVGModule],
      declarations: [AdvanceTablesWidget1Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvanceTablesWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
