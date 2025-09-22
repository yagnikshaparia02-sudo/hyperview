import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListsWidget2Component } from "./lists-widget2.component";

describe("ListsWidget2Component", () => {
  let component: ListsWidget2Component;
  let fixture: ComponentFixture<ListsWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsWidget2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
