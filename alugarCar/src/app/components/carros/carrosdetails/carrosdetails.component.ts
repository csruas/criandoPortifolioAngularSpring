import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { CarroService } from '../../../services/carro.service';
import { Marcas } from '../../../models/marcas';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcaslistComponent } from '../../marcas/marcaslist/marcaslist.component';
import { AcessoriolistComponent } from "../../acessorio/acessoriolist/acessoriolist.component";
import { Acessorio } from '../../../models/acessorio';



@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent, AcessoriolistComponent],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

@Input("carro") carro: Carro = new Carro(0, '', null);
@Output("retorno") retorno = new EventEmitter<any>();

router = inject(ActivatedRoute);
router2 = inject(Router);
carroService = inject(CarroService);

  //este codigo esta abrindo a modal
  modalService = inject(MdbModalService);
  @ViewChild("modalMarcas") modalMarcas!: TemplateRef<any>;
  @ViewChild("modalAcessorio") modalAcessorio!: TemplateRef<any>;
  modelRef!: MdbModalRef<any>;

  constructor() {
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){

    this.carroService.findById(id).subscribe({
          next: retorno => {
            this.carro = retorno[0];
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

  save(){

    if(this.carro.id > 0){

      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: "Ok",
          })

          this.router2.navigate(['admin/carros'], { state: {carroEditado: this.carro } });
          this.retorno.emit(this.carro);
          console.log(this.carro);
        },
        error(error){
          Swal.fire({
            title: "Erro ao Listar um carro!",
            icon: 'error',
            confirmButtonText: "Ok",
          })
        }
      });

    }else {
      this.carroService.save(this.carro).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: "Ok",
          })

          this.router2.navigate(['admin/carros'], { state: {carroNovo: this.carro } });
          this.retorno.emit(this.carro);
          console.log(this.carro);
        },
        error(error){
          Swal.fire({
            title: "Erro ao cadastrar um carro!",
            icon: 'error',
            confirmButtonText: "Ok",
          })
        }
      });
    }
  }
  // abrindo a model de marcas
  buscarmarcas(){
    this.modelRef = this.modalService.open(this.modalMarcas, {modalClass: 'modal-lg'});
  }

  // abrindo a model de acessorios
  buscarAcessorio(){
    this.modelRef = this.modalService.open(this.modalAcessorio, {modalClass: 'modal-lg'});
  }

  // retorno da modal de marcas
  retornoMarca(marca: Marcas){
    this.carro.marca = marca;
    this.modelRef.close();
  }

  // retorno da modal de acessorios
  retornoAcessorio(acessorio: Acessorio){
    if(this.carro.acessorios == null)
      this.carro.acessorios = [];
    //verifica se o acessorio ja existe no carro
       this.carro.acessorios.push(acessorio);
       this.modelRef.close();

  }

  desvincularAcessorioCarro(acessorio: Acessorio){
    let posicao = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
    this.carro.acessorios.splice(posicao, 1);

  }

}
