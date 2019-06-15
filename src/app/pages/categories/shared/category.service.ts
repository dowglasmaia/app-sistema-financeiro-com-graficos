import { Injectable, Injector } from '@angular/core';

import { Category } from './category.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(
    protected injector: Injector) {

    // o injector, injeta todas as depencencias declaradas no mesmo, na Class base de Serviço. - neste caso o httpClient
    super("categories", injector,Category.fromJson);
  }

}
