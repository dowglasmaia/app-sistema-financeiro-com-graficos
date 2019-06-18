import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';

import { CurrencyMaskModule } from "ng2-currency-mask";
import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { CalendarModule } from 'primeng/calendar';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

//Registrando pt-BR para usar o pipe de Moedas
registerLocaleData(localePt);

@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    CurrencyMaskModule
  ],

  exports: [
    //shared modules
    CommonModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    CurrencyMaskModule,

    // shared components
    BreadCrumbComponent
  ],
  
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' } 
]
  
})
export class SharedModule { }
