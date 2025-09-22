import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { TablesWidget14Component } from "./tables-widget14.component";

describe("TablesWidget14Component", () => {
  let component: TablesWidget14Component;
  let fixture: ComponentFixture<TablesWidget14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget14Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesWidget14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
