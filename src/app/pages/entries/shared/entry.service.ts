import { Injectable, Injector } from '@angular/core';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{


  constructor(
    protected injector: Injector,
    private categoryServices: CategoryService
  ) {
    super("api/entries", injector);
  }

}
