import { Component, OnInit } from '@angular/core';
import { LibroserviceService } from '../../../services/libros/libroservice.service';
import { UserserviceService } from '../../../services/users/userservice.service';
import { ReservaserviceService } from '../../../services/reservas/reservaservice.service';
import { Librosdata } from '../../../models/librosdata';
import { FormGroup, FormControl, Validators, ControlContainer, NgForm } from '@angular/forms';
import { Editorials } from '../../../models/editorials';
import { Autors } from '../../../models/autors';
import { TipoDocumento, Users } from '../../../models/users';
import { Categories } from '../../../models/categories';
import { Libros } from '../../../models/libros';
import { Reserva } from '../../../models/reserva';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

interface Post {
  startDate: Date;
}
@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'table.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class TableComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  lsIdioma = [{ Id: 1, Nombre: "Español" }, { Id: 2, Nombre: "Ingles" }, { Id: 3, Nombre: "Latin" }];
  lsAutores: Autors[];
  lsEditoriales: Editorials[];
  lsCategorias: Categories[];
  autorID: number;
  categorieID: number;
  editorialID: number;
  dataLibro = new Libros(null);
  dataReserva = new Reserva(null);
  IdLibro: number = 0;
  Disponibilidad: boolean = true;
  estadoSolicitud: boolean = false;
  peticionDatos: boolean = false;
  estadoSolicitudReserva: boolean = false;
  peticionDatosReserva: boolean = false;
  lsLibros: Libros[];
  lstUsuarios: Users[];
  enableBooking: boolean = false;
  showFormReserva: boolean = false;
  lstTIpoDocumento: TipoDocumento[];
  fecha: any; 


  post: Post = {
    startDate: new Date(Date.now())
  }

  libroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    autor: new FormControl(0, [Validators.required]),
    editorial: new FormControl(0, [Validators.required]),
    idioma: new FormControl(0, [Validators.required]),
    categoria: new FormControl(0, [Validators.required]),
    sinapsis: new FormControl('', [Validators.required]),
  });



  reservaForm = new FormGroup({
    fechaFin: new FormControl(this.post.startDate, [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    tipodoc: new FormControl(0, [Validators.required])
  });

  constructor(private _librosservice: LibroserviceService, private _userservice: UserserviceService,
    private _reservaservice: ReservaserviceService) {

  }

  ngOnInit() {
    this.getLibros();
    this.getDataLibros();

  }

  public getLibros() {
    this._librosservice.consultaLibros().then(
      response => {
        this.lsLibros = response;
      });
  };

  public getTipoDocumento() {
    this._userservice.consultarTipoDoc().then(
      response => {
        this.lstTIpoDocumento = response;
      });
  };

  public getUsers() {
    this._userservice.consultarUsuarios().then(
      response => {
        this.lstUsuarios = response;
        console.log(this.lstUsuarios)
      });
  };

  public getDataLibros() {
    this._librosservice.consultarDataControles().then(
      response => {
        this.lsAutores = response.Autores;
        this.lsEditoriales = response.Editorial;
        this.lsCategorias = response.Categorias;
      });
  };

  public autorSelected(event) {
    const value = event.target.value;
    this.autorID = value;
  }

  public editorialSelected(event) {
    const value = event.target.value;
    this.editorialID = value;
  }

  public categoriaSelected(event) {
    const value = event.target.value;
    this.categorieID = value;
  }


  public guardarLibro() {
    if (this.libroForm.valid) {
      this.dataLibro.Nombre = this.libroForm.controls['nombre'].value;
      this.dataLibro.IdAutor = this.autorID;
      this.dataLibro.IdCategoria = this.categorieID;
      this.dataLibro.IdEditorial = this.editorialID;
      this.dataLibro.Idioma = this.lsIdioma.find(x => x.Id == this.libroForm.controls['idioma'].value).Nombre;
      this.dataLibro.Sinapsis = this.libroForm.controls['sinapsis'].value;
      this.dataLibro.Disponible = this.Disponibilidad;
      debugger;
      if (this.IdLibro == 0) {
        this._librosservice.crearLibro(this.dataLibro).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.libroForm.reset();
              this.estadoSolicitud = true;
            }
            else {
              this.estadoSolicitud = false;
              this.libroForm.reset();
            }
          });
      }
      else {
        this.dataLibro.IdLibro = this.IdLibro;
        this._librosservice.editarLibro(this.dataLibro).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.libroForm.reset();
              this.estadoSolicitud = true;
              this.IdLibro = 0;
            }
            else {
              this.estadoSolicitud = false;
              this.libroForm.reset();
              this.IdLibro = 0;
            }
          });
      }
    }
  }

  public verLibro(libro: Libros) {
    debugger;
    this.libroForm.controls['nombre'].setValue(libro.Nombre);
    this.libroForm.controls['sinapsis'].setValue(libro.Sinapsis);
    this.libroForm.controls['idioma'].setValue(this.lsIdioma.find(x => x.Nombre == libro.Idioma).Id);
    this.libroForm.controls['autor'].setValue(libro.IdAutor);
    this.libroForm.controls['editorial'].setValue(libro.IdEditorial);
    this.libroForm.controls['categoria'].setValue(libro.IdCategoria);
    this.autorID = libro.IdAutor;
    this.categorieID = libro.IdCategoria;
    this.editorialID = libro.IdEditorial;
    this.IdLibro = libro.IdLibro;
    if (libro.Disponible) {
      this.enableBooking = true;
    }
  }


  public getEstado(e: boolean): string {
    var estado = e ? "Disponible" : "No Disponible";
    return estado;
  }

  public iniciarReserva() {
    this.showFormReserva = true;
    this.getTipoDocumento();
    this.getUsers();
  }


  //
  public reservarLibro() {
    debugger;
    if (this.reservaForm.valid) {
      this.dataReserva.IdUsuario = this.lstUsuarios.find(x => x.IdTipoDocumento == this.lstTIpoDocumento.find(y => y.Tipo == this.reservaForm.controls['tipodoc'].value).Id && x.NumeroIdentificacion == this.reservaForm.controls['documento'].value).IdUsuario;
      this.dataReserva.IdLibro = this.IdLibro;
      this.dataReserva.FechaFinReserva = this.fecha;
      this.dataReserva.FechaReserva = new Date();
      this._reservaservice.crearReserva(this.dataReserva).then(
        response => {
          this.peticionDatosReserva = true;
          if (response.Codigo == 1) {
            this.reservaForm.reset();
            this.estadoSolicitud = true;
          }
          else {
            this.estadoSolicitudReserva = true;
            this.reservaForm.reset();
          }
        });

    }
  }

  onMyDateChange(event: any) {
    this.fecha = event.target.value;
  }

}
