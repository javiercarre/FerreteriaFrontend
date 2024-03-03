import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RegistroMaquinariaComponent } from './components/registro-maquinaria/registro-maquinaria.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EquiposComponent } from './components/equipos/equipos.component';
import {HttpClientModule} from "@angular/common/http";
import { OlvidoContrasenaComponent } from './components/olvido-contrasena/olvido-contrasena.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrarComponent,
    RegistroMaquinariaComponent,
    InformacionComponent,
    EquiposComponent,
    OlvidoContrasenaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
