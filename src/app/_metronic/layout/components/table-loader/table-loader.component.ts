import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-loader',
  template: `
    <div class="main-spinner">
      <mat-progress-spinner [color]="config.color" [mode]="config.mode" [diameter]="config.diameter"></mat-progress-spinner>
    </div>
  `,
})
export class TableLoaderComponent implements OnInit {
  // theme color : #bb3f42;
  config: any = {
    color: '#74e5cd',
    mode: 'indeterminate',
    diameter: 50,
  };
  constructor() {}
  ngOnInit() {}
}
