import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FeedsWidget5Component } from "./feeds-widget5.component";

describe("FeedsWidget5Component", () => {
  let component: FeedsWidget5Component;
  let fixture: ComponentFixture<FeedsWidget5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedsWidget5Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsWidget5Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
