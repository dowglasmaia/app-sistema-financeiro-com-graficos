import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  //Variaveis de acesso ao html
  @Input('page-title') pageTitle: string; // Titulo da pagina
  @Input('show-button') ShowButton: boolean = true; // controla a axibição do butão
  @Input('button-class') buttonClass: string; // class do Butão
  @Input('button-text') buttonText: string; //texto do butão
  @Input('button-link') buttonLink: string; // link do butão
  @Input('icon-class') iconClass: string; // icon do butão

  constructor() { }

  ngOnInit() {
  }

}
