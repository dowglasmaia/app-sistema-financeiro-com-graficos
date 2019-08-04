import { Component, OnInit } from '@angular/core';
import { User } from '../../../pages/user/shared/user.model';
import { UserService } from '../../../pages/user/shared/services/user.service';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user: User;
  

  constructor(
    private userServices: UserService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    
    this.getUserLogado();

    //console.log(sessionStorage.getItem('localUser'))

  }

  //find by user logged
  public getUserLogado() {
    let localUser = this.storageService.getLocalUser();

    if (localUser && localUser.email) {
      this.userServices.getUserByEmail(localUser.email).subscribe(
        user => {
          this.user = user;        
        }, error => { })
    }
  }
}
