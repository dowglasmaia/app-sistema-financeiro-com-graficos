import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';
import { entryFormComponent } from './entry-form/entry-form.component';



@NgModule({
  declarations: [
    EntryListComponent,
    entryFormComponent
  ],
  imports: [
    CommonModule,   
    EntriesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EntriesModule { }
