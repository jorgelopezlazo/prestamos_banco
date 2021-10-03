import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'clientes', loadChildren: () => import('./shared/components/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'clientes/nuevo', loadChildren: () => import('./shared/components/formulario/formulario.module').then(m => m.FormularioModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
