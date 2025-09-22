import { TestBed } from "@angular/core/testing";
import { ExploreMainDrawerComponent } from "./explore-main-drawer.component";

describe("ExploreMainDrawerComponent", () => {
  let component: ExploreMainDrawerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreMainDrawerComponent],
    });
    const fixture = TestBed.createComponent(ExploreMainDrawerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
