import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";


@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, '');
  carro: Carro = new Carro(0, '');

  //este codigo esta abrindo a modal
  modalService = inject(MdbModalService);
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modelRef!: MdbModalRef<any>;


  constructor() {
    this.lista.push(new Carro(1, 'Fusca'));
    this.lista.push(new Carro(2, 'Civic'));
    this.lista.push(new Carro(3, 'Corolla'));
    this.lista.push(new Carro(4, 'Palio'));

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if(carroNovo != null){
      carroNovo.id = 25;
      this.lista.push(carroNovo);
    }

    if(carroEditado != null){
        let indice = this.lista.findIndex(x => {return x.id == carroEditado.id});
        this.lista[indice] = carroEditado;

    }

  }


  excluir(carro: Carro) {
    //this.lista = this.lista.filter(c => c.id !== carro.id);
    Swal.fire({
            text: 'Deseja realmente excluir o carro?',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
          }).then((result) => {
            if (result.isConfirmed) {
              let indice = this.lista.findIndex(x => {return x.id == carro.id});
              this.lista.splice(indice, 1);
            }

             Swal.fire({
                    title: 'Deletado com sucesso!',
                    icon: 'success'
                  })
           });
  }

  novo(){
    this.carro = new Carro(0, '');
    this.lista.push(new Carro(this.lista.length + 1, 'Novo Carro'));
  }

  new(){
    this.carroEdit = new Carro(0, '');
    this.modelRef = this.modalService.open(this.modalCarroDetalhe);
  }

  editar(carro: Carro){
    this.carroEdit = Object.assign({}, carro); // fazendo uma copia do carro para alterar somente quando confirmar
    this.modelRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){
    if(carro.id > 0){
      let indice = this.lista.findIndex(x => {return x.id == carro.id});
      this.lista[indice] = carro;
    }else{
      carro.id = this.lista.length + 1;
      this.lista.push(carro);
    }
    this.modelRef.close();
  }


}
