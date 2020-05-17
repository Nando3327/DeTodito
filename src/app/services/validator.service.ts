import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class FormsValidatorService {
  public validateConfirmPassword(control: FormControl): ValidationErrors {
    const password = control.get('password').value;

    const confirmPassword = control.get('passwordConfirm').value;

    if (password !== confirmPassword) {
      control.get('passwordConfirm').setErrors({ConfirmPassword: true});
    } else {
      return null;
    }
  }

  public emailValidator(control: FormControl): ValidationErrors {
    return !control.value ||
    control.value.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )
      ? null
      : {email: true};
  }
}
