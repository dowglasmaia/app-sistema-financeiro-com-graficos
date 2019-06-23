import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Category } from '../../categories/shared/category.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(
    protected injector: Injector,
    protected categoryServices: CategoryService
  ) {
    super("entries", injector, Entry.fromJson);
  }



  //mes e ano
  public getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }


  //filtra os laçamentos por mes e ano
  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, "DD/MM/YYYY"); //fazendo o Pars da Data com moment

      const monthMatches = entryDate.month() + 1 == month; // pega o mes passado como parametro
      const yearMatches = entryDate.year() == year; // pega o ano passado como parametro

      if (monthMatches && yearMatches) {
        return entry;
      }
    })
  }

  //FIND LISTA BY NAME
  public getCategoryByName(name: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url_api}/categories/lista?name=${name}`);

  }


}
