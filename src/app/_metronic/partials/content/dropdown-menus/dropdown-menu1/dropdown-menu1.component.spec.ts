import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DropdownMenu1Component } from "./dropdown-menu1.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("DropdownMenu1Component", () => {
  let component: DropdownMenu1Component;
  let fixture: ComponentFixture<DropdownMenu1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownMenu1Component],
      schemas: [NO_ERRORS_SCHEMA], // Use this to ignore unrecognized elements
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenu1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have correct CSS class and attributes", () => {
    const compiled = fixture.nativeElement;

    expect(component.class).toBe(
      "menu menu-sub menu-sub-dropdown w-250px w-md-300px"
    );
    expect(component.dataKtMenu).toBe("true");

    // Check that the class and attribute are set correctly in the DOM
    expect(compiled.classList).toContain("menu");
    expect(compiled.classList).toContain("menu-sub");
    expect(compiled.classList).toContain("menu-sub-dropdown");
    expect(compiled.classList).toContain("w-250px");
    expect(compiled.classList).toContain("w-md-300px");
    expect(compiled.getAttribute("data-kt-menu")).toBe("true");
  });
});
