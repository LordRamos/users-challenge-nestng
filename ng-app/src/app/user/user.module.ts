import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ConfirmDialogModule } from '../core/components/confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [UserRoutingModule, SharedModule, ConfirmDialogModule],
  declarations: [UserListComponent, UserFormComponent],
  providers: [],
})
export class UserModule {}
