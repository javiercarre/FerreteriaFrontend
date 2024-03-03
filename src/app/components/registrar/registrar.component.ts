import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {RolService} from "../../services/rol.service";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  public enviado = false;
  public roles: any = [];

  public formularioRegistro = this.fb.group({
    nombres: [null],
    no_documento: [null],
    usuario: [null, [Validators.required]],
    correo: [null, [Validators.required, Validators.email]],
    telefono: [null],
    rol: [null, [Validators.required]],
    contrasena: [null, [Validators.required]]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private rolService: RolService
              ) {
    this.rolService.obtenerRoles().subscribe( (respuesta: any) => {
      this.roles = respuesta.data;
      console.log(respuesta.data);
    });
  }

  guardar() {

    this.enviado = true;

    if(this.formularioRegistro.valid){
      this.authService.registrar(this.formularioRegistro.value).subscribe(respuesta => {
        Swal.fire({
          title: 'Éxito',
          text: `El usuario ${this.formularioRegistro.controls.usuario.value} fue registrado exitosamente`,
          icon: 'success'
        }).then(res => {
          this.router.navigate(['login']);
        });
      });
    }
  }
}
