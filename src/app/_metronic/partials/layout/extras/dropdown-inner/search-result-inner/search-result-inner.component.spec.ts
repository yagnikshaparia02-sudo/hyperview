import { TestBed } from "@angular/core/testing";
import { SearchResultInnerComponent } from "./search-result-inner.component";

describe("SearchResultInnerComponent", () => {
  let component: SearchResultInnerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultInnerComponent],
    });
    const fixture = TestBed.createComponent(SearchResultInnerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
