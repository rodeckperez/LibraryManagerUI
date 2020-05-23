export class Users {
  IdUsuario : number
  Nombres : string
  Apellidos : string
  IdTipoDocumento : number
  NumeroIdentificacion : string
  Direccion : string
  Telefono : string
  Estado: boolean

  constructor(data: any) {
    if (data == null) {
      this.IdUsuario = 0;
      this.Nombres = "";
      this.Apellidos = "";
      this.IdTipoDocumento = 0;
      this.NumeroIdentificacion = "";
      this.Direccion = "";
      this.Telefono = "";
      this.Estado = true;
    }
    else {
      this.IdUsuario = data.IdUsuario;
      this.Nombres = data.Nombres;
      this.Apellidos = data.Apellidos;
      this.IdTipoDocumento = data.IdTipoDocumento;
      this.NumeroIdentificacion = data.NumeroIdentificacion;
      this.Direccion = data.Direccion;
      this.Telefono = data.Telefono;
      this.Estado = data.Estado;
    }
  } 
}

export class TipoDocumento {
  Id : number
  Tipo: string
  constructor(data: any) {
    if (data == null) {
      this.Id = 0;
      this.Tipo = "";
    }
    else {
      this.Id = data.Id;
      this.Tipo = data.Tipo;
    }
  }
}
