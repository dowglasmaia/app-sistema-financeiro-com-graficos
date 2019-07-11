import { Component, OnInit } from '@angular/core';
import { UserService } from './pages/user/shared/services/user.service';
import { StorageService } from './shared/services/storage.service';
import { User } from './pages/user/shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User;

  constructor(
    private userServices: UserService,
    private storageService: StorageService
  ) { }

  title = 'finansys';

  ngOnInit(): void {
    this.getUserLogado();
  }

  //find by user logged
  public getUserLogado() {
    let localUser = this.storageService.getLocalUser();

    if (localUser && localUser.email) {
      this.userServices.getUserByEmail(localUser.email).subscribe(
        user => {
          this.user = user
        }, error => { })
    }
  }

}
