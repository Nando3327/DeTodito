import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-login',
  templateUrl: './side-bar-login.component.html',
  styleUrls: ['./side-bar-login.component.scss']
})
export class SideBarLoginComponent implements OnInit {
  labels: any;
  globalLabels: any;
  loadPage = false;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.loadLabels();
  }

  loadLabels(): void {
    this.translate.get(['login', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['login'];
      this.loadPage = true;
    });
  }
}
