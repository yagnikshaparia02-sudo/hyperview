import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StatsWidget5Component } from "./stats-widget5.component";

describe("StatsWidget5Component", () => {
  let component: StatsWidget5Component;
  let fixture: ComponentFixture<StatsWidget5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsWidget5Component],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsWidget5Component);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input properties", () => {
    expect(component.svgIcon).toBe("");
    expect(component.iconColor).toBe("");
    expect(component.color).toBe("");
    expect(component.description).toBe("");
    expect(component.title).toBe("");
  });

  it("should set input properties correctly", () => {
    component.svgIcon = "icon.svg";
    component.iconColor = "blue";
    component.color = "green";
    component.description = "This widget shows the statistics.";
    component.title = "Statistics Widget 5";

    fixture.detectChanges(); // Trigger change detection

    expect(component.svgIcon).toBe("icon.svg");
    expect(component.iconColor).toBe("blue");
    expect(component.color).toBe("green");
    expect(component.description).toBe("This widget shows the statistics.");
    expect(component.title).toBe("Statistics Widget 5");
  });
});
