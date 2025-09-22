import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { TablesWidget8Component } from "./tables-widget8.component";

describe("TablesWidget8Component", () => {
  let component: TablesWidget8Component;
  let fixture: ComponentFixture<TablesWidget8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget8Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget8Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set active tab correctly", () => {
    component.setTab("kt_table_widget_8_tab_2");
    expect(component.activeTab).toBe("kt_table_widget_8_tab_2");
  });

  it("should return active class for active tab", () => {
    component.setTab("kt_table_widget_8_tab_3");
    expect(component.activeClass("kt_table_widget_8_tab_3")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_8_tab_1")).toBe("");
  });

  it("should return empty string for inactive tab", () => {
    expect(component.activeClass("kt_table_widget_8_tab_1")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_8_tab_2")).toBe("");
  });
});
