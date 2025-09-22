import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListsWidget6Component } from "./lists-widget6.component";

describe("ListsWidget6Component", () => {
  let component: ListsWidget6Component;
  let fixture: ComponentFixture<ListsWidget6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsWidget6Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsWidget6Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
