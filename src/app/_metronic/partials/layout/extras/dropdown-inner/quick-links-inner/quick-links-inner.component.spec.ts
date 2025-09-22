import { TestBed } from "@angular/core/testing";
import { QuickLinksInnerComponent } from "./quick-links-inner.component";

describe("QuickLinksInnerComponent", () => {
  let component: QuickLinksInnerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickLinksInnerComponent],
    });
    const fixture = TestBed.createComponent(QuickLinksInnerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
