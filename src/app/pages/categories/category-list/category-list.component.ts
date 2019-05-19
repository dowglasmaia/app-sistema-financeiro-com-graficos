import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../shared/category.service';
import { Category } from './../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoriService: CategoryService) { }

  ngOnInit() {
    this.categoriService.getAll().subscribe(
      obj => {
        this.categories = obj
      }, error => {
        alert('Erro ao carregar a lista')
      })
  }

  /* delete */
  public deleteCategory(category) {
    const mustDelete = confirm('Deseja realmente excluir este item ?');
   
    if (mustDelete) {
      this.categoriService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert('Error ao tentar excluir'),
      );
    }
  }


}
