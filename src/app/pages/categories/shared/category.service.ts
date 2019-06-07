import { Injectable } from '@angular/core';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categories";

  constructor(
    private http: HttpClient
  ) { }

 



}
