import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  //chama este no HTML
  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  //Error de Campo Invalido
  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage())
      return this.getErrorMessage();
    else
      null;

  }

  //metodo com a regra de erros
  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  //Messagens de Error, Dinamica
  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) { //campo requerido
      return "campo obrigatório";

    } else if (this.formControl.errors.email) { //email ivalido     
      return "formato de e-mail inválido";

    } else if (this.formControl.errors.minlength) { //tamanho minimo
      const requiredLength = this.formControl.errors.minlength.requiredLength; //tamanho requerido
      return `o campo deve ter no mínimo ${requiredLength} caracteres`;

    } else if (this.formControl.errors.maxlength) { //tamanho maximo
      const requiredLength = this.formControl.errors.maxlength.requiredLength; //tamanho requerido
      return `o campo deve ter no maximo ${requiredLength} caracteres`;
    }
  }


}
