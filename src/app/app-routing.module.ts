import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
 
  /*  Rota de Relatorio*/
  { path: '', loadChildren: './pages/reports/reports.module#ReportsModule' },
  { path: 'reports', loadChildren: './pages/reports/reports.module#ReportsModule' },

  /* Rota para o modulo de categorias*/
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' },

  /* Rota para o modulo de lançamentos*/
  { path: 'entries', loadChildren: './pages/entries/entries.module#EntriesModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
