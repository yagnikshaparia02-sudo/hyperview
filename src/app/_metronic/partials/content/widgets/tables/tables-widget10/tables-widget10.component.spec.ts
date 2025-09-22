import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { TablesWidget10Component } from "./tables-widget10.component";

describe("TablesWidget10Component", () => {
  let component: TablesWidget10Component;
  let fixture: ComponentFixture<TablesWidget10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget10Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget10Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
