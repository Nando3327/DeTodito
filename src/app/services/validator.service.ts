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
      control.get('passwordConfirm').setErrors(null);
    }
    return null;
  }

  public validatePasswords(control: FormControl): ValidationErrors {
    const password = control.get('password').value;

    const oldPassword = control.get('oldPassword').value;

    if (password === oldPassword) {
      control.get('password').setErrors({SamePassword: true});
    } else {
      control.get('password').setErrors(null);
    }
    return null;
  }

  public validateAlias(control: FormControl): ValidationErrors {
    const alias = control.get('alias').value;

    const newAlias = control.get('newAlias').value;

    if (alias === newAlias) {
      control.get('newAlias').setErrors({SameAlias: true});
    } else {
      control.get('newAlias').setErrors(null);
    }
    return null;
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
