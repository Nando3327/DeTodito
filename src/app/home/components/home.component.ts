import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBuildService } from '../../dialog/components';
import { TranslateService } from '@ngx-translate/core';
import { UserStoreService } from '../../../store/entity/user';

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
  changeprofileData: any;

  showChangeProfile = false;
  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              private dialog: DialogBuildService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private storeUser: UserStoreService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.loadLabels();
    this.route.queryParams.subscribe(data => {
      if (data.refresh) {
        this.loadData();
        this.loadComponent = false;
      }
    });
  }

  loadData(): void {
    this.title = '';
    this.fillerNav = this.storeUser.getUser().profileData.app;
    this.extraOptions = [{
      url: '/',
      name: this.labels.links.closeSesion,
      handler: this.logOut.bind(this)
    }];
    this.changeprofileData = {
      link: '/home/changeProfile',
      name: this.labels.links.changeProfile,
      handler: (event) => {
        this.title = event.name;
      }
    };
    if (this.storeUser.getUser().profiles.length > 1) {
      this.showChangeProfile = true;
    }
  }

  loadLabels(): void {
    this.translate.get(['home', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['home'];
      this.loadPage = true;
    });
    this.loadData();
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
    this.title = nav.name;
    snav.toggle();
  }
}
