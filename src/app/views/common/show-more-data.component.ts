import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  ListData: any[];
}

@Component({
  selector: 'app-show-more',
  template: `
    <div class="show-more-dialog">
      <div class="pull-right" mat-dialog-title>
        <i class="fa fa-times" (click)="closeDialog()" aria-hidden="true"></i>
      </div>
      <mat-dialog-content>
        <ng-container *ngIf="data.ListData && data.ListData.length >= 0">
          <span *ngFor="let data of data.ListData">
            <span class="badge bdge-label badge-light m-1">
              {{ data.name }}
            </span>
          </span>
        </ng-container>
        <ng-container *ngIf="data.ListData && getDatatype(data.ListData) === 'string'">
          <span>{{ data.ListData }}</span>
        </ng-container>
      </mat-dialog-content>
    </div>
  `,
  styleUrls: [],
})
export class AppShowMoreComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AppShowMoreComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit() {
    this.dialogRef.updateSize('50%');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getDatatype = (data) => {
    return typeof data;
  };
}
