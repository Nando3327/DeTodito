import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

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
  title: string;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.fillerNav = [
      {
        url: '/home/categories',
        text: 'Categories'
      }
    ];
    this.title = '';
    this.extraOptions = [{
      url: '/',
      name: 'LogOut'
    }];
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
