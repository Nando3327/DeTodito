import { Component, OnInit } from '@angular/core';
import { DataTableOptionsModel } from '../../data-table/components';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss']
})
export class ChangeProfileComponent implements OnInit {

  data: Array<any> = [];
  showTable = false;
  tableOptions: DataTableOptionsModel;

  form = new FormGroup({});
  model: any;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor() {
  }

  initGrid() {
    this.tableOptions = {
      title: 'TITULO',
      columns: [
        {field: 'name', name: 'name'},
        {field: 'progress', name: 'progress'},
        {field: 'id', name: 'id'},
        {field: 'id23', name: 'campo nuevo'},
        {field: 'color', name: 'color'},
        {
          field: 'actions',
          name: 'Acciones',
          type: 'actions',
          options: {
            buttons: [
              {
                tooltip: 'detailes',
                icon: 'remove_red_eye',
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
      ],
      //selectField: true
    };
  }

  searchDetails(item): void {
    console.log(item);
  }

  deleteTransferAction(): void {
    this.data.push(createNewUser(this.data.length + 1));
    this.showTable = false;
    setTimeout(_ => {
      this.showTable = true;
    }, 100);
  }

  initForm(): void {
    this.fields = [{
      fieldGroupClassName: 'row',
      key: 'formValuesAmountTransaction',
      fieldGroup: [
        {
          key: 'email',
          type: 'input',
          className: 'col-md-6',
          templateOptions: {
            label: 'Email address',
            placeholder: 'Enter email',
            required: true,
          }
        },
        {
          key: 'text',
          type: 'input',
          className: 'col-md-6',
          templateOptions: {
            label: 'text',
            placeholder: 'Enter email',
            required: true,
          }
        },
        {
          key: 'text',
          type: 'input',
          className: 'col-md-6',
          templateOptions: {
            label: 'text',
            placeholder: 'Enter email',
            required: true,
          }
        }
      ]
    }];
  }

  onSubmit() {
    console.log(this.model);
  }

  ngOnInit(): void {
    this.initForm();
    this.initGrid();
    setTimeout(_ => {
      this.showTable = true;
    }, 100);
    for (let i = 1; i <= 1; i++) {
      this.data.push(createNewUser(i));
    }

  }

}

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
