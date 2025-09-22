import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../../../../shared/shared.module";
import { MixedWidget1Component } from "./mixed-widget1.component";

describe("MixedWidget1Component", () => {
  let component: MixedWidget1Component;
  let fixture: ComponentFixture<MixedWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MixedWidget1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedWidget1Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
