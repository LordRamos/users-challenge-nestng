import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
// import { TranslateService } from '@ngx-translate/core';

// import { DialogResult, MessageDialogComponent, DialogType } from '@app/shared/dialogs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  showMessage(message: string) {
    return this.snackBar.open(message, undefined, {
      verticalPosition: 'top',
      duration: 3000,
    });
  }
  showError(errorMessage: string) {
    return this.snackBar.open(errorMessage, 'Error', {
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  showConfirmDialog(message: string) {
    let confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
    });
    confirmDialogRef.componentInstance.confirmMessage = message;
    return confirmDialogRef.afterClosed();
  }
}
