import { TestBed } from "@angular/core/testing";
import { CardDashboardExternalLinksComponent } from "./card-external-linkscomponent";

describe("CardDashboardExternalLinksComponent", () => {
  let component: CardDashboardExternalLinksComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDashboardExternalLinksComponent],
    });
    const fixture = TestBed.createComponent(
      CardDashboardExternalLinksComponent
    );
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
