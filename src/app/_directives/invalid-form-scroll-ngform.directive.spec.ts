import { InvalidFormScrollNGFormDirective } from "./invalid-form-scroll-ngform.directive";
import { ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

@Component({
  template:
    '<form #form="ngForm"><input name="field" ngModel required /></form>',
})
class TestComponent {}

describe("InvalidFormScrollNGFormDirective", () => {
  let directive: InvalidFormScrollNGFormDirective;
  let mockElementRef: ElementRef;
  let mockNgForm: NgForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvalidFormScrollNGFormDirective],
      providers: [ElementRef],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidFormScrollNGFormDirective, TestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    mockElementRef = fixture.debugElement.children[0].injector.get(ElementRef);
    mockNgForm = fixture.debugElement.children[0].injector.get(NgForm);
    directive = new InvalidFormScrollNGFormDirective(
      mockElementRef,
      mockNgForm
    );
  });

  // it('should create the directive', () => {
  //   expect(directive).toBeTruthy();
  // });
});
