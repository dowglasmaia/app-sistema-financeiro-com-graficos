import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CoreModule} from './core/core.module';
import { UserFormComponent } from './pages/user/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent
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
