import { DialogComponent } from './dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogModel } from './dialog.model';
import { Injectable } from '@angular/core';


@Injectable()
export class DialogBuildService {
  constructor(private dialog: MatDialog) {
  }

  buildDialog(dialogOptions: DialogModel, configuration: MatDialogConfig = {}) {
    if (dialogOptions.type === 'token' || dialogOptions.type === 'session') {
      configuration.id = 'easy-token-id';
      configuration.disableClose = true;
    } else if (dialogOptions.type === 'custom' && dialogOptions.disableClose) {
      configuration.id = dialogOptions.id || 'custom-component-id';
      configuration.disableClose = true;
    }

    configuration.data = dialogOptions;

    return this.dialog.open(DialogComponent, configuration);
  }

  buildSplash(dialogOptions: DialogModel) {
    this.dialog.open(DialogComponent, {
      data: dialogOptions,
      disableClose: true,
      id: 'splash-dialog'
    });
  }

  closeSplash() {
    this.dialog.getDialogById('splash-dialog').close();
  }
}
