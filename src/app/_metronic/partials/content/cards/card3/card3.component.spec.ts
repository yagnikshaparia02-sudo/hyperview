import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Card3Component } from "./card3.component";

describe("Card3Component", () => {
  let component: Card3Component;
  let fixture: ComponentFixture<Card3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Card3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Card3Component);
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

  it("should correctly assign input values", () => {
    const color = "blue";
    const avatar = "avatar.png";
    const online = true;
    const name = "John Doe";
    const job = "Software Engineer";
    const avgEarnings = "$5000";
    const totalEarnings = "$60000";

    component.color = color;
    component.avatar = avatar;
    component.online = online;
    component.name = name;
    component.job = job;
    component.avgEarnings = avgEarnings;
    component.totalEarnings = totalEarnings;

    fixture.detectChanges();

    expect(component.color).toBe(color);
    expect(component.avatar).toBe(avatar);
    expect(component.online).toBe(online);
    expect(component.name).toBe(name);
    expect(component.job).toBe(job);
    expect(component.avgEarnings).toBe(avgEarnings);
    expect(component.totalEarnings).toBe(totalEarnings);
  });
});
