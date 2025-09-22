import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListsWidget3Component } from "./lists-widget3.component";

describe("ListsWidget3Component", () => {
  let component: ListsWidget3Component;
  let fixture: ComponentFixture<ListsWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsWidget3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsWidget3Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
