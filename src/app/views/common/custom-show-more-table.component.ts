import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../_components/base.component';
import { AppShowMoreComponent } from './show-more-data.component';

@Component({
  selector: 'app-custom-show-more-table',
  template: `
    <div>
      <div *ngIf="dataString">
        {{ checkStringLength(dataString) ? truncateString(dataString) : dataString || '-' }}
      </div>
      <div *ngIf="checkStringLength(dataString)">
        <a class="text text-info" (click)="openDialog()">{{ 'SHOW_ALL' | translate }}</a>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class CustomShowMoreTable extends BaseComponent implements OnInit {
  @Input() dataString: string = '';
  totalShowMore = 50;
  constructor(public dialog: MatDialog) {
    super();
  }

  checkStringLength(data: string) {
    if (data) {
      if (data.length >= 50) {
        return true;
      } else {
        return false;
      }
    }
  }

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(AppShowMoreComponent, {
      data: { ListData: this.dataString },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
