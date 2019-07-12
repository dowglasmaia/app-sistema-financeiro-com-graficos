import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { LoginGuard } from './core/guards/login-guard.service';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    CoreModule,
    AppRoutingModule,

  ],
  providers: [
    AuthGuardService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
