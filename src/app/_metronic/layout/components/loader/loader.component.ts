import { Component, OnInit } from '@angular/core';
import { CONFIGCONSTANTS } from './../../../../config/app-constants';

@Component({
  selector: 'app-loader',
  template: `<ngx-ui-loader
    [fgsColor]="config.fgsColor"
    [pbColor]="config.pbColor"
    [bgsColor]="config.bgsColor"
    [bgsOpacity]="config.bgsOpacity"
    [bgsPosition]="config.bgsPosition"
    [bgsSize]="config.bgsSize"
    [bgsType]="config.bgsType"
    [fgsType]="config.fgsType"
    [logoSize]="config.logoSize"
    [logoUrl]="config.logoUrl"
    [text]="config.text"
    [textColor]="config.textColor"
    [gap]="config.gap"
    [fgsSize]="config.fgsSize"
    loaderId="{{ 'master' }}"
  ></ngx-ui-loader>`,
})
export class LoaderComponent implements OnInit {
  // theme color : #bb3f42;
  config: any = {
    bgsColor: '#74e5cd',
    bgsOpacity: 1,
    bgsPosition: 'bottom-right',
    bgsSize: 60,
    bgsType: 'cube-grid',
    blur: 5,
    delay: 0,
    fastFadeOut: true,
    fgsColor: '#74e5cd',
    fgsPosition: 'center-center',
    fgsSize: 60,
    fgsType: 'ball-spin-clockwise',
    gap: 10,
    logoPosition: 'center-center',
    logoSize: 40,
    logoUrl: CONFIGCONSTANTS.siteFavicon,
    masterLoaderId: 'master',
    overlayBorderRadius: '0',
    overlayColor: 'rgba(40, 40, 40, 0.8)',
    pbColor: '#74e5cd',
    pbDirection: 'ltr',
    pbThickness: 3,
    hasProgressBar: true,
    text: 'Loading...',
    textColor: '#FFFFFF',
    textPosition: 'center-center',
    maxTime: -1,
    minTime: 300,
    loaderId: `master-loader-${Math.random().toString()}`,
  };
  constructor() {}
  ngOnInit() {}
}
