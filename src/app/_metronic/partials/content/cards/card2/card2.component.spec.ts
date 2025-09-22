import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Card2Component } from "./card2.component";
import { IconUserModel } from "../icon-user.model";

describe("Card2Component", () => {
  let component: Card2Component;
  let fixture: ComponentFixture<Card2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Card2Component);
    component = fixture.componentInstance;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have default input values", () => {
    expect(component.icon).toBe("");
    expect(component.badgeColor).toBe("");
    expect(component.status).toBe("");
    expect(component.statusColor).toBe("");
    expect(component.title).toBe("");
    expect(component.description).toBe("");
    expect(component.date).toBe("");
    expect(component.budget).toBe("");
    expect(component.progress).toBe(50);
    expect(component.users).toEqual([]);
  });

  it("should correctly assign input values", () => {
    const icon = "user-icon";
    const badgeColor = "green";
    const status = "Active";
    const statusColor = "success";
    const title = "Project Title";
    const description = "Project Description";
    const date = "2024-10-30";
    const budget = "$10000";
    const progress = 75;
    const users: IconUserModel[] = [{ name: "User 1", avatar: "user1.png" }];

    component.icon = icon;
    component.badgeColor = badgeColor;
    component.status = status;
    component.statusColor = statusColor;
    component.title = title;
    component.description = description;
    component.date = date;
    component.budget = budget;
    component.progress = progress;
    component.users = users;

    fixture.detectChanges();

    expect(component.icon).toBe(icon);
    expect(component.badgeColor).toBe(badgeColor);
    expect(component.status).toBe(status);
    expect(component.statusColor).toBe(statusColor);
    expect(component.title).toBe(title);
    expect(component.description).toBe(description);
    expect(component.date).toBe(date);
    expect(component.budget).toBe(budget);
    expect(component.progress).toBe(progress);
    expect(component.users).toEqual(users);
  });
});
