import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FeedsWidget4Component } from "./feeds-widget4.component";

describe("FeedsWidget4Component", () => {
  let component: FeedsWidget4Component;
  let fixture: ComponentFixture<FeedsWidget4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedsWidget4Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsWidget4Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
