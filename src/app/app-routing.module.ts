import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './shared/components/clientes/crear-cliente/crear-cliente.component';

const routes: Routes = [
  { path: 'clientes', loadChildren: () => import('./shared/components/clientes/clientes.module').then(m => m.ClientesModule) },
  // { path: 'clientes/nuevo', loadChildren: () => import('./shared/components/formulario/formulario.module').then(m => m.FormularioModule) },
  { path: 'clientes/nuevo', component: CrearClienteComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
