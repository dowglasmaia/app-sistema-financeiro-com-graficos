import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";

import { switchMap } from "rxjs/operators";

import toasrt from "toastr"; /* Para Exibir as Mensagens  */
import { text } from '@angular/core/src/render3';
import { Category } from './../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class entryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null; // Error do Servidor
  submittingForm: boolean = false;
  entry: Entry = new Entry();
  categories: Array<Category>;

  /* Configuração do Imask, Mascara da Moeda - Padrõ Brasil*/
  imaskConfig = {
    mask: Number,
    sacle: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,  // adiciona o Zero  no final, caso não seja colocado. ex.: 20,2 = 20,20
    normazilizeZeros: true,
    radix: ','
  };

  /* Configurando o Calendar - do PrimeNG - para Portugues*/
  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
    monthNames: ["Janneiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Augosto", "Setembro", "Outubro"
      , "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: 'Hoje',
    clear: 'Limpar'

  };

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriesService: CategoryService
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadentry();

    this.getGategories();
  }

  /* Find Gategorias*/
  private getGategories() {
    this.categoriesService.getAll().subscribe(
      obj => this.categories = obj
   );
  }

  /* Carrega logo todos os componentes da pagina serem carregados*/
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == "new") {
      this.createEntry();
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
  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoriId: [null],
    })
  }

  /* Lenda as Cagetorias de acordo com a Operação Atual*/
  private loadentry() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get("id"))) // usar o sinal de +, para converter para um numero
      )
        .subscribe(
          (entry) => {
            this.entry = entry;
            this.entryForm.patchValue(entry); // bind  - setando os valores do formulario
          },
          (error) => alert('Ocorreu um erro no Servidor, tente mas tarde.')
        )
    }
  }

  /* Definindo Titulo da Pagina de acordo com a Operação.*/
  private setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = 'Cadastro de Novo Lançamento';
    } else {
      const entryName = this.entry.name || ''
      this.pageTitle = 'Editando Lançamento: ' + entryName;
    }
  }

  /* Update*/
  private update() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value); // atribuindo os Valores do Formulario a cetegoria

    this.entryService.update(entry).subscribe(
      entry => this.actionsForSuccess(entry),
     // toasrt.success("Lançamento atualizado com Sucesso!"),
      error => this.actionsForError(error)
    )

  }

  /* Salvar*/
  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value); // atribuindo os Valores do Formulario a cetegoria

    this.entryService.create(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    )
  }

  /* Quando operação é realizado com sucesso*/
  private actionsForSuccess(obj: Entry): void {
    toasrt.success("Solicitação Processada com Sucesso!");

    this.router.navigateByUrl("entries", { skipLocationChange: true }).then(
      () => this.router.navigate(["entries", obj.id, "edit"])
    )
  }

  /* Error -  quando oceorre um error na Operação*/
  private actionsForError(error) {
    toasrt.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors; //  retorna o Error do Servidor em Forma de Array
    } else {
      this.serverErrorMessages = [' Falha na comunicação com o Servidor. Por favor tente mas tarde.']
    }
  }

  /* Definindo os Valores do Select , e Tipos*/
  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

}
