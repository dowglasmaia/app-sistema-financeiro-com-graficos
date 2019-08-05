import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { LoginGuard } from './core/guards/login-guard.service';

const routes: Routes = [

  {
    path: '', canActivate: [AuthGuardService],

    children: [

      { path: '', redirectTo: 'reports', pathMatch: 'full' },

      /*  Rota de Relatorio*/
      { path: 'reports', loadChildren: './pages/reports/reports.module#ReportsModule' },

      /* Rota para o modulo de categorias*/
      { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' },

      /* Rota para o modulo de lançamentos*/
      { path: 'entries', loadChildren: './pages/entries/entries.module#EntriesModule' },

    ]
  },
  /*  Rota de Login*/
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule', canActivate: [LoginGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
