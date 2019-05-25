import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";

import { switchMap } from "rxjs/operators";

import toasrt from "toastr"; /* Para Exibir as Mensagens  */


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

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadentry();
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
      type: ['', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null],
      categoriId: [null, [Validators.required]],
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
      error => this.actionsForError(error)
    )

  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value); // atribuindo os Valores do Formulario a cetegoria

    this.entryService.create(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(obj: Entry): void {
    toasrt.success("Solicitação Processada com Sucesso!");

    this.router.navigateByUrl("entries", { skipLocationChange: true }).then(
      () => this.router.navigate(["entries", obj.id, "edit"])
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
