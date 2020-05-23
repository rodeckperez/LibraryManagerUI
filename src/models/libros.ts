export class Libros {
  IdLibro: number
  Nombre: string
  IdAutor: number
  IdCategoria: number
  IdEditorial: number
  Sinapsis: string
  Idioma: string
  Disponible: boolean

  constructor(data: any) {
    if (data == null) {
      this.IdLibro = 0;
      this.Nombre = "";
      this.IdAutor = 0;
      this.IdCategoria = 0;
      this.IdEditorial = 0;
      this.Sinapsis = "";
      this.Idioma = "";
      this.Disponible = true;
    }
    else {
      this.IdLibro = data.IdLibro;
      this.Nombre = data.Nombre;
      this.IdAutor = data.IdAutor;
      this.IdCategoria = data.IdCategoria;
      this.IdEditorial = data.IdEditorial;
      this.Sinapsis = data.Sinapsis;
      this.Idioma = data.Idioma;
      this.Disponible = data.Disponible;
    }
  } 
}
