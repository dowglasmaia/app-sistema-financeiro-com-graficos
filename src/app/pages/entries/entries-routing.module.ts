import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryListComponent } from './entry-list/entry-list.component';
import { entryFormComponent } from './entry-form/entry-form.component';

const routes: Routes = [
  {path: '' , component: EntryListComponent},
  {path: 'new' , component: entryFormComponent},
  {path: ':id/edit' , component: entryFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class EntriesRoutingModule { }
