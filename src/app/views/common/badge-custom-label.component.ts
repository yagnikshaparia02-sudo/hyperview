import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CONFIGCONSTANTS } from 'src/app/config/app-constants';
import { AppShowMoreComponent } from './show-more-data.component';

@Component({
  selector: 'app-badge-custom-label',
  template: `
    <div>
      <div *ngFor="let row of ListData; let indexOf = index">
        <div *ngIf="indexOf < totalShowMore">
          <div class="badge bdge-label badge-light m-1">
            {{ row.name }}
          </div>
        </div>
      </div>
      <div *ngIf="ListData.length > totalShowMore">
        <a class="text text-info" (click)="openDialog()">{{ 'SHOW_ALL' | translate }}</a>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class BadgeCustomLabelComponent implements OnInit {
  @Input() ListData: any[] = [];
  totalShowMore = CONFIGCONSTANTS.totalShowMore;
  constructor(public dialog: MatDialog) {}
  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(AppShowMoreComponent, {
      data: { ListData: this.ListData },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
