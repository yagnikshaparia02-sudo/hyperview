import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MainModalComponent } from "./main-modal.component";

describe("MainModalComponent", () => {
  let component: MainModalComponent;
  let fixture: ComponentFixture<MainModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
