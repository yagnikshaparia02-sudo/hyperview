import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TilesWidget11Component } from "./tiles-widget11.component";

describe("TilesWidget11Component", () => {
  let component: TilesWidget11Component;
  let fixture: ComponentFixture<TilesWidget11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TilesWidget11Component],
    }).compileComponents();

    fixture = TestBed.createComponent(TilesWidget11Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default properties", () => {
    expect(component.cssClass).toBe("");
    expect(component.widgetHeight).toBe("150px");
    expect(component.baseColor).toBe("success");
    expect(component.textInverseCSSClass).toBe("");
  });

  it("should compute CSS classes on init", () => {
    component.ngOnInit();
    expect(component.cssClass).toBe("bg-success ");
    expect(component.textInverseCSSClass).toBe("text-inverse-success");
  });
});
