import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from './category.model';

import { map, catchError, flatMap } from 'rxjs/operators';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Entry } from './../../entries/shared/entry.model';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories";

  constructor(
    private http: HttpClient
  ) { }

  /* Retorna Todas as Categorias*/
  public getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  /* Retorna Todas as Categorias*/
  public getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  /* Update -  PUT */
  public update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }


  /* POST - SAVE*/
  public create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(() => category) // o in-memory não retorna denhum dado quando atualiza , por isso não utilizei o - map(this.jsonDataToCategory), em caso de uma API Real utilizo normalmente.
    )
  }

  /* Delete*/
  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null) // no Delete retono null 
    )
  }



  //PRIVATE METHODS

  /* o jsonDataToCategories - Seria o mesmo que fazer:
    map( jsonData => this.jsonDataToCategory(jsonData) )
  */
  private jsonDataToCategories(jsonData: any[]): Category[] {   
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));
    return categories;
  }

  /* jsonDataToCategory */
  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }
  /* handleError -  */
  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }

}
