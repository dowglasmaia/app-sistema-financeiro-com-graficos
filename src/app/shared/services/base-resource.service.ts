import { BaseResourceModel } from '../models/base-resource.model';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


/**@author Dowglas Maia 
 * @default Class Gerenerica de Serviços
 */


export abstract class BaseResourceService<T extends BaseResourceModel>{

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
      map(()=> category)
    )
  }


  /* POST - SAVE*/
  public create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory) // o in-memory não retorna denhum dado quando atualiza , por isso não utilizei o - map(this.jsonDataToCategory), em caso de uma API Real utilizo normalmente.
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


}