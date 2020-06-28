import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { DialogBuildService } from '../../dialog/components';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  loadComponent = false;
  mobileQuery: MediaQueryList;
  fillerNav: Array<any>;
  extraOptions: Array<any>;
  labels: any;
  globalLabels: any;
  title: string;
  loadPage = false;
  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              private dialog: DialogBuildService,
              private router: Router,
              private translate: TranslateService,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener,);
  }

  ngOnInit(): void {
    this.loadLabels();
    this.fillerNav = [
      {
        transactionName: 'Categories',
        transactionData: [{
          url: '/home/categories',
          text: 'Categories'
        }]
      },
      {
        transactionName: 'PersonalManagement',
        transactionData: [{
          url: '/home/changeAlias',
          text: 'Change Alias'
        }, {
          url: '/home/resetPassword',
          text: 'Change Password'
        }]
      }
    ];
    this.title = '';
    this.extraOptions = [{
      url: '/',
      name: 'LogOut',
      handler: this.logOut.bind(this)
    }];
  }

  loadLabels(): void {
    this.translate.get(['home', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['home'];
      this.loadPage = true;
    });
  }

  logOut() {
    this.dialog.buildDialog({
      type: 'confirm',
      message: this.labels.logOut,
      options: {
        buttons: [
          {
            label: this.globalLabels.buttons.confirm,
            handler: () => {
              this.router.navigate(['/']);
            }
          }
        ]
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  chargeComponent(snav, nav): void {
    this.loadComponent = true;
    this.title = nav.text;
    snav.toggle();
  }
}
