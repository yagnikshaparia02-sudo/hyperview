import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListsWidget7Component } from "./lists-widget7.component";

describe("ListsWidget7Component", () => {
  let component: ListsWidget7Component;
  let fixture: ComponentFixture<ListsWidget7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsWidget7Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsWidget7Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
