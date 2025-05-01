import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { CarroService } from '../../../services/carro.service';
import { Marcas } from '../../../models/marcas';


@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, '', new Marcas(0, ''));
  carro: Carro = new Carro(0, '', new Marcas(0, ''));

  //este codigo esta abrindo a modal
  modalService = inject(MdbModalService);
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modelRef!: MdbModalRef<any>;
  carroService = inject(CarroService);


  constructor() {
    this.findAll();

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
  findAll(){
    this.carroService.findAll().subscribe({
      next: lista =>{
        this.lista = lista;
      },
      error(error){
        Swal.fire({
          title: "Erro ao Listar um carro!",
          icon: 'error',
          confirmButtonText: "Ok",
        })
      }
    });
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

              this.carroService.delete(carro.id).subscribe({
                next: mensagem =>{
                  Swal.fire({
                    title: mensagem,
                    icon: 'success',
                    confirmButtonText: "Ok",
                  })
                  this.findAll();
                },
                error(error){
                  Swal.fire({
                    title: "Erro ao excluir o carro!",
                    icon: 'error',
                    confirmButtonText: "Ok",
                  })
                }
              });

            }


           });
  }

  novo(){
    this.carro = new Carro(0, '', null);
    this.lista.push(new Carro(0, '', null));
  }

  new(){
    this.carroEdit = new Carro(0, '', null);
    this.modelRef = this.modalService.open(this.modalCarroDetalhe);
  }

  editar(carro: Carro){
    this.carroEdit = Object.assign({}, carro); // fazendo uma copia do carro para alterar somente quando confirmar
    this.modelRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){
    this.findAll();
    this.modelRef.close();
  }


}
