import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';

import { UserRoutingModule } from './user-routing.module';

import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,

  ],
  imports: [
   CoreModule,
    UserRoutingModule
  ]
})
export class UserModule { }
