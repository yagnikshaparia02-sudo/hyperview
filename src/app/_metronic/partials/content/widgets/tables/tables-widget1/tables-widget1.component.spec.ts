import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg-2";
import { TablesWidget1Component } from "./tables-widget1.component";

describe("TablesWidget1Component", () => {
  let component: TablesWidget1Component;
  let fixture: ComponentFixture<TablesWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget1Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget1Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
