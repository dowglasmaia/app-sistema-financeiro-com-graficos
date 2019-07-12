import { Injectable } from '@angular/core';

/* https://www.npmjs.com/package/@auth0/angular-jwt */
import { JwtHelperService } from '@auth0/angular-jwt';

import { Credencias } from 'src/app/pages/user/shared/credencias.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { User } from 'src/app/pages/user/shared/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalUser } from '../util/localUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private route: Router) { }

  /* Retorna o Perfil do Usuario logado */
  public perfil(user: User): Observable<User> {
    
    return null;
  }

  /* mtd de autenticação de login */
  public authenticate(creds: Credencias) {
    return this.http.post(`${environment.url_api}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      })
  }

  /*SUCESSO lOGIN */
  public sucessfulllogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7); // remove o nome Bearer e o espaço ) deixando o token.
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelperService.decodeToken(tok).sub, // pegar o email que ven dentro do token
    };
    this.storage.setLocalUser(user); // armazena o Usuario logado no Storage
   location.replace('reports')
  }

  public logout() {
    this.storage.setLocalUser(null);   
    sessionStorage.clear();
    

  }
}
