import { Injectable } from '@angular/core';
import { LocalUser } from '../util/localUser';
import { STORAGE_KEYS } from '../config/storage-keys.config';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }



  /* Retonar um usuario Logado */
  public getLocalUser(): LocalUser {
    let user = sessionStorage.getItem(STORAGE_KEYS.localUser);
    if (user == null)
    
      return null;
    else
      return JSON.parse(user);
     
  }

  /* Recebe um Localuser e Armazena no storage */
  public setLocalUser(obj: LocalUser) {
    if (obj == null) {
      sessionStorage.clear();
    } else {
      sessionStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
      
      console.log(obj)
    }
  }

}
