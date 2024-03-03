import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public enviado = false;

  public formularioLogin = this.fb.group({
    usuario: [null, [Validators.required]],
    contrasena: [null, [Validators.required]]
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router
  ) {
  }

  iniciarSesion() {
    this.enviado = true;

    if (this.formularioLogin.valid) {
      this.authService.iniciarSesion(this.formularioLogin.value).subscribe((respuesta: any) => {

        // Si el usuario y contrasena existen, entonces inicia sesion y lo redirige a la pagina principal
        if (respuesta.success) {
          this.router.navigate(['/informacion'])
        } else { // Si no existe, entonces muestra el error de que el usuario no está registrado
          Swal.fire({
            title: 'Error',
            text: 'Este usuario no está registrado',
            icon: 'error'
          });
        }
      });
    }

  }

}
