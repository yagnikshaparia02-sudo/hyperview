import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { LayoutScrollTopComponent } from "./scroll-top.component";
import {
  StickyComponent,
  ScrollTopComponent,
  MenuComponent,
  ToggleComponent,
  DrawerComponent,
} from "../../../../kt/components";
import { of } from "rxjs";

describe("LayoutScrollTopComponent", () => {
  let component: LayoutScrollTopComponent;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj("Router", ["events"], { events: of([]) });

    TestBed.configureTestingModule({
      declarations: [LayoutScrollTopComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: StickyComponent, useValue: {} },
        { provide: ScrollTopComponent, useValue: {} },
        { provide: MenuComponent, useValue: {} },
        { provide: ToggleComponent, useValue: {} },
        { provide: DrawerComponent, useValue: {} },
      ],
    });
    const fixture = TestBed.createComponent(LayoutScrollTopComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
