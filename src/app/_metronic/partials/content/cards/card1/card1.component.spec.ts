import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Card1Component } from "./card1.component";

describe("Card1Component", () => {
  let component: Card1Component;
  let fixture: ComponentFixture<Card1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Card1Component);
    component = fixture.componentInstance;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input values", () => {
    expect(component.color).toBe("");
    expect(component.avatar).toBe("");
    expect(component.online).toBe(false);
    expect(component.name).toBe("");
    expect(component.job).toBe("");
    expect(component.avgEarnings).toBe("");
    expect(component.totalEarnings).toBe("");
  });

  it("should bind the class property to the host element", () => {
    component.class = "custom-class";
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    expect(hostElement.className).toContain("custom-class");
  });

  it("should correctly assign input values", () => {
    component.color = "red";
    component.avatar = "path/to/avatar.png";
    component.online = true;
    component.name = "John Doe";
    component.job = "Developer";
    component.avgEarnings = "5000";
    component.totalEarnings = "20000";

    fixture.detectChanges();

    expect(component.color).toBe("red");
    expect(component.avatar).toBe("path/to/avatar.png");
    expect(component.online).toBe(true);
    expect(component.name).toBe("John Doe");
    expect(component.job).toBe("Developer");
    expect(component.avgEarnings).toBe("5000");
    expect(component.totalEarnings).toBe("20000");
  });
});
