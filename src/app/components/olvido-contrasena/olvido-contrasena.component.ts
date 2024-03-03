import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.component.html',
  styleUrls: ['./olvido-contrasena.component.css']
})
export class OlvidoContrasenaComponent {

  public enviado = false;

  public formularioOlvido = this.fb.group({
    usuario: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService
  ) {
  }

  verificar(){
    this.enviado = true;

    if(this.formularioOlvido.valid){
      this.authService.verificarUsuario(this.formularioOlvido.value).subscribe( (respuesta: any) => {
        console.log(respuesta);

        if(respuesta.success){
          Swal.fire({
            title: 'Éxito',
            text: `La contraseña del usuario ${this.formularioOlvido.controls.usuario.value} es ${respuesta.data}`,
            icon: 'success'
          });
        }else {
          Swal.fire({
            title: 'Error',
            text: respuesta.message,
            icon: 'error'
          });
        }

      });
    }
  }


}
