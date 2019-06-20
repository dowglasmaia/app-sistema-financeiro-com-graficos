import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-messagens',
  templateUrl: './server-error-messagens.component.html',
  styleUrls: ['./server-error-messagens.component.css']
})
export class ServerErrorMessagensComponent implements OnInit {

  @Input('serve-error-messages') serverErrorMessages: string[] = null;
  
  constructor() { }

  ngOnInit() {
  }

}
