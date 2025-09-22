import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FeedsWidget6Component } from "./feeds-widget6.component";

describe("FeedsWidget6Component", () => {
  let component: FeedsWidget6Component;
  let fixture: ComponentFixture<FeedsWidget6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedsWidget6Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsWidget6Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
