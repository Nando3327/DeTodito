import { Component, OnInit } from '@angular/core';
import { DataTableOptionsModel } from '../../data-table/components';
import { UserStoreService } from '../../../store/entity/user';
import { ChangeProfileService } from '../change-profile.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogBuildService } from '../../dialog/components';
import { SpinnerModel } from '../../spinner/models';
import { SpinnerService } from '../../spinner/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss']
})
export class ChangeProfileComponent implements OnInit {

  data: Array<any> = [];
  showTable = false;
  tableOptions: DataTableOptionsModel;
  labels: any;
  globalLabels: any;

  constructor(private storeUser: UserStoreService,
              private translate: TranslateService,
              private dialog: DialogBuildService,
              private spinner: SpinnerService,
              private router: Router,
              private changeProfileService: ChangeProfileService) {
  }

  initGrid() {
    this.tableOptions = {
      title: this.labels.table.title,
      columns: [
        {field: 'name', name: this.labels.table.columns.profileName},
        {
          field: 'actions',
          name: this.labels.table.columns.change,
          type: 'actions',
          options: {
            buttons: [
              {
                tooltip: this.labels.table.columns.change,
                icon: 'refresh',
                handler: this.searchDetails.bind(this)
              }
            ]
          }
        }
      ]
    };
    setTimeout(_ => {
      this.showTable = true;
    }, 100);
  }

  searchDetails(item): void {
    this.spinner.show(new SpinnerModel(this.globalLabels.spinner.loading));
    this.changeProfileService.changeProfile({
      profile: item.id
    }).subscribe(ret => {
      this.spinner.hide();
      if (ret) {
        this.router.navigate(['/home'], {
          replaceUrl: true,
          queryParams: {
            refresh: true
          }
        });
      } else {
        this.dialog.buildDialog({
          message: this.labels.errors.canNotChangeProfile,
        });
      }
    }, _ => {
      this.spinner.hide();
      this.dialog.buildDialog({
        message: this.globalLabels.errors.genericErrorMessage,
      });
    });
  }

  loadLabels(): void {
    this.translate.get(['changeProfile', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['changeProfile'];
      this.initGrid();
    });
  }

  ngOnInit(): void {
    this.loadLabels();
    this.data = this.storeUser.getUser().profiles.filter(p => {
      return p.id !== this.storeUser.getUser().selectedProfile;
    });
  }

}
