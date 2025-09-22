import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../../shared/shared.module";
import { MixedWidget5Component } from "./mixed-widget5.component";

describe("MixedWidget5Component", () => {
  let component: MixedWidget5Component;
  let fixture: ComponentFixture<MixedWidget5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget5Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget5Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should accept input properties", () => {
    component.color = "red";
    component.image = "image.jpg";
    component.title = "Sample Title";
    component.time = "2 hours ago";
    component.description = "This is a description.";

    expect(component.color).toBe("red");
    expect(component.image).toBe("image.jpg");
    expect(component.title).toBe("Sample Title");
    expect(component.time).toBe("2 hours ago");
    expect(component.description).toBe("This is a description.");
  });
});
