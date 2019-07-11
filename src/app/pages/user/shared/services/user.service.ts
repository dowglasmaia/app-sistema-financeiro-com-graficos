import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseResourceService<User> {

  constructor(
    protected injector: Injector,
  ) {
    super("user", injector, User.fromJson);
  }

  //find by email
  public getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${environment.url_api}/users/email?email=${email}`);
  }

}
