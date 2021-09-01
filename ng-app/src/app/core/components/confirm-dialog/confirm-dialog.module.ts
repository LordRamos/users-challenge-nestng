import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [SharedModule],
  entryComponents: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
