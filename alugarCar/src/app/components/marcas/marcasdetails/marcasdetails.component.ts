import { Marcas } from './../../../models/marcas';
import { MarcaService } from './../../../services/marca.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input("marca") marca: Marcas = new Marcas(0,"");
  @Output("retorno") retorno = new EventEmitter<any>();
  
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  MarcaService = inject(MarcaService);

  constructor() {
      let id = this.router.snapshot.params['id'];
      if(id > 0){
        this.findById(id);
      }else{
        this.marca = new Marcas(0,"");
      }
    }
  
    findById(id: number){
  
      this.MarcaService.findById(id).subscribe({
            next: retorno => {
              this.marca = retorno[0];
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

    if(this.marca.id > 0){
   
         this.MarcaService.update(this.marca, this.marca.id).subscribe({
           next: mensagem =>{
             Swal.fire({
               title: mensagem,
               icon: 'success',
               confirmButtonText: "Ok",
             })
   
             this.router2.navigate(['admin/marcas'], { state: {marcaEditada: this.marca } });
             this.retorno.emit(this.marca);
           },
           error(error){
             Swal.fire({
               title: "Erro ao Listar uma marca!",
               icon: 'error',
               confirmButtonText: "Ok",
             })
           }
         });
   
       } else {
         this.MarcaService.save(this.marca).subscribe({
           next: mensagem =>{
             Swal.fire({
               title: mensagem,
               icon: 'success',
               confirmButtonText: "Ok",
             })
   
             this.router2.navigate(['admin/marcas'], { state: {marcaNovo: this.marca } });
             this.retorno.emit(this.marca);
           },
           error(error){
             Swal.fire({
               title: "Erro ao cadastrar uma marca!",
               icon: 'error',
               confirmButtonText: "Ok",
             })
           }
         });
       }

  }

}
