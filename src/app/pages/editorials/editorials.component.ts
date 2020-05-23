import { Component, OnInit } from '@angular/core';
import { EditorialserviceService } from '../../../services/editorials/editorialservice.service';
import { Editorials } from '../../../models/editorials';
import { FormGroup, FormControl, Validators, ControlContainer, NgForm } from '@angular/forms';
import { Respuesta } from '../../../models/respuesta';

@Component({
  selector: 'app-editorials',
  templateUrl: './editorials.component.html',
  styleUrls: ['./editorials.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  moduleId: module.id,
})
export class EditorialsComponent implements OnInit {
  editorialForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    nit: new FormControl('', [Validators.required])
  });

  IdEditorial: number = 0;
  estadoSolicitud: boolean = false;
  peticionDatos: boolean = false;
  lsEditorials: Editorials[];
  dataEditorial = new Editorials(null);


  constructor(private _editorialservice: EditorialserviceService) {

  }

  ngOnInit() {
    this.getEditorials();
  }

  public getEditorials() {
    this._editorialservice.consultaEditoriales().then(
      response => {
        this.lsEditorials = response;
      });
  };


  public guardarEditorial() {
    if (this.editorialForm.valid) {
      this.dataEditorial.NombreEditorial = this.editorialForm.controls['nombre'].value;
      this.dataEditorial.NIT = this.editorialForm.controls['nit'].value;
      if (this.IdEditorial == 0) {
        this._editorialservice.crearEditorial(this.dataEditorial).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.editorialForm.reset();
              this.estadoSolicitud = true;
            }
            else {
              this.estadoSolicitud = false;
              this.editorialForm.reset();
            }
          });
      }
      else {
        this.dataEditorial.IdEditorial = this.IdEditorial;
        this._editorialservice.editarEditorial(this.dataEditorial).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.editorialForm.reset();
              this.estadoSolicitud = true;
              this.IdEditorial = 0;
            }
            else {
              this.estadoSolicitud = false;
              this.editorialForm.reset();
              this.IdEditorial = 0;
            }
          });
      }
    }
  }

  public verEditorial(editorial: Editorials) {
    this.editorialForm.controls['nombre'].setValue(editorial.NombreEditorial);
    this.editorialForm.controls['nit'].setValue(editorial.NIT);
    this.IdEditorial = editorial.IdEditorial;
  }
}
