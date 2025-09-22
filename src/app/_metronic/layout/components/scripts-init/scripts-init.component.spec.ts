import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ScriptsInitComponent } from "./scripts-init.component";

describe("ScriptsInitComponent", () => {
  let component: ScriptsInitComponent;
  let fixture: ComponentFixture<ScriptsInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScriptsInitComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptsInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
