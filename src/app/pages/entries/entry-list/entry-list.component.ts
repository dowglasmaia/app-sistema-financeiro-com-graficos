import { Component, Injector } from '@angular/core';

import { BaseResourceListComponent } from './../../../shared/base-resouce-list/base-resource-list';

import { EntryService } from '../shared/entry.service';
import { Entry } from './../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {


  constructor(
    protected entryServices: EntryService,  
    protected injector: Injector
  ) {
    //super()
    super(injector, entryServices)
  }


}
