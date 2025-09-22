import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Card4Component } from "./card4.component";

describe("Card4Component", () => {
  let component: Card4Component;
  let fixture: ComponentFixture<Card4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card4Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Card4Component);
    component = fixture.componentInstance;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input values", () => {
    expect(component.icon).toBe("");
    expect(component.title).toBe("");
    expect(component.description).toBe("");
  });

  it("should correctly assign input values", () => {
    const icon = "icon-example";
    const title = "Card Title";
    const description = "This is a description for the card.";

    component.icon = icon;
    component.title = title;
    component.description = description;

    fixture.detectChanges();

    expect(component.icon).toBe(icon);
    expect(component.title).toBe(title);
    expect(component.description).toBe(description);
  });
});
