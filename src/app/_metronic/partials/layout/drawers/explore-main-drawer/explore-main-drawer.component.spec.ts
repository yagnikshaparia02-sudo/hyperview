import { TestBed } from "@angular/core/testing";
import { ExploreMainDrawerComponent } from "./explore-main-drawer.component";
import { InlineSVGModule } from "ng-inline-svg-2";
import { HttpBackend, HttpClient, HttpHandler } from "@angular/common/http";

describe("ExploreMainDrawerComponent", () => {
  let component: ExploreMainDrawerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InlineSVGModule, ExploreMainDrawerComponent],
      providers: [HttpClient, HttpHandler, HttpBackend],
    });
    const fixture = TestBed.createComponent(ExploreMainDrawerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
