import { Component, Input, OnInit } from '@angular/core';
import { DialogBuildService } from '../../dialog/components';
import { TranslateService } from '@ngx-translate/core';
import { ResetPasswordModel } from '../../models/reset-password.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormsValidatorService } from '../../services/validator.service';
import { SpinnerModel } from '../../spinner/models';
import { SpinnerService } from '../../spinner/services/spinner.service';
import { ChangeAliasService } from '../change-alias.service';
import { isNullOrEmpty } from '../../general-functions/general-functions';
import { UserStoreService } from '../../../store/entity/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-alias',
  templateUrl: './change-alias.component.html',
  styleUrls: ['./change-alias.component.scss']
})
export class ChangeAliasComponent implements OnInit {

  @Input() options: ResetPasswordModel;
  labels: any;
  globalLabels: any;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[];

  constructor(private dialog: DialogBuildService,
              private translate: TranslateService,
              private spinner: SpinnerService,
              private validators: FormsValidatorService,
              private changeAliasService: ChangeAliasService,
              private storeUser: UserStoreService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadLabels();
  }

  loadLabels(): void {
    this.translate.get(['changeAlias', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['changeAlias'];
      this.loadFields();
    });
  }

  loadFields(): void {
    this.fields = [{
      fieldGroupClassName: 'row',
      key: 'formChangeAlias',
      validators: {
        validation: [this.validators.validateAlias]
      },
      fieldGroup: [
        {
          key: 'alias',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            label: this.labels.fields.alias,
            disabled: true
          },
          hooks: {
            onInit: (field) => {
              setTimeout(_ => {
                field.formControl.setValue(this.storeUser.getUser().alias);
              }, 100);
            }
          }
        },
        {
          key: 'newAlias',
          type: 'input',
          className: 'col-sm-12',
          templateOptions: {
            label: this.labels.fields.newAlias,
            placeholder: this.labels.fields.newAliasPh,
            required: true,
          }
        }
      ]
    }];
  }

  resetAlias(): void {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(d => {
        this.form.controls[d].markAsTouched();
      });
      return;
    }
    this.spinner.show(new SpinnerModel(this.globalLabels.spinner.loading));
    this.changeAliasService.changeAlias({
      newAlias: this.model.formChangeAlias.newAlias
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
        case 8008:
        case 8004:
          this.dialog.buildDialog({
            message: this.labels.messages.cantChangeAlias,
          });
          break;
        default:
          this.dialog.buildDialog({
            message: this.globalLabels.errors.genericErrorMessage,
          });
      }
    } else {
      this.dialog.buildDialog({
        message: this.labels.messages.cantChangeAlias,
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
