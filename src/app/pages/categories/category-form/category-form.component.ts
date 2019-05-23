import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

import { switchMap } from "rxjs/operators";

import toasrt from "toastr"; /* Para Exibir as Mensagens  */


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {


  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null; // Error do Servidor
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  /* Carrega logo todos os componentes da pagina serem carregados*/
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == "new") {
      this.createCategory();
    } else {
      this.update();
    }
  }

  // PRIVATE METHODS

  /* Verificando o tipo da operção, se é  new ou edit, pegando pela url ativa*/
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }

  /* Criando o Formulario da Categoria*/
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  /* Lenda as Cagetorias de acordo com a Operação Atual*/
  private loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id"))) // usar o sinal de +, para converter para um numero
      )
        .subscribe(
          (category) => {
            this.category = category;
            this.categoryForm.patchValue(category); // bind  - setando os valores do formulario
          },
          (error) => alert('Ocorreu um erro no Servidor, tente mas tarde.')
        )
    }
  }

  /* Definindo Titulo da Pagina de acrodo com a Operação.*/
  private setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const categoryName = this.category.name || ''
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }

  /* Update*/
  private update() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value); // atribuindo os Valores do Formulario a cetegoria

    this.categoryService.update(category).subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    )

  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value); // atribuindo os Valores do Formulario a cetegoria

    this.categoryService.create(category).subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(obj: Category): void {
    toasrt.success("Solicitação Processada com Sucesso!");

    /* Forçando o recarregamento da Pagina, o skipLocationChange, evita que esta rota seja guardando no navegador.
    vou ate rota de categorias, e  em seguida volta para rota de categorias ja com o ID do Objeto , deforma rapida. */
      this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
     () => this.router.navigate(["categories", obj.id, "edit"])
     )
  }

  /* Error*/
  private actionsForError(error) {
    toasrt.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors; //  retorna o Error do Servidor em Forma de Array
    } else {
      this.serverErrorMessages = [' Falha na comunicação com o Servidor. Por favor tente mas tarde.']
    }
  }


}
