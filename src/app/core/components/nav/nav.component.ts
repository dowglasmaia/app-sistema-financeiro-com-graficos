import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {

  }


  logout() {
    this.loginService.logout();
    location.reload();

  }
}
