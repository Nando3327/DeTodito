import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { LoginService } from '../login.service';

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
  loadPage = false;

  constructor(private translate: TranslateService,
              private router: Router,
              private loginService: LoginService) {
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
  }

  moveNextEventPage() {
    if (!this.form.valid) {
      return;
    }
    this.loginService.login({
      name: this.model.formLogin.user,
      password: this.model.formLogin.password
    }).subscribe(res => {
      if (res.code === 200) {
        this.router.navigate(['/home']);
        this.loginStatus.emit(true);
      } else {

      }
    }, error => {
      console.log(error);
    });
  }
}
