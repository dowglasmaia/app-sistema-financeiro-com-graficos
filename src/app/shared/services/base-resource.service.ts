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

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToRecorceFn: (jsonData) => T
    ) {
        //injetando o HttpClient
        this.http = injector.get(HttpClient);
    }

    /* Retorna Todas as Categorias*/
    public getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToRecources.bind(this)), // passando para a função qual this, deve ser levando dentro da mesma.
            catchError(this.handleError)
        )
    }

    /* Retorna Todas as Categorias*/
    public getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToRecource.bind(this)),
            catchError(this.handleError),
        )
    }

    /* Update -  PUT */
    public update(recource: T): Observable<T> {
        const url = `${this.apiPath}/${recource.id}`;
        return this.http.put(url, recource).pipe(
            map(() => recource),
            catchError(this.handleError)
        )
    }

    /* POST - SAVE*/
    public create(recource: T): Observable<T> {
        return this.http.post(this.apiPath, recource).pipe(
            map(this.jsonDataToRecource.bind(this)), // o in-memory não retorna denhum dado quando atualiza , por isso não utilizei o - map(this.jsonDataToRecource), em caso de uma API Real utilizo normalmente.
            catchError(this.handleError),
        )
        
    }

    /* Delete*/
    public delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null), // no Delete retono null 
            catchError(this.handleError),
        )
    }

    //PROTECTED METHODS
    protected jsonDataToRecources(jsonData: any[]): T[] {
        const recource: T[] = [];
        jsonData.forEach(
            element => recource.push(this.jsonDataToRecorceFn(element))
        );
        return recource;
    }

    /* jsonDataTo<T> */
    protected jsonDataToRecource(jsonData: any): T {
        return this.jsonDataToRecorceFn(jsonData);
    }
    /* handleError -  */
    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }
}