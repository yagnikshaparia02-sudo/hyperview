import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { TablesWidget6Component } from "./tables-widget6.component";

describe("TablesWidget6Component", () => {
  let component: TablesWidget6Component;
  let fixture: ComponentFixture<TablesWidget6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget6Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget6Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set active tab correctly", () => {
    component.setTab("kt_table_widget_6_tab_2");
    expect(component.activeTab).toBe("kt_table_widget_6_tab_2");
  });

  it("should return active class for active tab", () => {
    component.setTab("kt_table_widget_6_tab_3");
    expect(component.activeClass("kt_table_widget_6_tab_3")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_6_tab_1")).toBe("");
  });

  it("should return empty string for inactive tab", () => {
    expect(component.activeClass("kt_table_widget_6_tab_1")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_6_tab_2")).toBe("");
  });
});
