import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(
    protected injector: Injector,
    private categoryServices: CategoryService
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

}
