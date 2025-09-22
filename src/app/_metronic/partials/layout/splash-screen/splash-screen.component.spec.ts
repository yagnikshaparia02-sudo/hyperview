import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SplashScreenComponent } from "./splash-screen.component";
import { SplashScreenService } from "./splash-screen.service";
import { ElementRef } from "@angular/core";

describe("SplashScreenComponent", () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;
  let splashScreenService: SplashScreenService;

  beforeEach(async () => {
    const splashScreenServiceMock = {
      init: jasmine.createSpy("init"),
    };

    await TestBed.configureTestingModule({
      declarations: [SplashScreenComponent],
      providers: [
        { provide: SplashScreenService, useValue: splashScreenServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;
    splashScreenService = TestBed.inject(SplashScreenService);

    // Trigger the ngOnInit lifecycle hook
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize the splash screen service with the splash screen element", () => {
    const splashScreenElement = new ElementRef(document.createElement("div"));
    component.splashScreen = splashScreenElement;
    component.ngOnInit();

    expect(splashScreenService.init).toHaveBeenCalledWith(splashScreenElement);
  });
});
