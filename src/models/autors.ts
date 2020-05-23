export class Autors {
  IdAutor: number
  Nombres: string
  Apellidos: string
 
  constructor(data: any) {
    if (data == null) {
      this.IdAutor = 0;
      this.Nombres = "";
      this.Apellidos = "";
     
    }
    else {
      this.IdAutor = data.IdAutor;
      this.Nombres = data.Nombres;
      this.Apellidos = data.Apellidos;
    }
  }
}
