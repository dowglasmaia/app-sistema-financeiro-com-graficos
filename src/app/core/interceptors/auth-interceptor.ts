import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';


/* 
Class Responsavel por enviar o token nas requisições
*/

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let usuario = this.storage.getLocalUser();

        let N = environment.url_api.length;

        let reqToApi = req.url.substring(0, N) == environment.url_api;

        /*se o localuser não estiver null, faz um clone do token e add no cabeçalho da requisição */
        if (usuario && reqToApi) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + usuario.token)
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
