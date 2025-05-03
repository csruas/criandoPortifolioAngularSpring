import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio.service';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessoriodetailsComponent } from '../acessoriodetails/acessoriodetails.component';

@Component({
  selector: 'app-acessoriolist',
  standalone: true,
  imports: [MdbModalModule, AcessoriodetailsComponent],
  templateUrl: './acessoriolist.component.html',
  styleUrl: './acessoriolist.component.scss'
})
export class AcessoriolistComponent {

  lista: Acessorio[] = [];
  acessorio: Acessorio = new Acessorio(0, '',);

  //referenciando a modal de detalhes [marca]="acessorioEdit"
  acessorioEdit: Acessorio = new Acessorio(0, '',);

  //entrada e saida da modal
  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  acessorioService = inject(AcessorioService);
  modalService = inject(MdbModalService);
     @ViewChild("modalAcessorioDetalhe") modalAcessorioDetalhe!: TemplateRef<any>;
     modelRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  //listando os acessórios
   findAll(){
          this.acessorioService.findAll().subscribe({
            next: lista =>{
              this.lista = lista;
            },
            error(error){
              Swal.fire({
                title: "Erro ao Listar uma marca!",
                icon: 'error',
                confirmButtonText: "Ok",
              })
            }
          });
        }



  new(){
    this.acessorio = new Acessorio(0, '',);
    this.acessorioEdit = new Acessorio(0, '',);
    this.modelRef = this.modalService.open(this.modalAcessorioDetalhe, { modalClass: 'modal-lg' });
  }
  editar(acessorio: Acessorio) {
        this.acessorioEdit = Object.assign({}, acessorio); // fazendo uma copia do carro para alterar somente quando confirmar
        this.modelRef = this.modalService.open(this.modalAcessorioDetalhe);

  }

  excluir(acessorio: Acessorio) {
    Swal.fire({
          text: 'Deseja realmente excluir o acessorio?',
          icon: 'warning',
          showConfirmButton: true,
          showDenyButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.isConfirmed) {
            this.acessorioService.delete(acessorio.id).subscribe({
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
                  title: "Erro ao Listar um acessorio!",
                  icon: 'error',
                  confirmButtonText: "Ok",
                })
              }
            });
          }
        });
  }

  //esta sendo chamada no retorno do modal de detalhes
  retornoDetalhe(acessorio: Acessorio){
        this.findAll();
        this.modelRef.close();
      }

      select(acessorio: Acessorio){
        this.retorno.emit(acessorio);

      }


}
