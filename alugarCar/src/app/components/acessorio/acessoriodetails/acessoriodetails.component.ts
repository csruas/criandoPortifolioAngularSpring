import { AcessorioService } from './../../../services/acessorio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acessoriodetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriodetails.component.html',
  styleUrl: './acessoriodetails.component.scss'
})
export class AcessoriodetailsComponent {


    @Input("acessorio") acessorio: Acessorio = new Acessorio(0,"");
    @Output("retorno") retorno = new EventEmitter<any>();

     router = inject(ActivatedRoute);
      router2 = inject(Router);
      acessorioService = inject(AcessorioService);

    constructor() {
          let id = this.router.snapshot.params['id'];
          if(id > 0){
            this.findById(id);
          }else{
            this.acessorio = new Acessorio(0,"");
          }
        }

    findById(id: number){

          this.acessorioService.findById(id).subscribe({
                next: retorno => {
                  this.acessorio = retorno[0];
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


    save(){

       if(this.acessorio.id > 0){

               this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
                 next: mensagem =>{
                   Swal.fire({
                     title: mensagem,
                     icon: 'success',
                     confirmButtonText: "Ok",
                   })

                   this.router2.navigate(['admin/acessorio'], { state: {acessorioEditada: this.acessorio } });
                   this.retorno.emit(this.acessorio);
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
               this.acessorioService.save(this.acessorio).subscribe({
                 next: mensagem =>{
                   Swal.fire({
                     title: mensagem,
                     icon: 'success',
                     confirmButtonText: "Ok",
                   })

                   this.router2.navigate(['admin/acessorio'], { state: {acessorioNovo: this.acessorio } });
                   this.retorno.emit(this.acessorio);
                 },
                 error(error){
                   Swal.fire({
                     title: "Erro ao cadastrar um acessorio!",
                     icon: 'error',
                     confirmButtonText: "Ok",
                   })
                 }
               });
             }


    }

}
