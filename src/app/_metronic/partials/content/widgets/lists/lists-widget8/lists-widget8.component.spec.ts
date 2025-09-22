import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListsWidget8Component } from "./lists-widget8.component";

describe("ListsWidget8Component", () => {
  let component: ListsWidget8Component;
  let fixture: ComponentFixture<ListsWidget8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsWidget8Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsWidget8Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set cssClass input correctly", () => {
    component.cssClass = "test-class";
    expect(component.cssClass).toBe("test-class");
  });
});
