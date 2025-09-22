import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChatInnerComponent } from "./chat-inner.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import {
  defaultMessages,
  messageFromClient,
  UserInfoModel,
} from "./dataExample";

describe("ChatInnerComponent", () => {
  let component: ChatInnerComponent;
  let fixture: ComponentFixture<ChatInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatInnerComponent],
      schemas: [NO_ERRORS_SCHEMA], // Use this to ignore unrecognized elements
    }).compileComponents();

    fixture = TestBed.createComponent(ChatInnerComponent);
    component = fixture.componentInstance;
    component.isDrawer = false; // Set default input value
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with default messages", () => {
    expect(component.messagesObs).toBeDefined();
    component.messagesObs.subscribe((messages) => {
      expect(messages).toEqual(defaultMessages);
    });
  });

  it("should clear the input after submitting a message", () => {
    const textArea = fixture.debugElement.query(By.css("textarea"));
    textArea.nativeElement.value = "Test Message";

    component.submitMessage();

    expect(textArea.nativeElement.value).toBe("");
  });

  it("should return correct user info", () => {
    const userInfo: UserInfoModel = component.getUser(1);
    expect(userInfo).toBeDefined(); // Assuming user info exists for ID 1
  });
});
