import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  obtenerRoles(){
    return this.http.get(`${environment.apiUrl}/rol/rol.php`);
  }
}
