import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AuthGuardService } from './core/guards/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    CoreModule,
    AppRoutingModule,

  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
