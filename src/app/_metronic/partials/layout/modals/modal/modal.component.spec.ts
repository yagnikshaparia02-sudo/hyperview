import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalComponent } from "./modal.component";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Component, TemplateRef } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `<ng-template #modal>Modal Content</ng-template>`,
})
class TestHostComponent {
  public modalConfig = {
    shouldClose: () => true,
    onClose: () => true,
    shouldDismiss: () => true,
    onDismiss: () => true,
  };
}

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
