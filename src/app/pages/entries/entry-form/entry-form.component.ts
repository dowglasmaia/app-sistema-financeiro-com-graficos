import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";

import { Entry } from "../shared/entry.model";
import { EntryService } from "../shared/entry.service";
import { BaseResourceFormComponent } from "../../../shared/base-resource-form/base-resource-form.component";
import { Category } from './../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class entryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Array<Category> ;

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
    protected entryService: EntryService,
    protected categoriesService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson)
  }

  ngOnInit() {
    this.getGategories();
    super.ngOnInit(); // para executar o ngOnInit da Classe Base tbm
  }

  /* Find Gategorias*/
  protected getGategories() {
    this.categoriesService.getAll().subscribe(
      obj => this.categories = obj
    );
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
  

  /* Criando o Formulario da Categoria*/
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      category: [null],
    })
  }

  /* Sobrescrevendo os metodos dos Titulos*/
  protected creationPageTitle(): string {
    return "Cadastro de Novo Lançamento";
  }

  protected editionPateTile(): string {
    const entryName = this.resource.name || "";
    return "Editando Lançamento: " + entryName;
  }

}
