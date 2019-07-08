/* Armazena o Usuario logado*/

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalUser {
    token: string;
    email: string;

}
