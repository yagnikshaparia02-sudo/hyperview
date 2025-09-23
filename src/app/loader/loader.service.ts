import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private http: HttpClient, public ngxLoader: NgxUiLoaderService) {}

  showLoader() {
    
    this.ngxLoader.start();
  }
  hideLoader() {
    this.ngxLoader.stop();
  }
}
