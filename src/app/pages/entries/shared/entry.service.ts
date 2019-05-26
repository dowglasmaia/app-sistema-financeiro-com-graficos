import { Injectable } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';



@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(
    private http: HttpClient,
    private categoryServices: CategoryService
  ) { }

  /* Retorna Todas */
  public getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  /* Retorna Por ID*/
  public getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  /* Update  -  PUT */
  public update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    )
  }


  /* POST - SAVE*/
  public create(entry: Entry): Observable<Entry> {
    /* Adapitando para o Imemory, em caso de API externa não precisa
    return this.categoryServices.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;*/

    // com API exerna Usar só este.
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry) // o in-memory não retorna denhum dado quando atualiza , por isso não utilizei o - map(this.jsonDataToEntry), em caso de uma API Real utilizo normalmente.
    );
  }



  /* Delete*/
  public delete(id: number): Observable<{}> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null) // no Delete retono null 
    )
  }



  //PRIVATE METHODS

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    // console.log(jsonData[0] as Entry)
    // console.log(Object.assign(new Entry(), jsonData[0]))

    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const obj = Object.assign(new Entry(), element);
      entries.push(obj);
    });

    return entries;
  }

  /* jsonDataToEntry */
  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }
  /* handleError -  */
  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }

}
