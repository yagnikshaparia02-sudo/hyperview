import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { CONFIG } from "../../../config/app-config";

interface DialogData {
  apiEndPoint: string;
  id: String[];
}

@Component({
  selector: "app-delete-popupbox",
  templateUrl: "./delete-popupbox.component.html",
  styleUrls: ["./delete-popupbox.component.scss"],
})
export class DeletePopupboxComponent implements OnInit {
  public message: String = "Are you sure you want to delete selected record?";
  isLoading = false;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeletePopupboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  public deleteData() {
    if (this.data.apiEndPoint && this.data.id) {
      debugger;
      this.isLoading = true;
      this.http
        .post<any>(CONFIG.commonAPIDataURL + this.data.apiEndPoint, {
          ids: this.data.id,
        })
        .pipe(first())
        .subscribe(
          (data) => {
            debugger;
            console.log("data", data);
            if (data.success === true) {
              this.dialogRef.close(true);
              this.isLoading = false;
              this.toastr.success(data.message);
            }
          },
          (error) => {
            this.isLoading = false;
            this.toastr.error(error.message);
            this.dialogRef.close(false);
          }
        );
    }
  }

  decline() {
    this.dialogRef.close();
  }
}
