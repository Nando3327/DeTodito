import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { LoginService } from '../login.service';
import { DialogBuildService } from '../../dialog/components';
import { SpinnerModel } from '../../spinner/models';
import { SpinnerService } from '../../spinner/services/spinner.service';
import { LoginMode } from '../models/login.model';
import { FormsValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginStatus: EventEmitter<any>;
  labels: any;
  globalLabels: any;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  formRegister = new FormGroup({});
  modelRegister: any = {};
  fieldsRegister: FormlyFieldConfig[];
  loadPage = false;
  mode: string;

  constructor(private translate: TranslateService,
              private router: Router,
              private loginService: LoginService,
              private dialog: DialogBuildService,
              private spinner: SpinnerService,
              private validators: FormsValidatorService) {
    this.loginStatus = new EventEmitter();
  }

  ngOnInit() {
    this.loadLabels();
  }

  loadLabels(): void {
    this.translate.get(['login', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['login'];
      this.loadPage = true;
      this.mode = LoginMode.login;
      this.initForm();
    });
  }

  initForm(): void {
    this.fields = [{
      fieldGroupClassName: 'row',
      key: 'formLogin',
      validators: {},
      fieldGroup: [
        {
          key: 'user',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            label: this.labels.userName,
            placeholder: this.labels.userNamePh,
            required: true,
          }
        },
        {
          key: 'password',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            type: 'password',
            label: this.labels.password,
            placeholder: this.labels.passwordPh,
            required: true,
          }
        }
      ]
    }];
    this.fieldsRegister = [{
      fieldGroupClassName: 'row',
      key: 'formRegister',
      validators: {
        validation: [this.validators.validateConfirmPassword]
      },
      fieldGroup: [
        {
          key: 'user',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            label: this.labels.registerLabels.name,
            placeholder: this.labels.registerLabels.namePh,
            required: true,
          }
        },
        {
          key: 'lastName',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            label: this.labels.registerLabels.lastName,
            placeholder: this.labels.registerLabels.lastNamePh,
            required: true,
          }
        },
        {
          key: 'password',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            type: 'password',
            label: this.labels.registerLabels.password,
            placeholder: this.labels.registerLabels.passwordPh,
            required: true,
          }
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            type: 'password',
            label: this.labels.registerLabels.confirmPassword,
            placeholder: this.labels.registerLabels.confirmPasswordPh,
            required: true,
          }
        },
        {
          key: 'email',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            type: 'email',
            label: this.labels.registerLabels.email,
            placeholder: this.labels.registerLabels.emailPh,
            required: true,
          },
          validators: {
            validation: [this.validators.emailValidator]
          },
        }
      ]
    }];
  }

  moveNextEventPage() {
    if (!this.form.valid) {
      return;
    }
    this.spinner.show(new SpinnerModel(this.globalLabels.spinner.loading));
    this.loginService.login({
      name: this.model.formLogin.user,
      password: this.model.formLogin.password
    }).subscribe(res => {
      this.spinner.hide();
      if (res.code === 200) {
        this.router.navigate(['/home']);
        this.loginStatus.emit(true);
      } else {
        this.dialog.buildDialog({
          message: this.labels.messages.wrongUserPassword,
        });
      }
    }, error => {
      this.spinner.hide();
      this.dialog.buildDialog({
        message: this.globalLabels.errors.genericErrorMessage,
      });
      console.log(error);
    });
  }

  register() {
    if (!this.formRegister.valid) {
      return;
    }
    if (this.modelRegister.formRegister.password !== this.modelRegister.formRegister.passwordConfirm) {
      return;
    }
    this.spinner.show(new SpinnerModel(this.globalLabels.spinner.loading));
    this.loginService.register({
      name: this.modelRegister.formRegister.user,
      lastName: this.modelRegister.formRegister.user,
      password: this.modelRegister.formRegister.password,
      email: this.modelRegister.formRegister.email,
    }).subscribe(res => {
      this.spinner.hide();
      if (res.code === 200) {
        this.router.navigate(['/home']);
        this.loginStatus.emit(true);
      } else {
        this.showRegisterError(res.code);
      }
    }, error => {
      this.spinner.hide();
      this.dialog.buildDialog({
        message: this.globalLabels.errors.genericErrorMessage,
      });
      console.log(error);
    });
  }

  showRegisterError(code): void {
    switch (code) {
      case 9000:
        this.dialog.buildDialog({
          message: this.labels.messages.emailRegisterAlready,
        });
        break;
      default:
        this.dialog.buildDialog({
          message: this.labels.messages.errorOnRegister,
        });
    }
  }

  goTo(mode): void {
    switch (mode) {
      case LoginMode.login:
        break;
      case LoginMode.forgetPassword:
        break;
      case LoginMode.forgetUser:
        break;
      case LoginMode.register:
        break;
    }
    this.mode = mode;
  }
}
