import { OnInit } from '@angular/core';

import { BaseResourceService } from '../services/base-resource.service';
import { BaseResourceModel } from '../models/base-resource.model';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(
        protected resourceService: BaseResourceService<T>
    ) { }

    ngOnInit() {
        this.resourceService.getAll(1).subscribe(
            resource => {
                this.resources = resource.sort((a, b) => b.id - a.id);  //sort((a,b) => b.id - a.id)  Ordenação comprando A e B, colocando o ultimo adicionado na lista como prioridade.
            }, error => {
              alert('Erro ao carregar a lista');
            })
    }

    /* delete */
    public deleteResource(resource: T) {
        const mustDelete = confirm('Deseja realmente excluir este item ?');

        if (mustDelete) {
            this.resourceService.delete(resource.id).subscribe(
                () => this.resources = this.resources.filter(element => element != resource),
                () => alert('Error ao tentar excluir'),
            );
        }
    }


}
