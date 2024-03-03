import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MaquinariaService {

  constructor(private http: HttpClient) { }

  obtenerMaquinas(){
    return this.http.get(`${environment.apiUrl}/registrar-maquina/obtener-maquinas.php`);
  }

  obtenerMaquina(id?: number){
    return this.http.get(`${environment.apiUrl}/registrar-maquina/obtener-maquina.php?id=${id}`);
  }

  registrarMaquina(formularioMaquina: any) {
    return this.http.post(`${environment.apiUrl}/registrar-maquina/registrar-maquinaria.php`, formularioMaquina);
  }

  obtenerMarcas(){
    return this.http.get(`${environment.apiUrl}/marcas/marcas.php`);
  }

  obtenerTiposMaquina(){
    return this.http.get(`${environment.apiUrl}/tipos-maquina/tipos-maquina.php`);
  }

  obtenerEstadosMaquina(){
    return this.http.get(`${environment.apiUrl}/estados-maquina/estados-maquina.php`);
  }

  obtenerEmpresas(){
    return this.http.get(`${environment.apiUrl}/empresas/empresas.php`);
  }

  eliminarMaquina(id: number){
    return this.http.delete(`${environment.apiUrl}/registrar-maquina/eliminar-maquina.php?id=${id}`);
  }

  actualizarMaquina(formularioMaquina: any){
    return this.http.post(`${environment.apiUrl}/registrar-maquina/actualizar-maquina.php`, formularioMaquina);
  }
}
