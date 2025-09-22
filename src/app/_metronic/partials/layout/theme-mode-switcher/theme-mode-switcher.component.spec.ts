import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ThemeModeSwitcherComponent } from "./theme-mode-switcher.component";
import { ThemeModeService, ThemeModeType } from "./theme-mode.service";
import { BehaviorSubject } from "rxjs";

describe("ThemeModeSwitcherComponent", () => {
  let component: ThemeModeSwitcherComponent;
  let fixture: ComponentFixture<ThemeModeSwitcherComponent>;
  let modeService: jasmine.SpyObj<ThemeModeService>;

  beforeEach(async () => {
    // Create a mock ThemeModeService
    const modeServiceMock = jasmine.createSpyObj("ThemeModeService", [
      "switchMode",
    ]);

    // Create BehaviorSubjects to mock the observables
    const modeSubject = new BehaviorSubject<ThemeModeType>("light");
    const menuModeSubject = new BehaviorSubject<ThemeModeType>("light");

    // Assign the mocked observables to the service
    modeServiceMock.mode = modeSubject; // Mode subject
    modeServiceMock.menuMode = menuModeSubject; // Menu mode subject

    await TestBed.configureTestingModule({
      declarations: [ThemeModeSwitcherComponent],
      providers: [{ provide: ThemeModeService, useValue: modeServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeModeSwitcherComponent);
    component = fixture.componentInstance;
    modeService = TestBed.inject(
      ThemeModeService
    ) as jasmine.SpyObj<ThemeModeService>;

    // Trigger ngOnInit
    component.ngOnInit();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize mode$ and menuMode$ observables", () => {
    component.mode$.subscribe((mode) => {
      expect(mode).toBe("light"); // Verify default mode
    });

    component.menuMode$.subscribe((menuMode) => {
      expect(menuMode).toBe("light"); // Verify default menu mode
    });
  });

  it("should call switchMode on the service when switchMode is invoked", () => {
    const newMode: ThemeModeType = "dark"; // Example theme mode
    component.switchMode(newMode);
    expect(modeService.switchMode).toHaveBeenCalledWith(newMode); // Verify switchMode is called
  });
});
