import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListsWidget5Component } from "./lists-widget5.component";

describe("ListsWidget5Component", () => {
  let component: ListsWidget5Component;
  let fixture: ComponentFixture<ListsWidget5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsWidget5Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsWidget5Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
