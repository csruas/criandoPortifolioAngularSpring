import { MarcaService } from './../../../services/marca.service';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Marcas } from '../../../models/marcas';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcasdetailsComponent } from "../marcasdetails/marcasdetails.component";
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {
 lista: Marcas[] = [];
 marca: Marcas = new Marcas(0, '');
 marcaEdit: Marcas = new Marcas(0, '');

 @Input("esconderBotoes") esconderBotoes: boolean = false;
 @Output("retorno") retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
   @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
   modelRef!: MdbModalRef<any>;
   marcaService = inject(MarcaService);

 constructor() {
    this.findAll();
  
    let marcaNovo = history.state.marcaNovo;
    let marcaEditado = history.state.marcaEditado;
  
    if(marcaNovo != null){
      this.lista.push(marcaNovo);
    }
  
    if(marcaEditado != null){
        let indice = this.lista.findIndex(x => {return x.id == marcaEditado.id});
        this.lista[indice] = marcaEditado;
    }
  
    }

     findAll(){
        this.marcaService.findAll().subscribe({
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
    this.marca = new Marcas(0, '');
    this.marcaEdit = new Marcas(0, '');
    this.modelRef = this.modalService.open(this.modalMarcaDetalhe, {data: {marca: this.marca}});
    
  }

  editar(marca: Marcas){
    this.marcaEdit = Object.assign({}, marca); // fazendo uma copia do carro para alterar somente quando confirmar
    this.modelRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  excluir(marca: any){
    
    Swal.fire({
      text: 'Deseja realmente excluir a marca?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.delete(marca.id).subscribe({
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
              title: "Erro ao Listar uma marca!",
              icon: 'error',
              confirmButtonText: "Ok",
            })
          }
        });
      }
    });
  }

  retornoDetalhe(marca: Marcas){
      this.findAll();
      this.modelRef.close();
    }

    select(marca: Marcas){
      //this.marca = marca;
      this.retorno.emit(marca);
      //this.modelRef.close();
    }

}
