import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';
import { entryFormComponent } from './entry-form/entry-form.component';


@NgModule({
  declarations: [
    EntryListComponent,
    entryFormComponent
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule,
  ]
})
export class EntriesModule { }
