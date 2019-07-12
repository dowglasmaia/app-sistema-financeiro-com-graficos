import { Component, OnInit } from '@angular/core';
import { UserService } from './pages/user/shared/services/user.service';
import { StorageService } from './shared/services/storage.service';
import { User } from './pages/user/shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  title = 'finansys';


}
