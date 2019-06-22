import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceModel } from "../../shared/models/base-resource.model";
import { BaseResourceService } from "../../shared/services/base-resource.service";

import { switchMap } from "rxjs/operators";

import toasrt from "toastr"; /* Para Exibir as Mensagens  */

/*Class Generica para Components de Formulario*/

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null; // Error do Servidor
    submittingForm: boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected injector: Injector,
        public resource: T, //para instancia o Obj que erda a class /// ex: new Category()
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData) => T, // converte o Obj para Json
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder)
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    /* Carrega logo todos os componentes da pagina serem carregados*/
    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    /* Submissão do Formulario*/
    submitForm() {
        this.submittingForm = true;

        if (this.currentAction == "new" || this.resource.id == null) {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    // protected METHODS

    /* Verificando o tipo da operção, se é  new ou edit, pegando pela url ativa*/
    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new")
            this.currentAction = "new"
        else
            this.currentAction = "edit"
    }

    /* Lenda as Cagetorias de acordo com a Operação Atual*/
    protected loadResource() {
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id"))) // usar o sinal de +, para converter para um numero
            ).subscribe((obj) => {
                this.resource = obj;
                this.resourceForm.patchValue(obj); // bind  - setando os valores do formulario
            },
                (error) => alert('Ocorreu um erro no Servidor, tente novamente mas tarde.! \nCaso o Error Persista contate o o Dep. de TI.')
            )
        }
    }

    /* Definindo Titulo da Pagina de acrodo com a Operação.*/
    protected setPageTitle() {
        if (this.currentAction == "new") {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPateTile();
        }
    }

    //Definindo i titulo da pagina dinamicamente.
    protected editionPateTile(): string {
        return "Edição";
    }

    protected creationPageTitle(): string {
        return "Novo";
    }
    //-- /

    /* Create */
    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
        
        this.resourceService.create(resource).subscribe(
            resource => this.actionsForSuccess(resource),  //sucesso
            error => this.actionsForError(error)  // Error
        )

    }

    /* Update*/
    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource).subscribe(
            resource => this.actionsForSuccess(resource),  //sucesso
            error => this.actionsForError(error)  // Error
        )
    }

    /* Success*/
    protected actionsForSuccess(resource: T): void {
        toasrt.success("Solicitação Processada com Sucesso!");

        //Pegando o Path da Roda - Dinamicamente.
        const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

        //Redirect/reload component page
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath, resource.id, "edit"])
        )
    }

    /* Error*/
    protected actionsForError(error) {
        toasrt.error('Ocorreu um erro ao processar a sua solicitação!');
        this.submittingForm = false;

        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).errors; //  retorna o Error do Servidor em Forma de Array
        } else {
            this.serverErrorMessages = [' Falha na comunicação com o Servidor. Por favor tente mas tarde.']
        }
    }

    /* Build Form Abstrated - Sera implementado na Class que Erda o base resource form*/
    protected abstract buildResourceForm(): void;

}
