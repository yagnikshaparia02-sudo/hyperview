import { StylePaginatorDirective } from "./style-paginator.directive";
import { ViewContainerRef, Renderer2, ChangeDetectorRef } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { TestBed } from "@angular/core/testing";

describe("StylePaginatorDirective", () => {
  let directive: StylePaginatorDirective;
  let mockPaginator: MatPaginator;
  let mockViewContainerRef: ViewContainerRef;
  let mockRenderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylePaginatorDirective],
      providers: [MatPaginator, ChangeDetectorRef, ViewContainerRef, Renderer2],
    });
  });

  beforeEach(() => {
    mockPaginator = TestBed.inject(MatPaginator);
    mockViewContainerRef = TestBed.inject(ViewContainerRef);
    mockRenderer = TestBed.inject(Renderer2);
    directive = new StylePaginatorDirective(
      mockPaginator,
      mockViewContainerRef,
      mockRenderer
    );
  });

  it("should create the directive", () => {
    expect(directive).toBeTruthy();
  });
});
