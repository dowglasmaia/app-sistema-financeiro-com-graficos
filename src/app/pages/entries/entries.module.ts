import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';



@NgModule({
  declarations: [
    EntryListComponent
  ],
  imports: [
  
  CommonModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
