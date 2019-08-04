import { Component, Injector } from '@angular/core';

import { BaseResourceListComponent } from './../../../shared/base-resouce-list/base-resource-list';

import { Category } from './../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  
  /*
    get categories(){
      return this.resources;
    }
  */

  constructor(
    protected injector: Injector,
    protected categoriService: CategoryService
  ) {
    super(injector,categoriService);
  }



}
