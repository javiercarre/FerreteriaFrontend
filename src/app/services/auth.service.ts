import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  iniciarSesion(formularioLogin: any) {
    return this.http.post(`${environment.apiUrl}/login/login.php`, formularioLogin);
  }

  registrar(formularioRegistro: any){
    return this.http.post( `${environment.apiUrl}/registrar/registrar.php`, formularioRegistro);
  }

  verificarUsuario(formularioOlvido: any){
    return this.http.post( `${environment.apiUrl}/usuarios/verificar-usuario.php`, formularioOlvido);
  }

}
