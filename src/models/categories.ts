export class Categories {
  IdCategoria: number
  Nombre: string
  Descripcion: string

  constructor(data: any) {
    if (data == null) {
      this.IdCategoria = 0;
      this.Nombre = "";
      this.Descripcion = "";

    }
    else {
      this.IdCategoria = data.IdCategoria;
      this.Nombre = data.Nombre;
      this.Descripcion = data.Descripcion;
    }
  }
}
