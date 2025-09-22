import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FeedsWidget2Component } from "./feeds-widget2.component";

describe("FeedsWidget2Component", () => {
  let component: FeedsWidget2Component;
  let fixture: ComponentFixture<FeedsWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedsWidget2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
