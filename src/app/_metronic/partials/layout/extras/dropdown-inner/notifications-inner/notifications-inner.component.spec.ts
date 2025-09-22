import { TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../../shared/shared.module";
import { NotificationsInnerComponent } from "./notifications-inner.component";

describe("NotificationsInnerComponent", () => {
  let component: NotificationsInnerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [NotificationsInnerComponent],
    });
    const fixture = TestBed.createComponent(NotificationsInnerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
