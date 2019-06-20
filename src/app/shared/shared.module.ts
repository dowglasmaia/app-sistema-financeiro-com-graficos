import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { CurrencyMaskModule } from "ng2-currency-mask";
import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { CalendarModule } from 'primeng/calendar';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagensComponent } from './components/server-error-messagens/server-error-messagens.component';


//Registrando pt-BR para usar o pipe de Moedas
registerLocaleData(localePt);

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagensComponent,   
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    CalendarModule,
    CurrencyMaskModule,
    RouterModule,
    
  ],

  exports: [
    //shared modules
    CommonModule,
    ReactiveFormsModule,  
    CalendarModule,
    CurrencyMaskModule,
    RouterModule,    


    // shared components
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagensComponent
  ],
  
  providers: [   
    { provide: LOCALE_ID, useValue: 'pt-BR' } 
]
  
})
export class SharedModule { }
