import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { first } from "rxjs/operators";
import { NgForm } from "@angular/forms";
import { BaseComponent } from "src/app/_components/base.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { POImportService } from "src/app/_services/po-import.service";

interface IDialogOpenOrderErrorPrint {
  numOrderId: string;
  data: string;
}

@Component({
  selector: "app-po-import-dialog",
  templateUrl: "./po-import-dialog.component.html",
  styleUrls: ["./po-import-dialog.component.scss"],
})
export class PoImportDialogComponent extends BaseComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  fileList: FileList;
  showError: boolean = false;
  submitted: boolean = false;
  token: string = "";
  userId: string = "";

  // Constructor
  constructor(
    public poImportService: POImportService,
    public dialogRef: MatDialogRef<PoImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogOpenOrderErrorPrint,
    protected _sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    super();
  }

  // Init
  async ngOnInit() {
    this.token = this.data["token"];
    this.userId = this.data["userId"];
    console.log(this.token, this.userId);
  }

  // File change event
  fileChange(event) {
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      let file: File = this.fileList[0];
      this.showError = false;
    }
  }

  // Submit form
  async onSubmitForm(form: NgForm) {
    if (this.fileList && this.fileList.length > 0) {
      this.loader.showLoader();

      // form data
      let file: File = this.fileList[0];
      let formData: FormData = new FormData();
      formData.append("File", file, file.name);

      // headers
      let headers = new Headers();
      headers.append("Content-Type", "multipart/form-data");

      this.poImportService
        .createBulkPurchaseOrders(this.token, this.userId, formData)
        .pipe(first())
        .subscribe(
          (result) => {
            this.loader.hideLoader();

            if (result.success) {
              this.submitted = false;
              this.toastr.success(result.message);
            } else {
              this.toastr.error(result.message, null, { timeOut: 10000 });
              this.errorHandler(
                this.toastr,
                this.translateService,
                result.errors,
                () => {
                  this.submitted = false;
                }
              );
            }
            this.fileList = null;
            this.showError = false;
            this.dialogRef.close(true);
          },
          (error) => {
            this.loader.hideLoader();
            this.toastr.error(error.message, null, { timeOut: 10000 });
          }
        );
    } else {
      this.showError = true;
    }
  }

  // Close popup
  async closePopup() {
    this.fileList = null;
    this.showError = false;
    this.dialogRef.close(false);
  }
}
