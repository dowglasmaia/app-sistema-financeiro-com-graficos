import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
//import { InMemoryDatabase } from './../in-memory-database';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [
    NavComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
   // HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase) // Confg para usar a API REST InMemoryDatabase, necessario remover para usar API REST Externa.
    
  ],

  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavComponent
  ]
})
export class CoreModule { }
