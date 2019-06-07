import { BaseResourceModel } from '../models/base-resource.model';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**@author Dowglas Maia 
 * @default Class Gerenerica de Serviços
 */

export abstract class BaseResourceService<T extends BaseResourceModel>{

    protected http: HttpClient;

    constructor (       
        protected apiPath: string,
        protected injector: Injector,       
    ){ 
      //injetando o HttpClient
      this.http = injector.get(HttpClient);  
    }

    /* Retorna Todas as Categorias*/
    public getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToRecources)
        )
    }

    /* Retorna Todas as Categorias*/
    public getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToRecource)
        )
    }

    /* Update -  PUT */
    public update(recource: T): Observable<T> {
        const url = `${this.apiPath}/${recource.id}`;
        return this.http.put(url, recource).pipe(
            catchError(this.handleError),
            map(() => recource)
        )
    }


    /* POST - SAVE*/
    public create(recource: T): Observable<T> {
        return this.http.post(this.apiPath, recource).pipe(
            catchError(this.handleError),
            map(this.jsonDataToRecource) // o in-memory não retorna denhum dado quando atualiza , por isso não utilizei o - map(this.jsonDataToRecource), em caso de uma API Real utilizo normalmente.
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


    //PROTECTED METHODS
    protected jsonDataToRecources(jsonData: any[]): T[] {
        const recource: T[] = [];
        jsonData.forEach(element => recource.push(element as T));
        return recource;
    }

    /* jsonDataTo<T> */
    protected jsonDataToRecource(jsonData: any): T {
        return jsonData as T;
    }
    /* handleError -  */
    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }


}