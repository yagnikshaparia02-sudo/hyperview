import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { TablesWidget4Component } from "./tables-widget4.component";

describe("TablesWidget4Component", () => {
  let component: TablesWidget4Component;
  let fixture: ComponentFixture<TablesWidget4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget4Component],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget4Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set active tab correctly", () => {
    component.setTab("kt_table_widget_4_tab_2");
    expect(component.activeTab).toBe("kt_table_widget_4_tab_2");
  });

  it("should return active class for active tab", () => {
    component.setTab("kt_table_widget_4_tab_3");
    expect(component.activeClass("kt_table_widget_4_tab_3")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_4_tab_1")).toBe("");
  });

  it("should return empty string for inactive tab", () => {
    expect(component.activeClass("kt_table_widget_4_tab_1")).toBe(
      "show active"
    );
    expect(component.activeClass("kt_table_widget_4_tab_2")).toBe("");
  });
});
