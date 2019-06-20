import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CoreModule} from './core/core.module';
import { NavComponent } from './core/components/nav/nav.component';



@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
  
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
