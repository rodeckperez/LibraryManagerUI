export class Editorials {
  IdEditorial: number
  NIT: string
  NombreEditorial: string

  constructor(data: any) {
    if (data == null) {
      this.IdEditorial = 0;
      this.NIT = "";
      this.NombreEditorial = "";

    }
    else {
      this.IdEditorial = data.IdEditorial;
      this.NIT = data.NIT;
      this.NombreEditorial = data.NombreEditorial;
    }
  }
}
