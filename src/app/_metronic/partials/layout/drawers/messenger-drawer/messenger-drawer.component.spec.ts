import { TestBed } from "@angular/core/testing";
import { MessengerDrawerComponent } from "./messenger-drawer.component";

describe("MessengerDrawerComponent", () => {
  let component: MessengerDrawerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengerDrawerComponent],
    });
    const fixture = TestBed.createComponent(MessengerDrawerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
