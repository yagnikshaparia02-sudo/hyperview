import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private subject = new Subject<any>();

  languages: any[] = [];

  constructor() {}

  changeLanguage(lan: string) {
    // localStorage.setItem('lan', lan);
    this.subject.next(lan);
  }

  getLanguage(): Observable<any> {
    return this.subject.asObservable();
  }

  DefaultLanguage() {
    // const CurrentLanguage = localStorage.getItem('lan');
    const IsExist = false;
    // return IsExist ? 'en' : CurrentLanguage || 'en';
    return "en";
  }
}
