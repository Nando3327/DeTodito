import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

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
  model: any;;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private translate: TranslateService,
              private router: Router) {
    this.loginStatus = new EventEmitter();
  }

  ngOnInit() {
    this.loadLabels();
    this.initForm();
  }

  loadLabels(): void {
    this.translate.get(['login', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['login'];
    });
  }

  initForm(): void {
    this.fields = [{
      fieldGroupClassName: 'row',
      key: 'formValuesAmountTransaction',
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
  }

  moveNextEventPage() {
    this.router.navigate(['/home']);
    this.loginStatus.emit(true);
  }
}
