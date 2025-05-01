import { Marcas } from "./marcas";

export class Carro {
  id!: number;
  nome!: string;
  marca!: Marcas;

  constructor(id: number, nome: string, marca: Marcas |null) {
      this.id = id;
      this.nome = nome;
      if(marca) this.marca = marca;
  }


}
