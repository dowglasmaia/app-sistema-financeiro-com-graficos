import { Component, OnInit } from '@angular/core';

import { EntryService } from '../shared/entry.service';
import { Entry } from './../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryServices: EntryService) { }

  ngOnInit() {

    this.entryServices.getAll().subscribe(
      obj => {
        this.entries = obj.sort((a, b) => b.id - a.id);  //sort((a,b) => b.id - a.id)  Ordenação comprando A e B, colocando o ultimo adicionado na lista como prioridade.
      }, error => {
        alert('Erro ao carregar a lista');
      })

  }

  /* delete */
  public deleteEntry(entry) {
    const mustDelete = confirm('Deseja realmente excluir este item ?');

    if (mustDelete) {
      this.entryServices.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => alert('Error ao tentar excluir'),
      );
    }
  }


}
