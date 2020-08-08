import { Component, OnInit } from '@angular/core';
import { DataTableOptionsModel } from '../../data-table/components';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ProfilesService } from '../profiles.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogBuildService } from '../../dialog/components';

@Component({
  selector: 'app-categories',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  data: Array<any> = [];
  showTable = false;
  tableOptions: DataTableOptionsModel;
  labels: any;
  globalLabels: any;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private profilesService: ProfilesService,
              private translate: TranslateService,
              private dialog: DialogBuildService) {
  }

  initGrid() {
    this.tableOptions = {
      title: 'TITULO',
      columns: [
        {field: 'name', name: 'name'},
        {field: 'type', name: 'type'},
        {field: 'defaultProfile', name: 'defaultProfile'},
        {field: 'active', name: 'active'},
        {
          field: 'actions',
          name: 'Acciones',
          type: 'actions',
          options: {
            buttons: [
              {
                tooltip: 'edit',
                icon: 'edit',
                handler: this.searchDetails.bind(this)
              },
              {
                tooltip: 'delete',
                icon: 'delete',
                handler: this.searchDetails.bind(this)
              }
            ]
          }
        }
      ],
      buttons: [
        {
          name: 'new',
          handler: () => {
            this.deleteTransferAction();
          }
        },
        {
          name: 'delete',
          handler: () => {
            this.deleteTransferAction();
          }
        }
      ]
    };
  }

  searchDetails(item): void {
    console.log(item);
  }

  deleteTransferAction(): void {
    this.showTable = false;
    setTimeout(_ => {
      this.showTable = true;
    }, 100);
  }

  loadLabels(): void {
    this.translate.get(['changeProfile', 'global']).subscribe(labels => {
      this.globalLabels = labels.global;
      this.labels = labels['changeProfile'];
      this.initForm();
      this.initGrid();
    });
  }

  initForm(): void {
    this.fields = [{
      fieldGroupClassName: 'row',
      key: 'formValuesProfileFinder',
      fieldGroup: [
        {
          key: 'profile',
          type: 'select',
          className: 'col-md-6',
          templateOptions: {
            label: 'text',
            placeholder: 'Enter email',
            options: [{
              value: 'S',
              label: 'Seguridad'
            }],
            required: true,
          }
        },
        {
          key: 'profileName',
          type: 'input',
          className: 'col-md-6',
          templateOptions: {
            label: 'Perfil',
            placeholder: 'Ingrese el nombre de un perfil'
          }
        }
      ]
    }];
  }

  onSubmit() {
    const params = {
      profile: this.model.formValuesProfileFinder.profile,
      name: this.model.formValuesProfileFinder.profileName
    };
    this.profilesService.getProfiles(params).subscribe(res => {
      this.data = res;
      this.showTable = true;
    }, _ => {
      this.dialog.buildDialog({
        message: this.globalLabels.errors.genericErrorMessage,
      });
    });
  }

  ngOnInit(): void {
    this.loadLabels();
  }

}
