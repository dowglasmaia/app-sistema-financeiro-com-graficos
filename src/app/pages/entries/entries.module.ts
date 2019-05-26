import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';
import { entryFormComponent } from './entry-form/entry-form.component';

import {CalendarModule} from 'primeng/calendar';

import{ IMaskModule} from "angular-imask"; // mascara para moeda



@NgModule({
  declarations: [
    EntryListComponent,
    entryFormComponent
  ],
  imports: [
    CommonModule,   
    EntriesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntriesModule { }
