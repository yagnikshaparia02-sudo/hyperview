import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Card5Component } from "./card5.component";

describe("Card5Component", () => {
  let component: Card5Component;
  let fixture: ComponentFixture<Card5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card5Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Card5Component);
    component = fixture.componentInstance;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input values", () => {
    expect(component.image).toBe("");
    expect(component.title).toBe("");
    expect(component.description).toBe("");
    expect(component.status).toBe("up");
    expect(component.statusValue).toBeUndefined(); // statusValue is not initialized
    expect(component.statusDesc).toBe("");
    expect(component.progress).toBe(100);
    expect(component.progressType).toBe("");
  });

  it("should correctly assign input values", () => {
    const image = "https://example.com/image.png";
    const title = "Card Title";
    const description = "This is a description for the card.";
    const status = "down" as "down"; // Testing the alternative status
    const statusValue = 75;
    const statusDesc = "Status description";
    const progress = 80;
    const progressType = "success";

    component.image = image;
    component.title = title;
    component.description = description;
    component.status = status;
    component.statusValue = statusValue;
    component.statusDesc = statusDesc;
    component.progress = progress;
    component.progressType = progressType;

    fixture.detectChanges();

    expect(component.image).toBe(image);
    expect(component.title).toBe(title);
    expect(component.description).toBe(description);
    expect(component.status).toBe(status);
    expect(component.statusValue).toBe(statusValue);
    expect(component.statusDesc).toBe(statusDesc);
    expect(component.progress).toBe(progress);
    expect(component.progressType).toBe(progressType);
  });
});
