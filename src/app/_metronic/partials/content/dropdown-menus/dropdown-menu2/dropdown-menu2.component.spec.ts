import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DropdownMenu2Component } from "./dropdown-menu2.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("DropdownMenu2Component", () => {
  let component: DropdownMenu2Component;
  let fixture: ComponentFixture<DropdownMenu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownMenu2Component],
      schemas: [NO_ERRORS_SCHEMA], // Use this to ignore unrecognized elements
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have correct CSS class and attributes", () => {
    const compiled = fixture.nativeElement;

    expect(component.class).toBe(
      "menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px"
    );
    expect(component.dataKtMenu).toBe("true");

    // Check that the class and attribute are set correctly in the DOM
    expect(compiled.classList).toContain("menu");
    expect(compiled.classList).toContain("menu-sub");
    expect(compiled.classList).toContain("menu-sub-dropdown");
    expect(compiled.classList).toContain("menu-column");
    expect(compiled.classList).toContain("menu-rounded");
    expect(compiled.classList).toContain("menu-gray-600");
    expect(compiled.classList).toContain("menu-state-bg-light-primary");
    expect(compiled.classList).toContain("fw-bold");
    expect(compiled.classList).toContain("w-200px");
    expect(compiled.getAttribute("data-kt-menu")).toBe("true");
  });
});
