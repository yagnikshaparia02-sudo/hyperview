import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FeedsWidget3Component } from "./feeds-widget3.component";

describe("FeedsWidget3Component", () => {
  let component: FeedsWidget3Component;
  let fixture: ComponentFixture<FeedsWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedsWidget3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsWidget3Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
