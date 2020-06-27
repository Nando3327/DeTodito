import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogBuildService } from '../../dialog/components';
import { TranslateService } from '@ngx-translate/core';
import { ResetPasswordModel } from '../../models/reset-password.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormsValidatorService } from '../../services/validator.service';
import { SpinnerModel } from '../../spinner/models';
import { SpinnerService } from '../../spinner/services/spinner.service';
import { ResetPasswordService } from '../reset-password.service';
import { isNullOrEmpty } from '../../general-functions/general-functions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Input() options: ResetPasswordModel;
  @Output() goBackEmiter: EventEmitter<any>;
  labels: any;
  globalLabels: any;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[];

  constructor(private dialog: DialogBuildService,
              private translate: TranslateService,
              private spinner: SpinnerService,
              private validators: FormsValidatorService,
              private resetPasswordService: ResetPasswordService
  ) {
    this.goBackEmiter = new EventEmitter();
  }

  ngOnInit(): void {
    this.loadLabels();
  }

  loadLabels(): void {
    this.translate.get(['changePassword', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['changePassword'];
      this.loadFields();
    });
  }

  loadFields(): void {
    this.fields = [{
      fieldGroupClassName: 'row',
      key: 'formResetPassword',
      validators: {
        validation: [this.validators.validateConfirmPassword, this.validators.validatePasswords]
      },
      fieldGroup: [
        {
          key: 'oldPassword',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            type: 'password',
            label: this.labels.fields.oldPassword,
            placeholder: this.labels.fields.oldPasswordPh,
            required: true,
          }
        },
        {
          key: 'password',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            type: 'password',
            label: this.labels.fields.newPassword,
            placeholder: this.labels.fields.newPasswordPh,
            required: true,
          }
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            type: 'password',
            label: this.labels.fields.confirmPassword,
            placeholder: this.labels.fields.confirmPasswordPh,
            required: true,
          }
        }
      ]
    }];
  }

  resetPassword(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(d => {
        this.form.controls[d].markAsTouched();
      });
      return;
    }
    this.spinner.show(new SpinnerModel(this.globalLabels.spinner.loading));
    this.resetPasswordService.resetPassword({
      oldPassword: this.model.formResetPassword.oldPassword,
      password: this.model.formResetPassword.password
    }).subscribe(res => {
      this.spinner.hide();
      this.validateResponse(res);
    }, _ => {
      this.spinner.hide();
      this.dialog.buildDialog({
        message: this.globalLabels.errors.genericErrorMessage,
      });
    });
  }

  validateResponse(res): void {
    if (!isNullOrEmpty(res) && !isNullOrEmpty(res.code)) {
      switch (res.code) {
        case 200:
          this.dialog.buildDialog({
            message: this.labels.messages.resetComplete,
          });
          this.goBack();
          break;
        case 8006:
          this.dialog.buildDialog({
            message: this.labels.messages.wrongOldPassword,
          });
          break;
        default:
          this.dialog.buildDialog({
            message: this.labels.messages.cantChangePassword,
          });
      }
    } else {
      this.dialog.buildDialog({
        message: this.labels.messages.cantChangePassword,
      });
    }
  }

  goBack(): void {
    this.goBackEmiter.next(true);
  }
}
