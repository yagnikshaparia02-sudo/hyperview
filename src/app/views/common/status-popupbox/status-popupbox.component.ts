import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CONFIG } from '../../../config/app-config';

interface DialogStatusData {
  apiEndPoint: string;
  id: String[];
}

@Component({
  selector: 'app-status-popupbox',
  templateUrl: './status-popupbox.component.html',
  styleUrls: ['./status-popupbox.component.scss'],
})
export class StatusPopupboxComponent implements OnInit {
  isLoadingStatus = false;
  public message: String = `Are you sure you want to change status of selected record?`;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    public dialogRefStatus: MatDialogRef<StatusPopupboxComponent>,
    @Inject(MAT_DIALOG_DATA) public dataStatus: DialogStatusData
  ) {}

  ngOnInit() {}

  public statusData() {
    if (this.dataStatus.apiEndPoint && this.dataStatus.id) {
      this.isLoadingStatus = true;
      this.http
        .post<any>(CONFIG.commonAPIDataURL + this.dataStatus.apiEndPoint, { ids: this.dataStatus.id })
        .pipe(first())
        .subscribe(
          (data) => {
            if (data.success === true) {
              this.dialogRefStatus.close(true);
              this.isLoadingStatus = false;
              this.toastr.success(data.message);
            }
          },
          (error) => {
            this.isLoadingStatus = false;
            this.toastr.error(error.message);
            this.dialogRefStatus.close(false);
          }
        );
    }
  }

  decline() {
    this.dialogRefStatus.close();
  }
}
