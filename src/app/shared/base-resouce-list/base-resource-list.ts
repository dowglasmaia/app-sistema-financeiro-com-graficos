import { OnInit, Injector } from '@angular/core';

import { BaseResourceService } from '../services/base-resource.service';
import { BaseResourceModel } from '../models/base-resource.model';
import { StorageService } from '../services/storage.service';
import { UserService } from 'src/app/pages/user/shared/services/user.service';
import { User } from 'src/app/pages/user/shared/user.model';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    user: User;
    protected userServices: UserService;
    protected storageService: StorageService;

    constructor(
        protected injector: Injector,
        protected resourceService: BaseResourceService<T>,

    ) {
        this.userServices = this.injector.get(UserService);
        this.storageService = this.injector.get(StorageService)
    }

    ngOnInit() {
        this.getUserLogado();

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



    //find by user logged
    public getUserLogado() {
        let localUser = this.storageService.getLocalUser();

        if (localUser && localUser.email) {
            this.userServices.getUserByEmail(localUser.email).subscribe(
                user => {
                    this.user = user;
                    this.getCategories();
                }, error => { })
        }
    }

    //get Categories
    public getCategories() {
        this.resourceService.getAll(this.user.id).subscribe(
            resource => {
                this.resources = resource.sort((a, b) => b.id - a.id);  //sort((a,b) => b.id - a.id)  Ordenação comprando A e B, colocando o ultimo adicionado na lista como prioridade.
            }, error => {
                alert('Erro ao carregar a lista');
            })
     }

}
