import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../../shared/shared.module";
import { MixedWidget4Component } from "./mixed-widget4.component";

describe("MixedWidget4Component", () => {
  let component: MixedWidget4Component;
  let fixture: ComponentFixture<MixedWidget4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget4Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget4Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should accept input properties", () => {
    component.color = "blue";
    component.image = "image.png";
    component.title = "Test Title";
    component.date = "2024-10-30";
    component.progress = "75%";

    expect(component.color).toBe("blue");
    expect(component.image).toBe("image.png");
    expect(component.title).toBe("Test Title");
    expect(component.date).toBe("2024-10-30");
    expect(component.progress).toBe("75%");
  });
});
