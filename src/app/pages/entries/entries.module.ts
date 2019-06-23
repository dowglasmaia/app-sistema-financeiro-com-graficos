import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';
import { entryFormComponent } from './entry-form/entry-form.component';

import { CalendarModule } from "primeng/calendar";
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    EntryListComponent,
    entryFormComponent
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextModule
  ]
})

export class EntriesModule { }
