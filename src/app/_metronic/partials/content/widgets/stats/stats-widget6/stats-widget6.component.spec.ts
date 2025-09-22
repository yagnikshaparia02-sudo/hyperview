import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatsWidget6Component } from "./stats-widget6.component";

describe("StatsWidget6Component", () => {
  let component: StatsWidget6Component;
  let fixture: ComponentFixture<StatsWidget6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsWidget6Component],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsWidget6Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input properties", () => {
    expect(component.progress).toBe("");
    expect(component.color).toBe("");
    expect(component.description).toBe("");
    expect(component.title).toBe("");
  });

  it("should set input properties correctly", () => {
    component.progress = "75%";
    component.color = "red";
    component.description = "This widget shows the progress.";
    component.title = "Progress Widget 6";

    fixture.detectChanges(); // Trigger change detection

    expect(component.progress).toBe("75%");
    expect(component.color).toBe("red");
    expect(component.description).toBe("This widget shows the progress.");
    expect(component.title).toBe("Progress Widget 6");
  });
});
