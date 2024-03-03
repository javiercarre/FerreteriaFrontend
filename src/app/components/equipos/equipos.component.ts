import { Component } from '@angular/core';
import {MaquinariaService} from "../../services/maquinaria.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {

  public maquinas: any;

  constructor(private maquinariaService: MaquinariaService) {
    this.obtenerMaquinas();
  }

  obtenerMaquinas(){
    this.maquinariaService.obtenerMaquinas().subscribe( (respuesta: any) => {
      this.maquinas = respuesta;
    });
  }

  eliminarMaquina(id: number) {
    this.maquinariaService.eliminarMaquina(id).subscribe( (respuesta: any) => {
      if (respuesta.success){
        Swal.fire({
          title: 'Éxito',
          text: respuesta.message,
          icon: 'success'
        });
        this.obtenerMaquinas();
      } else {
        Swal.fire({
          title: 'Error',
          text: respuesta.message,
          icon: 'error'
        });
      }
    });
  }

}
