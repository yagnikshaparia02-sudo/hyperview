import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatsWidget2Component } from "./stats-widget2.component";

describe("StatsWidget2Component", () => {
  let component: StatsWidget2Component;
  let fixture: ComponentFixture<StatsWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsWidget2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsWidget2Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input properties", () => {
    expect(component.title).toBe("");
    expect(component.time).toBe("");
    expect(component.description).toBe("");
    expect(component.avatar).toBe("");
  });

  it("should set input properties correctly", () => {
    component.title = "Team Performance";
    component.time = "Last Quarter";
    component.description =
      "This widget displays the team's performance metrics.";
    component.avatar = "path/to/avatar.png";

    fixture.detectChanges(); // Trigger change detection

    expect(component.title).toBe("Team Performance");
    expect(component.time).toBe("Last Quarter");
    expect(component.description).toBe(
      "This widget displays the team's performance metrics."
    );
    expect(component.avatar).toBe("path/to/avatar.png");
  });
});
