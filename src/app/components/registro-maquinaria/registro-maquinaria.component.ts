import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MaquinariaService } from '../../services/maquinaria.service';

@Component({
  selector: 'app-registro-maquinaria',
  templateUrl: './registro-maquinaria.component.html',
  styleUrls: ['./registro-maquinaria.component.css']
})
export class RegistroMaquinariaComponent implements OnInit {

  private editar = false;
  private crear = false;
  public marcas: any = [];
  public tiposMaquina: any = [];
  public estadosMaquina: any = [];
  public empresas: any = [];
  public imagenUrl = '';
  public imagen_nombre = '';
  public id = null; // Id del registro

  public enviado = false;
  public imagenSeleccionada: File | null = null;

  public registroMaquinariaForm = this.fb.group({
    no_chasis: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    modelo: [null, [Validators.required]],
    estado: [null, [Validators.required]],
    horometro: [null, [Validators.required]],
    empresa: [null, [Validators.required]],
    marca: [null, [Validators.required]],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private registroMaquinariaService: MaquinariaService
  ) { }

  ngOnInit() {
    const obtenerMarcasPromise = this.registroMaquinariaService.obtenerMarcas().toPromise();
    const obtenerTiposMaquinaPromise = this.registroMaquinariaService.obtenerTiposMaquina().toPromise();
    const obtenerEstadosMaquinaPromise = this.registroMaquinariaService.obtenerEstadosMaquina().toPromise();
    const obtenerEmpresasPromise = this.registroMaquinariaService.obtenerEmpresas().toPromise();

    Promise.all([
      obtenerMarcasPromise,
      obtenerTiposMaquinaPromise,
      obtenerEstadosMaquinaPromise,
      obtenerEmpresasPromise
    ]).then((respuestas: any[]) => {

      // Respuesta 1: marcas
      this.marcas = respuestas[0].data;

      // Respuesta 2: tipos de maquina
      this.tiposMaquina = respuestas[1].data;

      // Respuesta 3: estados maquina
      this.estadosMaquina = respuestas[2].data;

      // Respuesta 4: empresas
      this.empresas = respuestas[3].data;

      // Obtener el ID desde la URL
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          // Cargar la información según el ID
          this.cargarInformacion(+id);
          this.editar = true; // si hay ID es porque estamos editando
        } else {
          this.crear = true; // Si no hay ID es porque estamos creando
        }
      });
    });

  }

  cargarInformacion(id: number) {
    this.registroMaquinariaService.obtenerMaquina(id).subscribe((respuesta: any) => {
      console.log(respuesta);
      // Asignar los valores a los controles del formulario
      this.registroMaquinariaForm.patchValue({
        no_chasis: respuesta.no_chasis,
        tipo: respuesta.id_tipo_maquina,
        modelo: respuesta.modelo,
        estado: respuesta.id_estado,
        horometro: respuesta.horometro,
        empresa: respuesta.id_empresa,
        marca: respuesta.id_marca
      });
      this.imagenUrl = respuesta.imagen;
      this.imagen_nombre = respuesta.imagen_nombre;
      this.id = respuesta.id;
    });
  }

  /**
   * Funcion que toma la imagen para enviarla al backend
   * @param event Evento de cambio
   */
  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  /**
   * Funcion que visualiza la imagen en el momento de cargar una imagen
   * @param event Evento de cambio
   */
  cargarImagen(event: any) {
    const archivo = event.target.files[0];
    const lector = new FileReader();

    lector.onload = (e: any) => {
      console.log(e);
      this.imagenUrl = e.target.result;
    };

    lector.readAsDataURL(archivo);
  }


  guardar() {
    this.enviado = true;
    if (this.registroMaquinariaForm.valid) {
      const formData = new FormData();
      formData.append('id', this.id || '');
      formData.append('no_chasis', this.registroMaquinariaForm.get('no_chasis')?.value || '');
      formData.append('tipo', this.registroMaquinariaForm.get('tipo')?.value || '');
      formData.append('modelo', this.registroMaquinariaForm.get('modelo')?.value || '');
      formData.append('estado', this.registroMaquinariaForm.get('estado')?.value || '');
      formData.append('horometro', this.registroMaquinariaForm.get('horometro')?.value || '');
      formData.append('empresa', this.registroMaquinariaForm.get('empresa')?.value || '');
      formData.append('marca', this.registroMaquinariaForm.get('marca')?.value || '');
      if (this.imagenSeleccionada) {
        formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
      }

      if(this.crear){
        this.registrarMaquina(formData);
      } else if (this.editar) {
        this.actualizarMaquina(formData);
      }
    }
  }

  actualizarMaquina(formData: FormData){
    this.registroMaquinariaService.actualizarMaquina(formData).subscribe(
      (respuesta: any) => {
        if (respuesta.success) {
          Swal.fire({
            title: 'Éxito',
            text: 'Maquina actualizada correctamente',
            icon: 'success'
          }).then(res => {
            this.router.navigate(['informacion']);
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: respuesta.message,
            icon: 'error'
          });
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar la máquina',
          icon: 'error'
        }).then(res => {
          this.router.navigate(['informacion']);
        });
      }
    );
  }

  registrarMaquina(formData: FormData){
    this.registroMaquinariaService.registrarMaquina(formData).subscribe(
      (respuesta: any) => {
        if (respuesta.success) {
          Swal.fire({
            title: 'Éxito',
            text: 'Registro guardado con éxito',
            icon: 'success'
          }).then(res => {
            this.router.navigate(['informacion']);
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: respuesta.message,
            icon: 'error'
          });
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al guardar la máquina',
          icon: 'error'
        }).then(res => {
          this.router.navigate(['informacion']);
        });
      }
    );
  }

}
