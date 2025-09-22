import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InlineSVGModule } from "ng-inline-svg-2";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";
import { TablesWidget3Component } from "./tables-widget3.component";

describe("TablesWidget3Component", () => {
  let component: TablesWidget3Component;
  let fixture: ComponentFixture<TablesWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [TablesWidget3Component],
      providers: [HttpClient, HttpHandler, HttpBackend],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesWidget3Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOnInit", () => {
    spyOn(component, "ngOnInit").and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
