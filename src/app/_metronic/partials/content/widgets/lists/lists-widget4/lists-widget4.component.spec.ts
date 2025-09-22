import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListsWidget4Component } from "./lists-widget4.component";

describe("ListsWidget4Component", () => {
  let component: ListsWidget4Component;
  let fixture: ComponentFixture<ListsWidget4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsWidget4Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsWidget4Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default items value as 6", () => {
    expect(component.items).toBe(6);
  });
});
