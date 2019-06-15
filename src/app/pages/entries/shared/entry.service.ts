import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{
  constructor(
    protected injector: Injector,
    private categoryServices: CategoryService
  ) {
    super("entries", injector , Entry.fromJson);
  }

}
