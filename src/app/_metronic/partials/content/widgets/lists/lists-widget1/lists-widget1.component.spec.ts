import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListsWidget1Component } from "./lists-widget1.component";

describe("ListsWidget1Component", () => {
  let component: ListsWidget1Component;
  let fixture: ComponentFixture<ListsWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsWidget1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
