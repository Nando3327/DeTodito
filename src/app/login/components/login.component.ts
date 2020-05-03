import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginStatus: EventEmitter<any>;
  MenuComponent = false;
  sharedService: any;
  users = [];
  labels: any;
  globalLabels: any;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private translate: TranslateService,
              private router: Router) {
    this.loginStatus = new EventEmitter();
  }

  ngOnInit() {
    this.loadLabels();
  }

  loadLabels(): void {
    this.translate.get(['login', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['login'];
    });
  }

  moveNextEventPage() {
    // this.users = this.sharedService.getUserData();
    this.MenuComponent = !this.MenuComponent;
    this.router.navigate(['/home']);
    this.loginStatus.emit(this.MenuComponent);
  }
}
