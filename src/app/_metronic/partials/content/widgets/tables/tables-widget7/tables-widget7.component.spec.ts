import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { TablesWidget7Component } from "./tables-widget7.component";

describe("TablesWidget7Component", () => {
  let component: TablesWidget7Component;
  let fixture: ComponentFixture<TablesWidget7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget7Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget7Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set active tab correctly", () => {
    component.setTab("kt_table_widget_7_tab_2");
    expect(component.activeTab).toBe("kt_table_widget_7_tab_2");
  });

  it("should return active class for active tab", () => {
    component.setTab("kt_table_widget_7_tab_3");
    expect(component.activeClass("kt_table_widget_7_tab_3")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_7_tab_1")).toBe("");
  });

  it("should return empty string for inactive tab", () => {
    expect(component.activeClass("kt_table_widget_7_tab_1")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_7_tab_2")).toBe("");
  });
});
