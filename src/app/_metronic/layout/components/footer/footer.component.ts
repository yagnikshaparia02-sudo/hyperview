import { Component, OnInit } from '@angular/core';
import { CONFIGCONSTANTS } from 'src/app/config/app-constants';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerContainerCssClasses: string = '';
  currentDateStr: string = new Date().getFullYear().toString();
  siteName = CONFIGCONSTANTS.siteName;
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.footerContainerCssClasses = this.layout.getStringCSSClasses('footerContainer');
  }
}
