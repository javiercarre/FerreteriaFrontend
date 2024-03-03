import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() nombre: string = 'Sin nombre proporcionado';

  constructor(public router: Router) {
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

  redirigirAinformacion() {
    if(this.router.url === '/olvido-contrasena'){
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/informacion']);
    }
  }

}
