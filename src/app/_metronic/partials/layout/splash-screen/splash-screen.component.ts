import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CONFIGCONSTANTS } from 'src/app/config/app-constants';
import { SplashScreenService } from './splash-screen.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  @ViewChild('splashScreen', { static: true }) splashScreen: ElementRef;
  siteLogo = CONFIGCONSTANTS.siteLogo;
  constructor(private splashScreenService: SplashScreenService) {}

  ngOnInit(): void {
    this.splashScreenService.init(this.splashScreen);
  }
}
