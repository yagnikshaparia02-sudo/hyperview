import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { LoaderComponent } from "./loader.component";

describe("LoaderComponent", () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxUiLoaderModule],
      declarations: [LoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
