import { TestBed } from "@angular/core/testing";
import { ActivityDrawerComponent } from "./activity-drawer.component";

describe("ActivityDrawerComponent", () => {
  let component: ActivityDrawerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityDrawerComponent],
    });
    const fixture = TestBed.createComponent(ActivityDrawerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
