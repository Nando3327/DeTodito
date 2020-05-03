import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'untitled';
  showLogin = false;

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.use('es').subscribe(_ => {
      this.showLogin = true;
    });
  }

  loginStatusAction(event): void {
    this.showLogin = false;
  }
}
