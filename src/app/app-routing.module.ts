import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrarComponent} from "./components/registrar/registrar.component";
import {RegistroMaquinariaComponent} from "./components/registro-maquinaria/registro-maquinaria.component";
import {InformacionComponent} from "./components/informacion/informacion.component";
import {EquiposComponent} from "./components/equipos/equipos.component";
import {OlvidoContrasenaComponent} from "./components/olvido-contrasena/olvido-contrasena.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'registrar-maquinaria', component: RegistroMaquinariaComponent},
  {path: 'registrar-maquinaria/:id', component: RegistroMaquinariaComponent},
  {path: 'informacion', component: InformacionComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'olvido-contrasena', component: OlvidoContrasenaComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
