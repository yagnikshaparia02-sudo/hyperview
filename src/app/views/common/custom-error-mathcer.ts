import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm | null): boolean {
    if (form && form.submitted) {
      return control?.invalid && form.submitted;
    }
    return false;
  }
}
