import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
    
  ]
})
export class CategoriesModule { }
