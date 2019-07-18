import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
//import { InMemoryDatabase } from './../in-memory-database';
import { NavComponent } from './components/nav/nav.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { TemplateComponent } from './components/template/template.component';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';


@NgModule({
  declarations: [   
    HeaderNavComponent,
    NavComponent,   
    FooterComponent,
    TemplateComponent,

  ],

  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,     
    HttpClientModule,
    RouterModule,
    
   // HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase) // Confg para usar a API REST InMemoryDatabase, necessario remover para usar API REST Externa.
    
  ],

  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    RouterModule,
    TemplateComponent,
    NavComponent,
    HeaderNavComponent,
    FooterComponent,
   
   
 
    
  ],
  providers:[
    AuthInterceptorProvider,
    TemplateComponent,

  ]
})
export class CoreModule { }
