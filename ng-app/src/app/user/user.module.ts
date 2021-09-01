import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [UserRoutingModule, SharedModule],
  declarations: [UserListComponent, UserFormComponent],
  providers: [],
})
export class UserModule {}
